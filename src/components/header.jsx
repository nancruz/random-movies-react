var React = require('react');
var Router = require('react-router');
var Actions = require('../actions');
var Threshold = require('../config').Threshold;
var Link = Router.Link;

module.exports = React.createClass({
  getInitialState: function(){
    return {
      isExpanded: false,
      yearFrom: '',
      yearFromValid: true,
      yearTo: '',
      yearToValid: true,
      score: Threshold.voteAverage,
      scoreValid: true
    }
  },
  render: function(){
    return <nav className="header navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Random Movie</Link>
        </div>
        <div className="navbar-right">
          <button className="btn btn-default navbar-btn" onClick={this.handleFilterClick}>
            <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      {this.renderFilters()}
    </nav>
  },
  renderFilters: function(){
    return <div className={this.state.isExpanded ? "container filters-container" : "filters-container container hidden"}>
      <form className="form-inline">
        <div className="form-group year-form">
          <label>Year:</label>
          <input type="number" className={this.state.yearFromValid ? "form-control" : "form-control invalid-input"} placeholder="From" maxLength="4" onChange={this.updateYearFrom}/>
          <input type="number" className={this.state.yearToValid ? "form-control" : "form-control invalid-input"} placeholder="To" maxLength="4" onChange={this.updateYearTo}/>
        </div>
        <div className="form-group score-form">
          <label>Score(min):</label>
          <input type="number" step="0.1" min="0" max="10" className={this.state.scoreValid ? "form-control" : "form-control invalid-input"} defaultValue={this.state.score} onChange={this.updateScore}></input>
        </div>
      </form>
      <div className={(this.state.yearFromValid && this.state.yearToValid) ? "hidden" : "error-label"}>*Invalid years interval</div>
      <div className={(this.state.scoreValid) ? "hidden" : "error-label"}>*Invalid score</div>
      <button className="btn btn-primary" onClick={this.saveFilters}>Save</button>
    </div>
  },
  handleFilterClick: function(){
    var currentState = this.state;
    currentState.isExpanded = !this.state.isExpanded;
    this.setState(currentState);
  },
  saveFilters: function(){
    if(this.isFiltersValid()){
      var currentState = this.state;
      currentState.isExpanded = !this.state.isExpanded;
      this.setState(currentState);
      Actions.setFilters(this.state.yearFrom, this.state.yearTo, this.state.score);
    }
  },
  isFiltersValid: function(){
    var currentDate = new Date();
    var currentState = this.state;
    currentState.yearFromValid = !(this.state.yearFrom.length > 0 && this.state.yearFrom.length != 4);
    currentState.yearToValid = !(this.state.yearTo.length > 0 && this.state.yearTo.length != 4 && this.state.yearTo > currentDate.getYear());
    currentState.scoreValid = !(this.state.score < 0 || this.state.score > 10);
    var filtersValid = (this.state.yearFromValid && this.state.yearToValid && this.state.scoreValid);
    this.setState(currentState);
    return filtersValid;
  },
  updateYearFrom: function(event){
    var currentState = this.state;
    currentState.yearFrom = event.target.value;
    this.setState(currentState);
  },
  updateYearTo: function(event){
    var currentState = this.state;
    currentState.yearTo = event.target.value;
    this.setState(currentState);
  },
  updateScore: function(event){
    var currentState = this.state;
    currentState.score = event.target.value;
    this.setState(currentState);
  }
})
