var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var superagent = require('superagent');

const LOGIN_EVENT = 'login';//登录事件
const REGISTER_EVENT = 'register';//注册事件
var CHANGE_EVENT = 'change';

let userObjectId = localStorage.getItem('WEB_APP_ID');
var _loginUserInfo = userObjectId ? JSON.parse(localStorage.getItem(userObjectId)) : null;

/**
 * 用户登录
 * @param email
 * @param pass
 * @param callback
 */
function login(email, pass, callback) {
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

/**
 * 用户注册
 * @param email
 * @param pass
 * @param callback
 */
function register(email, pass, callback) {
  superagent
    .post('https://api.leancloud.cn/1.1/users')
    .set({
      'X-LC-Id': 'tnoc9Hlo0Di1s6jKdq25vJSp',
      'X-LC-Key': 'qXh9eqznzTdezr5znN8PqWEV'
    })
    .accept('application/json')
    .send({
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
    return _loginUserInfo;
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
  var email, pass;
  switch (action.actionType) {
    case AppConstants.APP_LOGIN:
      email = action.email;
      pass = action.pass;
      if (email !== '' && pass !== '') {
        login(email, pass, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            _loginUserInfo = result;
            localStorage.removeItem(localStorage.getItem('WEB_APP_ID'));
            localStorage.setItem('WEB_APP_ID', result['objectId']);
            localStorage.setItem(result['objectId'], JSON.stringify(result));
            AppStore.emitEvent(LOGIN_EVENT);
          }
        });
      }
      break;
    case AppConstants.APP_REGISTER:
      email = action.email;
      pass = action.pass;
      if (email !== '' && pass !== '') {
        register(email, pass, function (err, result) {
          if (result) {
            _loginUserInfo = result;
            localStorage.removeItem(localStorage.getItem('WEB_APP_ID'));
            localStorage.setItem('WEB_APP_ID', result['objectId']);
            localStorage.setItem(result['objectId'], JSON.stringify(result));
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
