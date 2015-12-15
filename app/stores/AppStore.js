var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var superagent = require('superagent');
var AppConfig = require('../config/app.config');
var AV = require('avoscloud-sdk');
AV.initialize(AppConfig.LC.X_LC_Id, AppConfig.LC.X_LC_Key);
// 创建AV.Object子类.
// 该语句应该只声明一次
const Post = AV.Object.extend("UserProfile");
//const _User = AV.Object.extend("_User");

const LOGIN_EVENT = 'login';//登录事件
const LOGOUT_EVENT = 'logOut';//登录事件
const REGISTER_EVENT = 'register';//注册事件
var CHANGE_EVENT = 'change';

let userObjectId = localStorage.getItem(AppConfig.APP_PREFIX + 'WEB_APP_ID');
var currentUser = AV.User.current();
if (currentUser) {
  // do stuff with the user
} else {
  // show the signup or login page
}

/**
 * 用户登录
 * @param email
 * @param pass
 * @param callback
 */
function login(email, pass, callback) {
  AV.User.logIn(email, pass, {
    success: function (user) {
      // 成功了，现在可以做其他事情了.
      console.log(user);
      callback(null, user);
    },
    error: function (user, error) {
      // 失败了.
      callback(err, null);
    }
  });
}

function logOut(callback){
  AV.User.logOut();
  callback();
}

/**
 * 用户注册
 * @param name
 * @param email
 * @param pass
 * @param callback
 */
function register(name, email, pass, callback) {
  var user = new AV.User();
  user.signUp({
    username: name,
    password: pass,
    email: email,
    sync: true,
    notification: true
  }, {
    success: function (user) {
      // 注册成功，可以使用了.
      console.log(user);
      callback(null, user);
    },
    error: function (user, error) {
      alert("Error: " + error.code + " " + error.message);
      callback(error, null);
    }
  });
}

function getUserProfile(objectId) {
  superagent
    .get('https://api.leancloud.cn/1.1/login')
    .set({
      'X-LC-Id': 'tnoc9Hlo0Di1s6jKdq25vJSp',
      'X-LC-Key': 'qXh9eqznzTdezr5znN8PqWEV'
    })
    .accept('application/json')
    .query({
      username: email,
      password: pass
    })
    .end((err, res) => {
      if (err) {
        if (err.status === 404) {
          console.log(err);
        } else {
          console.log(err.error);
        }
        callback(err, null);
      } else {
        callback(null, res.body);
      }
    });
}

var AppStore = assign({}, EventEmitter.prototype, {
  getLoginUserInfo: function () {
    return currentUser;
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  /**
   *
   * @param eventName
   * @param callback
   */
  addEventListener: function (eventName, callback) {
    this.on(eventName, callback);
  },

  /**
   *
   * @param eventName
   * @param callback
   */
  removeEventListener: function (eventName, callback) {
    this.removeListener(eventName, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
  var email, pass, name;
  switch (action.actionType) {
    case AppConstants.APP_LOGIN:
      email = action.email;
      pass = action.pass;
      if (email !== '' && pass !== '') {
        login(email, pass, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            AppStore.emitEvent(LOGIN_EVENT);
          }
        });
      }
      break;
    case AppConstants.APP_LOGOUT:
      logOut(function () {
        AppStore.emitEvent(LOGOUT_EVENT);
      });
      break;
    case AppConstants.APP_REGISTER:
      email = action.email;
      pass = action.pass;
      name = action.name;
      if (email !== '' && pass !== '' && name !== '') {
        register(name, email, pass, function (err, result) {
          if (result) {
            AppStore.emitEvent(REGISTER_EVENT);
          }
        });
      }
      break;
    default:
    // no op
  }
});

module.exports = AppStore;
