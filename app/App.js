var React = require('react');
var Link = require('react-router');
var {dropdown} = require('bootstrap-sass');

import Navigation from './components/Navigation';
import Setting from './components/Setting';

var App = React.createClass({
  render: function () {
    return (
      <div className="app-wrap">
        <div className="Header">
          <div className="Header-container">
            <a className="Header-brand" href="/" onClick={Link.handleClick}>
              <span className="Header-brandTxt">Build The Wheel </span>
            </a>
            <Navigation className="Header-nav"/>
          </div>
        </div>
        <div className="content-wrap container-fluid">
          {this.props.children}
        </div>

        <Setting/>
      </div>
    );
  }
});

module.exports = App;
