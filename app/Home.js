var React = require('react');
var Link = require('react-router');


var Home = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    return (
      <div>
        <div className="container">
          <div className="clearfix">
            <div className="block">
              <h3>Open Chat</h3>

              <p>
                开放聊天室
              </p>
            </div>
            <div className="block">
              <a href="#/todo"> <h3>Open Todo</h3></a>

              <p>
                开放任务列表应用
              </p>
              <ul>
                <li>1. 添加任务分类</li>
                <li>2. 添加任务</li>
                <li>3. 本地存储</li>
                <li>4. 云端存储</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
