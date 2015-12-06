/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.css';
import http from '../../core/HttpClient';
import superagent from 'superagent';


var RegisterPage = React.createClass({
  getInitialState: function () {
    return {
      email: 'gis_warrior@163.com',
      pass: '123123'
    }
  },

  registerHandle: function (e) {
    AppActions.register(this.state.email, this.state.pass);
  },
  render: function () {
    const title = 'New User Registration';
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>

          <p>
            <input type="text" placeholder="邮箱" value={this.state.email} onChange={this.handleChange('email')}/>
          </p>

          <p>
            <input type="password" placeholder="密码" value={this.state.pass} onChange={this.handleChange('pass')}/>
          </p>

          <p>
            <input type="button" value="注册" onClick={this.registerHandle}/>
          </p>
        </div>
      </div>
    );
  },

  handleChange: function (key) {
    let that = this;
    return function (e) {
      let newState = {};
      newState[key] = e.target.value;
      that.setState(newState);
    }
  }
});

export default RegisterPage;
