require('./Setting.scss');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');
var AppStore = require('../../stores/AppStore');

var Navigation = React.createClass({
  getInitialState: function () {
    return {
      syncFlag: true,
      notificationFlag: false
    }
  },
  render: function () {
    let toggleSyncClass = this.state.syncFlag ? 'fa fa-check-square-o f20' : 'fa fa-square-o f20';
    let toggleNotificationClass = this.state.notificationFlag ? 'fa fa-check-square-o f20' : 'fa fa-square-o f20';
    return (
      <div className="user-setting">
        <div className="modal fade" id="mySettingModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <a className="modal-close pull-right" data-dismiss="modal"><i className="fa fa-times"></i></a>

                <p className="modal-title pull-left" id="myModalLabel">偏好设置</p>
              </div>
              <div className="modal-body">
                <div className="user-setting-content">
                  <form className="notification-form">
                    <div className="form-group mb20 clearfix">
                      <label>数据存储采用云存储与多终端同步方式</label>

                      <div className="pull-right" onClick={this.toggleSyncHandle}>
                        <i className={toggleSyncClass}></i>
                      </div>
                    </div>
                    <div className="form-group clearfix">
                      <label>启用桌面通知</label>

                      <div className="pull-right" onClick={this.toggleNotificationHandle}>
                        <i className={toggleNotificationClass}></i>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  toggleSyncHandle: function () {
    this.setState({
      syncFlag: !this.state.syncFlag
    });
  },
  toggleNotificationHandle: function () {
    this.setState({
      notificationFlag: !this.state.notificationFlag
    });
  }
});

module.exports = Navigation;
