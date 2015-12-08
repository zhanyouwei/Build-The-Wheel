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

var _todos = JSON.parse(localStorage.getItem('todos')) || {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 * @param callback
 */
function create(text, callback) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  let todo = {
    complete: false,
    text: text,
    completeAt: null
  };
  superagent
    .post(AppConstants.LC.URL + '/classes/Todo')
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
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
  localStorage.setItem('todos', JSON.stringify(_todos));
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
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
        create(text, function (err, result) {
          if (!err) {
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
