require('./Navigation.scss');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var Navigation = React.createClass({
  getInitialState: function () {
    return {
      currentUser: AppStore.getLoginUserInfo()
    }
  },

  componentDidMount: function () {
    AppStore.addEventListener('logOut', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeEventListener('logOut', this._onChange);
  },
  render: function () {
    let element;
    if (this.state.currentUser) {
      element = (
        <span className="Navigation-login">
          <span className="ml10 Navigation-link Navigation-link--highlight dropdown">
            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.currentUser.attributes.username}
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
  },
  handleLogOut: function () {
    AppActions.logOut();
  },
  _onChange: function () {
    location.href = "/";
  }
});

module.exports = Navigation;
