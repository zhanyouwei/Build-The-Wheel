'use strict';

require('../../css/app.scss');

var React = require('react');
var AV = require('leancloud-realtime');

var Footer = require('./Footer.react');
var AppStore = require('../../../../stores/AppStore');

function initRealtime(loginUserInfo, callback) {
// 最简的示例代码，请换成自己的 appId，可以通过浏览器多个标签模拟多用户通信
  var appId = 'H7CTUT7nifyX9bC88HVfnuMM';
// clientId 就是实时通信中的唯一用户 id
  var clientId = 'LeanCloud01';
  var realtimeObj;
  var conversationObj;

// 创建实时通信实例（支持单页多实例）
  realtimeObj = AV.realtime({
    appId: appId,
    clientId: loginUserInfo.objectId,
    // 是否开启 HTML 转义，SDK 层面开启防御 XSS
    encodeHTML: true,
    // 是否开启服务器端认证
    // auth: authFun,
    // 是否使用其他地区的节点
    // region: 'us'
  });

// 当前 SDK 版本
  console.log('当前 SDK 版本是 ' + AV.realtime.version);

// 实时通信服务连接成功
  realtimeObj.on('open', function () {
    console.log('实时通信服务建立成功！');

    callback(realtimeObj);
    // 创建一个聊天室，conv 是 conversation 的缩写，也可以用 room 方法替换
    //conversationObj = realtimeObj.conv('566423e860b21eab5d566109', function (data) {
    //  if (data) {
    //    console.log('Conversation 创建成功!', data);
    //  }
    //});
  });

// 当聊天断开时触发
  realtimeObj.on('close', function () {
    console.log('实时通信服务被断开！');
  });

// 接收断线或者网络状况不佳的事件（断网可测试）
  realtimeObj.on('reuse', function () {
    console.log('正在重新连接。。。');
  });

// 当 Conversation 被创建时触发，当然你可以使用回调函数来处理，不一定要监听这个事件
  realtimeObj.on('create', function (data) {

    // 向这个 Conversation 添加新的用户
    conversationObj.add([
      'LeanCloud03', 'LeanCloud04'
    ], function (data) {
      console.log('成功添加用户：', data);
    });

    // 从这个 Conversation 中删除用户
    conversationObj.remove('LeanCloud03', function (data) {
      console.log('成功删除用户：', data);
    });

    // 向这个 Conversation 中发送消息
    conversationObj.send({
      abc: 123
    }, function (data) {
      console.log('发送的消息服务端已收收到：', data);
    });

    setTimeout(function () {
      // 查看历史消息
      conversationObj.log(function (data) {
        console.log('查看当前 Conversation 最近的聊天记录：', data);
      });
    }, 2000);

    // 当前 Conversation 接收到消息
    conversationObj.receive(function (data) {
      console.log('当前 Conversation 收到消息：', data);
    });

    // 获取当前 Conversation 中的成员信息
    conversationObj.list(function (data) {
      console.log('列出当前 Conversation 的成员列表：', data);
    });

    // 取得当前 Conversation 中的人数
    conversationObj.count(function (num) {
      console.log('取得当前的用户数量：' + num);
    });
  });

// 监听所有用户加入的情况
  realtimeObj.on('membersjoined', function (data) {
    console.log('有用户加入某个当前用户在的 Conversation：', data);
  });

// 监听所有用户离开的情况
  realtimeObj.on('membersleft', function (data) {
    console.log('有用户离开某个当前用户在的 Conversation：', data);
  });

// 监听所有 Conversation 中发送的消息
  realtimeObj.on('message', function (data) {
    console.log('某个当前用户在的 Conversation 接收到消息：', data);
  });
}

function connectConv() {
}


var TodoApp = React.createClass({

  getInitialState: function () {
    return {
      sendText: '',
      loginUserInfo: AppStore.getLoginUserInfo(),
      realtimeObj: null
    };
  },

  componentDidMount: function () {
    let _this = this;
    if (this.state.loginUserInfo) {
      initRealtime(this.state.loginUserInfo, function (realtimeObj, conversationObj) {
        _this.setState({
          realtimeObj: realtimeObj
        });
      });
    } else {

    }
    //TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    //TodoStore.removeChangeListener(this._onChange);
  },
  render: function () {
    return (
      <div id="chatApp">
        <Footer realtimeObj={this.state.realtimeObj}/>
      </div>
    );
  },
  _onChange: function () {
    //this.setState(getTodoState());
  }
});

module.exports = TodoApp;
