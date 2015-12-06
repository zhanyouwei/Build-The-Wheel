require('./Navigation.css');

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
      element =
        <span className="Navigation-spacer">{this.state.loginUserInfo.username}</span>;
    } else {
      element = (<span>
        <a className="Navigation-link" href="/login" >Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="/register">Sign
          up</a>
      </span>);
    }
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/about" >About</a>
        <a className="Navigation-link" href="/contact" >Contact</a>
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
  }
});

module.exports = Navigation;
