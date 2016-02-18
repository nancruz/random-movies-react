var Reflux = require('reflux');
var Api = require('../utils/api');
var Threshold = require('../config').Threshold;
var Actions = require('../actions');
var _ = require('lodash');
var Helpers = require('../utils/helpers');

module.exports = Reflux.createStore({
  listenables: [Actions],
  init: function(){
    this.filters = {
      'release_date.gte': '',
      'release_date.lte': '',
      'vote_average.gte': Threshold.voteAverage
    }
  },
  setFilters: function(yearFrom, yearTo, score){
    if(yearFrom){
      this.filters['release_date.gte'] = yearFrom;
    }
    if(yearTo){
      this.filters['release_date.lte'] = yearTo;
    }
    if(score){
      this.filters['vote_average.gte'] = score;
    }
    if(yearFrom || yearTo || score){
      this.totalPages = null;
    }
    this.getMovie();
  },
  getMovie: function(){
    if(this.totalPages){
      this.fetchMovie();
    } else {
      Api.get('discover/movie')
        .then(function(json){
          if(!this.totalPages){
            this.totalPages = json.total_pages;
          }
          this.fetchMovie();
        }.bind(this));
    }
  },
  fetchMovie: function(){
    var params = this.filters;
    var pageNumber = Helpers.getRandom(1, this.totalPages);
    params['page'] = pageNumber;
    Api.get('discover/movie', params)
      .then(function(json){
        if(json.results.length > 0){
          var movieIndex = Helpers.getRandom(0, json.results.length - 1);
          var movieId = json.results[movieIndex].id;
          this.getMovieById(movieId);
        } else {
          this.triggerChange(null);
        }
      }.bind(this));
  },
  getMovieById: function(id){
    Api.get('movie/' + id, {'append_to_response': 'videos'})
      .then(function(json){
        this.triggerChange(json);
      }.bind(this));
  },
  triggerChange: function(movie){
    this.trigger('change', movie);
  }
})
