var React = require('react');
var ReactPropTypes = React.PropTypes;
//var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({
  getInitialState: function () {
    return {
      conversationObj: null,
      sendText: ''
    };
  },

  render: function () {
    if (this.props.realtimeObj !== null && this.state.conversationObj === null) {
      this.initConv();
    }
    return (
      <footer className="footer">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="输入&回车" value={this.state.sendText}
                 onChange={this.handleInputChange('sendText')}/>
        </form>
      </footer>
    );
  },
  initConv: function () {
    var _this = this;
    // 创建一个聊天室，conv 是 conversation 的缩写，也可以用 room 方法替换
    this.props.realtimeObj.conv('566423e860b21eab5d566109', function (data) {
      console.log(data);
      if (data) {
        console.log('Conversation 创建成功!', data);
        _this.setState({'conversationObj': data});
      }
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    let _this = this;
    this.state.conversationObj.send({
      content: this.state.sendText
    }, function (data) {
      console.log(data);
      _this.state.conversationObj.log(function (data) {
        console.log('查看当前 Conversation 最近的聊天记录：', data);
      });
    });
  },
  handleInputChange: function (key) {
    let that = this;
    return function (e) {
      let newState = {};
      newState[key] = e.target.value;
      that.setState(newState);
    }
  },
  _onClearCompletedClick: function () {
    //TodoActions.destroyCompleted();
  }

});

module.exports = Footer;
