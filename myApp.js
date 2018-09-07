
var express = require('express');
var app = express();

app.get('/api/timestamp/:date_string', function(req, res, next){
  let date;
  let time;
  let param = req.params.date_string;
  console.log(param);
  if(param === ''){
    date = new Date();
    time = new Date().getTime();
  } else {
    if(isUnixTimestamp(param)){
      date = new Date(parseInt(param));
      time = parseInt(param);
    } else {
      date = new Date(param);
      time = Date.parse(param);
    }
    
    console.log(time);
    console.log(typeof param);
  }
  console.log(date);
  let utc = date.toUTCString();
  if(isNaN(time)){
      res.json({"error" : "Invalid Date"});
  } else {
      res.json({"unix" : time, "utc" : utc});
  }
});

function isUnixTimestamp(x) {
  let timestamp = x / 1000
  let time = new Date(timestamp)

  return isNaN(Date.parse(time)) ? false : true
}

 module.exports = app;
