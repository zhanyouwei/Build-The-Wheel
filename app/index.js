/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/3.
 */

var app = document.createElement('div');
document.body.appendChild(app);

require('./styles/main.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var {Router,IndexRoute, Route, Routes,History,Link} = require('react-router');
var Cookie = require('react-cookie');

var App = require('./App');
var Home = require('./Home');
var LoginPage = require('./components/LoginPage');
let RegisterPage = require('./components/RegisterPage');
let AboutPage = require('./components/AboutPage');
var TodoApp = require('./application/Todo/js/components/TodoApp.react');
var ChatApp = require('./application/Chat/js/components/ChatApp.react');

ReactDOM.render((
  <Router>
    <Route name="app" path="/" component={App}>
      <Route name="todo" path="/todo" component={TodoApp}/>
      <Route name="todo" path="/chat" component={ChatApp}/>
      <Route name="about" path="/about" component={AboutPage}/>
      <IndexRoute name="home" component={Home}/>
    </Route>
    <Route path="/login" component={LoginPage}/>
    <Route path="/register" component={RegisterPage}/>
    <Route path="*" component={App}/>
  </Router>
), app);

//if (!Cookie.load('uid') || !Cookie.load('access_token')) {
//  location.href = "#/login";
//}