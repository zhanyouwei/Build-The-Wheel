require('./AboutPage.scss');

var React = require('react');

var AboutPage = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    return (
      <div className="AboutPage">
        <p>
        E-mail: <a href="mailto:zhanyouwei@icloud.com">zhanyouwei@icloud.com</a>
        </p>
      </div>
    );
  }
});

module.exports = AboutPage;
