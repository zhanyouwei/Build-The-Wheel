/*
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/10/9.
 * UserManageActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var UserManageActions = {

  /**
   * 登录
   * @param email
   * @param pass
   */
  login: function (email, pass) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_MANAGE_LOGIN,
      email: email,
      pass: pass
    });
  },
  createTodoItem: function (text) {
    console.log(text +"=======");
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_CREATE_ITEM,
      text: text
    });
  }

};

module.exports = UserManageActions;
