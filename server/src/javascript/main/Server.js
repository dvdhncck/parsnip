const PORT=8080;
var http = require('http');
var url = require('url');
var mysql = require('mysql');
var express = require("express");
var finder = require('./Finder.js');

var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dave',
  password : '',
  database : 'parsnip'
});

connection.connect();

function handlePathRequest(request, response){

    var requestUrl = url.parse(request.url, true);
    var photoPath = requestUrl.path.replace('/path/','');
    //response.send(JSON.stringify({path:photoPath}));
    finder.getItemsForPath(connection, photoPath, response);
}

app.get("/path/*",function(req,res){-
        handlePathRequest(req,res);
});

app.listen(PORT);
