module.exports = {
  getRandom: function(min, max){
    return Math.floor(Math.random() * max) + min;
  },
  getParamsStr: function(obj){
    var str = "";
    var argcount = 0;
    for(var key in obj){
      if(obj[key].length > 0) {
        if(argcount++){
          str += "&"
        }
        str += key + "=" + obj[key];
      }
    }
    return str;
  }
}
