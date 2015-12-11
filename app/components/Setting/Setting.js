require('./Setting.scss');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');
var AppStore = require('../../stores/AppStore');

var Navigation = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
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
                  <h3 className="mb10">存储 同步</h3>

                  <form className="notification-form">
                    <div className="form-group clearfix">
                      <label>数据存储采用云存储与多终端同步方式</label>

                      <div className="toggle blue pull-right">
                        <i className="fa fa-square-o f20"></i>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
