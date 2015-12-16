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
const _ = require('underscore');
var localstorage = require('../core/localstorage.util');
var AppConfig = require('../../../../config/app.config');
var AppStore = require('../../../../stores/AppStore');

var AV = require('avoscloud-sdk');
AV.initialize(AppConfig.LC.X_LC_Id, AppConfig.LC.X_LC_Key);
// 创建AV.Object子类. 该语句应该只声明一次
var Todo = AV.Object.extend("Todo");

var CHANGE_EVENT = 'change';

var _todos = {};
AV.Query.doCloudQuery('select * from Todo', {
  success: function (result) {
    console.log(result.results);
    _.each(result.results, function (item) {
      _todos[item.id] = assign({id: item.id}, item.attributes);
    });
    localStorage.setItem('todos', JSON.stringify(_todos));
    TodoStore.emitChange();
  },
  error: function (error) {
    //查询失败，查看 error
    console.dir(error);
  }
});


/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 * @param callback
 */
function create(text, callback) {
  let data = {
    complete: false,
    text: text,
    completeAt: null
  };
  let todoObj = new Todo();
  todoObj.save(data, {
    success: function (todoObj) {
      _todos[todoObj.id] = assign(data, {
        id: todoObj.id
      }, todoObj.attributes);
      callback(null);
    },
    error: function (res, error) {
      callback(error);
    }
  });
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
  localStorage.setItem('todos', JSON.stringify(_todos));
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var objectId in _todos) {
    update(objectId, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
  var query = new AV.Query(Todo);
  query.get(id, {
    success: function (todo) {
      todo.destroy();
    }
  });
  localStorage.setItem('todos', JSON.stringify(_todos));
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
      var query = new AV.Query(Todo);
      query.get(id, {
        success: function (todo) {
          todo.destroy();
        }
      });
    }
  }
  localStorage.setItem('todos', JSON.stringify(_todos));
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function () {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function () {
    return _todos;
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

    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text, function (err) {
          if (!err) {
            localStorage.setItem('todos', JSON.stringify(_todos));
            TodoStore.emitChange();
          }
        });
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false, completeAt: null});
      } else {
        updateAll({complete: true, completeAt: moment().unix()});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false, completeAt: null});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true, completeAt: moment().unix()});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = TodoStore;
