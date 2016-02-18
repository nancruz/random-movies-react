var React = require('react');
var Reflux = require('reflux');
var MovieStore = require('../stores/movie-store');
var Actions = require('../actions');
var ImageUrl = require('../config').Api.imageUrl;

module.exports = React.createClass({
  mixins:[
    Reflux.listenTo(MovieStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      movie: null,
      mediaHover: false
    }
  },
  componentWillMount: function(){
    Actions.getMovie();
  },
  render: function(){
    if(this.state.movie){
      return <div>
        {this.renderMedia()}
        {this.renderInfo()}
      </div>
    } else {
      return <div>
        </div>
    }
  },
  renderMedia: function(){
    return <div className="media-container" onMouseEnter={this.handleMediaHover} onMouseLeave={this.handleMediaHover}>
      <div className={this.state.mediaHover ? "next-button-container pull-right" : "next-button-container pull-right hidden"}>
        <span className="glyphicon glyphicon-chevron-right" onClick={Actions.getMovie}></span></div>
        {this.state.movie.videos.results.length > 0 ? this.renderMovie() : this.renderImage()}
    </div>
  },
  renderMovie: function(){
    var videoUrl = "https://www.youtube.com/embed/" + this.state.movie.videos.results[0].key + "?autoplay=1";
    return <div className="embed-responsive embed-responsive-16by9">
      <iframe id="ytplayer" clasName="embed-responsive-item" type="text/html" width="640" height="390"
        src={videoUrl}/>
    </div>
  },
  renderImage: function(){
    return <div>
      <img clasName=".img-responsive" src={ImageUrl + this.state.movie.backdrop_path} />
    </div>
  },
  renderInfo: function(){
    return <div className="movie-info-container">
      {this.renderTitle()}
      <div className="movie-genres">
        {this.renderGenres()}
      </div>
      {this.renderDescription()}
    </div>
  },
  renderTitle: function(){
    return <h2>
      {this.state.movie.title}
      <div className="movie-score pull-right">{this.state.movie.vote_average}</div>
    </h2>
  },
  renderGenres: function(){
    return this.state.movie.genres.map(function(item){
      return <span className="label label-default" key={item.id}>{item.name}</span>
    });
  },
  renderDescription: function(){
    return <p className="movie-description">{this.state.movie.overview}</p>
  },
  onChange: function(event, movie){
    this.setState({movie:movie});
  },
  handleMediaHover: function(event){
    var currentState = this.state;
    currentState.mediaHover = !currentState.mediaHover;
    this.setState(currentState);
  }
});
