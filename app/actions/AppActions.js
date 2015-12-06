/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var TodoActions = {

  /**
   * 登录
   * @param email
   * @param pass
   */
  login: function (email, pass) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_LOGIN,
      email: email,
      pass: pass
    });
  },
  register: function (email, pass) {
    AppDispatcher.dispatch({
      actionType: AppConstants.APP_REGISTER,
      email: email,
      pass: pass
    });
  }
};

module.exports = TodoActions;
