/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/8.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var AppConstants = require('../../../../constants/AppConstants');
var assign = require('object-assign');
const moment = require('moment');
const superagent = require('superagent');
var localstorage = require('../core/localstorage.util');
var AppConfig = require('../../../../config/app.config');

var CHANGE_EVENT = 'change';
var ADD_EVENT = 'add';
const PREFIX = AppConfig.APP_PREFIX;

var _classifys = JSON.parse(localStorage.getItem('classify')) || {};

/**
 * 添加分类
 * @param  {string} text The content of the TODO
 * @param {function} callback
 */
function addClassify(text, callback) {
  let classify = {
    complete: false,
    text: text,
    completeAt: null
  };
  let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _classifys[id] = assign(classify, {
    id: id
  });
  console.log(AppConfig.LC.X_LC_Id);
  localStorage.setItem(PREFIX + '_classifys', JSON.stringify(_classifys));
  superagent
    .post(AppConstants.LC.URL + '/classes/TodoClassify')
    .set({
      'X-LC-Id': AppConfig.LC.X_LC_Id,
      'X-LC-Key': AppConfig.LC.X_LC_Key
    })
    .accept('application/json')
    .send(todo)
    .end((err, res) => {
      if (err) {
        if (err.status === 404) {
          console.log(err);
        } else {
          console.log(err.error);
        }
        callback(err, null);
      } else {
        _todos[res.body.objectId] = assign(todo, {
          id: res.body.objectId
        }, res.body);
        localStorage.setItem('todos', JSON.stringify(_todos));
        callback(null, res.body);
      }
    });
}

var ClassifyStore = assign({}, EventEmitter.prototype, {
  /**
   * 获取所有分类
   * @return {object}
   */
  getAll: function () {
    return _classifys;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
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
  var text;
  switch (action.actionType) {
    case TodoConstants.TODO_CLASSIFY_CREATE:
      text = action.text.trim();
      console.log(text);
      if (text !== '') {
        addClassify(text, function (err, result) {
          if (!err) {
            ClassifyStore.emitChange();
          }
        });
      }
      break;

    default:
    // no op
  }
});

module.exports = ClassifyStore;
