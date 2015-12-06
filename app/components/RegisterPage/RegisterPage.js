/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import styles from './RegisterPage.scss';

import React, { PropTypes, Component } from 'react';
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');

var RegisterPage = React.createClass({
  getInitialState: function () {
    return {
      email: 'gis_warrior@163.com',
      pass: '123123'
    }
  },

  componentDidMount: function () {
    AppStore.addEventListener('register', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeEventListener('register', this._onChange);
  },

  render: function () {
    const title = 'New User Registration';
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>

          <p>
            <input type="text" placeholder="邮箱" value={this.state.email} onChange={this.handleChange('email')}
                   className="form-control"/>
          </p>

          <p>
            <input type="password" placeholder="密码" value={this.state.pass} onChange={this.handleChange('pass')}
                   className="form-control"/>
          </p>

          <p>
            <button onClick={this.registerHandle} className="btn">注册</button>
          </p>
        </div>
      </div>
    );
  },

  registerHandle: function (e) {
    AppActions.register(this.state.email, this.state.pass);
  },

  handleChange: function (key) {
    let that = this;
    return function (e) {
      let newState = {};
      newState[key] = e.target.value;
      that.setState(newState);
    }
  },
  _onChange: function () {
    location.href = "/";
  }
});

export default RegisterPage;
