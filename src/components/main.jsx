var React = require('react');
var Header = require('./header');
var MovieInfo = require('./movie-info');

module.exports = React.createClass({
  render: function(){
    return <div>
      <Header />
      <MovieInfo />
    </div>
  }
});
