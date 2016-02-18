var Fetch = require('whatwg-fetch');
var Api = require('../config').Api;
var rootUrl = Api.rootUrl,
    apiKey = Api.apiKey,
    Helpers = require('./helpers'),
    Threshold = require('../config').Threshold;

module.exports = {
  get: function(url, options){
    var params = "?api_key=" + apiKey + "&vote_count.gte=" + Threshold.voteCount;
    if(options){
      params += "&" + Helpers.getParamsStr(options);
    }
    return fetch(rootUrl + url + params, {
      headers: {
        'Accept' : 'application/json'
      }
    })
    .then(function(response){
      return response.json();
    });
  }
}
