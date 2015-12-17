/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/8.
 */

require('../../todomvc-common/base.scss');
require('../../css/app.scss');

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');
//const SideBar = require('./SideBar.react');

/**
 * 获取任务
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState: function () {
    return getTodoState();
  },

  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div id="todoapp">
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
          />
        <Footer allTodos={this.state.allTodos}/>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
