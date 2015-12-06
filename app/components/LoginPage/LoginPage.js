/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

require('./LoginPage.css');

var React = require('react');

var AppActions = require('../../actions/AppActions');

var AppStore = require('../../stores/AppStore');

var LoginPage = React.createClass({
  getInitialState: function () {
    return {
      email: 'gis_warrior@163.com',
      pass: '123123'
    }
  },

  componentDidMount: function () {
    AppStore.addEventListener('login', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeEventListener('login', this._onChange);
  },

  render: function () {
    const title = 'Log In';
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <h1>{title}</h1>

          <p>
            <input type="text" placeholder="邮箱" value={this.state.email}
                   onChange={this.handleChange('email')}/>
          </p>

          <p>
            <input type="password" placeholder="密码" value={this.state.pass}
                   onChange={this.handleChange('pass')}/>
          </p>

          <p>
            <input type="button" value="登录" onClick={this.loginHandle}/>
          </p>
        </div>
      </div>
    );
  },

  loginHandle: function (e) {
    AppActions.login(this.state.email, this.state.pass);
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

module.exports = LoginPage;
