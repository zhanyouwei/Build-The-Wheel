/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/8.
 */

var React = require('react');
var ClassifyStore = require('../stores/ClassifyStore');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

function getTodoState() {
  return {
    allTodos: ClassifyStore.getAll()
  };
}

var SideBar = React.createClass({

  getInitialState: function () {
    return getTodoState();
  },

  componentDidMount: function () {
    ClassifyStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ClassifyStore.removeChangeListener(this._onChange);
  },
  render: function () {
    return (
      <div className="side-bar">
        <div className="toolbar">
          <TodoTextInput
            id="newClassify"
            placeholder="输入分类名称"
            onSave={this._onSave}
            />
          <a onClick=""><i className="fa fa-cog ml10"></i>添加分类</a>
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getTodoState());
  },
  _onSave: function (text) {
    console.log(text);
    if (text.trim()) {
      TodoActions.createClassify(text);
    }
  }
});

module.exports = SideBar;
