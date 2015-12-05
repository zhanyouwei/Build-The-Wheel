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
var Todo = require('./application/Todo');

ReactDOM.render((
  <Router>
    <Route name="app" path="/" component={App}>
      <Route name="todo" path="/todo" component={Todo}/>
      <Route name="todo" path="/chat" component={Todo}/>
      <IndexRoute name="home" component={Home}/>
    </Route>
    <Route path="*" component={App}/>
  </Router>
), app);

//if (!Cookie.load('uid') || !Cookie.load('access_token')) {
//  location.href = "#/login";
//}