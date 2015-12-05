require('./Navigation.css');

var React = require('react');
var Link = require('react-router');
var classNames = require('classnames');

var Navigation = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/about" >About</a>
        <a className="Navigation-link" href="/contact">Contact</a>
        <span className="Navigation-spacer"> | </span>
        <a className="Navigation-link" href="#/login" >Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="/register" >Sign up</a>
      </div>
    );
  }
});

module.exports = Navigation;
