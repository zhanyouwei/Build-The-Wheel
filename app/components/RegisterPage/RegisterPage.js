/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.css';
import http from '../../core/HttpClient';
import superagent from 'superagent';


@withStyles(styles) class RegisterPage extends Component {
  state = {
    email: 'gis_warrior@163.com',
    pass: '123123'
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  async register(url, data) {
    var result = await http.post(url, data);
    return result;
  }

;

  registerHandle(e) {
    var data = {
      "username": this.state.email,
      "password": this.state.pass
    };
    //this.register('https://api.leancloud.cn/1.1/users', data).then(function (result) {
    //  console.log(result);
    //});
    superagent
      .post('https://api.leancloud.cn/1.1/users')
      .set({
        'X-LC-Id': 'tnoc9Hlo0Di1s6jKdq25vJSp',
        'X-LC-Key': 'qXh9eqznzTdezr5znN8PqWEV'
      })
      .accept('application/json')
      .send(data)
      .end((err, res) => {
        console.log(res.body);
        if (err) {
          if (err.status === 404) {
            console.log(err);
          } else {
            console.log(err.error);
          }
        } else {
          console.log(res.body);
        }
      });
  }

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
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
            <input type="button" value="注册" onClick={this.registerHandle.bind(this)}/>
          </p>
        </div>
      </div>
    );
  }


  handleChange(key) {
    let that = this;
    return function (e) {
      let newState = {};
      newState[key] = e.target.value;
      that.setState(newState);
    }
  }

}

export default RegisterPage;
