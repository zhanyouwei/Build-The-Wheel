require('./Navigation.scss');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');
var AppStore = require('../../stores/AppStore');

var Navigation = React.createClass({
  getInitialState: function () {
    return {
      loginUserInfo: AppStore.getLoginUserInfo()
    }
  },
  render: function () {
    let element;
    if (this.state.loginUserInfo) {
      element = (
        <span className="Navigation-login">
          <span className="ml10 Navigation-link Navigation-link--highlight dropdown">
            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.loginUserInfo.username}
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu card" aria-labelledby="dLabel">
              <li><a href="#">账号设置</a></li>
              <li>
                <a href="#" data-toggle="modal" data-target="#mySettingModal">偏好设置</a>
              </li>
              <li className="underscore">
                <a onClick={this.handleLogOut}>退出登录</a>
              </li>
            </ul>
          </span>
        </span>
      );
    } else {
      element = (<span>
        <a className="Navigation-link" href="#/login">Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="#/register">Sign
          up</a>
      </span>);
    }
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="#/about">About</a>
        <a className="Navigation-link" href="#/contact">Contact</a>
        <span className="Navigation-spacer"> | </span>
        {element}
      </div>
    );
    //return (
    //  <div className={classNames(this.props.className, 'Navigation')} role="navigation">
    //    <a className="Navigation-link" href="/about">About</a>
    //    <a className="Navigation-link" href="/contact">Contact</a>
    //    <span className="Navigation-spacer"> | </span>
    //    <a className="Navigation-link" href="#/login">Log in</a>
    //    <span className="Navigation-spacer">or</span>
    //    <a className="Navigation-link Navigation-link--highlight" href="/register">Sign up</a>
    //  </div>
    //);
  },
  handleLogOut: function () {
    localStorage.removeItem(localStorage.getItem('WEB_APP_ID'));
    localStorage.removeItem('WEB_APP_ID');
    location.href = "/";
  }
});

module.exports = Navigation;
