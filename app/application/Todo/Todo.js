require('./Todo.scss');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');
var TodoActions = require('./actions/TodoActions');
var TodoStore = require('./stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

var TodoList = React.createClass({
  render: function () {
    var createItem = function (item) {
      return <li key={item.id}>
        <input type="checkbox" className="mr10"/>
        {item.text}
      </li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function () {
    return {items: [], text: ''};
  },
  onChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    TodoActions.createTodoItem(this.state.text);
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangeListener(this._onChange);
  },
  render: function () {
    return (
      <div className="todo">
        <div className="todo-sidebar">
          side
        </div>
        <div className="todo-classify">
          classify
        </div>
        <div className="todo-container">
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.onChange} value={this.state.text} className="todo-add-item"
                   placeholder="add todo & enter"/>
          </form>
          <div className="todo-list">
            <TodoList items={this.state.items}/>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTodoState());
  }
});


module.exports = TodoApp;

