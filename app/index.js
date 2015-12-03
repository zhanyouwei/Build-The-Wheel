/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/3.
 */

require('./styles/main.scss');
var $ = require('jquery');
var moment = require('moment');


var sub = require('./sub');

var app = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);
$('body').append('<p>time now ' + moment().format() + '</p>');