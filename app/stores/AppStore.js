var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var superagent = require('superagent');

const LOGIN_EVENT = 'login';//登录事件
var CHANGE_EVENT = 'change';

var _todos = {};

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
    .query(data)
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

  emitEvent: function (event) {
    this.emit(event);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
  var data;
  console.log(action);
  switch (action.actionType) {
    case TodoConstants.APP_LOGIN:
      data = action.data;
      if (data !== null && data.email !== '' && data.pass !== '') {
        login(data.email, data.pass);
        AppStore.emitEvent(LOGIN_EVENT);
      }
      break;
    default:
      break;
    // no op
  }
});

module.exports = AppStore;
