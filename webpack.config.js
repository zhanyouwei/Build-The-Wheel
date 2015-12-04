/**
 * Copyright 2015 kaiheiwang Corporation. All rights reserved.
 * Created by Youwei on 15/12/3.
 */

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: APP_PATH,
  //entry: {
  //app: './app/main.js'
  //},
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: APP_PATH
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: APP_PATH
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=819200',
        include: APP_PATH
      },
      {test: /\.woff$/, loader: "url?limit=10000&minetype=application/font-woff"},
      {test: /\.woff2$/, loader: "url?limit=10000&minetype=application/font-woff"},
      {test: /\.ttf$/, loader: "file"},
      {test: /\.eot$/, loader: "file"},
      {test: /\.svg$/, loader: "file"}
    ]
  },
  //自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'React Application Demo'
    })
  ]
};