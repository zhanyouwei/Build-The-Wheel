var React = require('react');
var Link = require('react-router');


var Home = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    return (
      <div className="container-fluid mt40">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="thumbnail">
              <div className="caption">
                <h3>
                  <a href="#/chat">
                    <i className="fa fa-paper-plane-o mr10"></i>Open Chat
                  </a>
                </h3>

                <p>
                  开放聊天室
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="thumbnail">
              <div className="caption">
                <h3>
                  <a href="#/todo">
                    <i className="fa fa-list-ol mr10"></i>Open Todo
                  </a>
                </h3>
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
      </div>
    );
  }
});

module.exports = Home;
