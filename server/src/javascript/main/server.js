const PORT=8080;
var http = require('http');
var url = require('url');
var mysql = require('mysql');
var express = require("express");
var finder = require('./finder.js');

var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dave',
  password : '',
  database : 'parsnip'
});

connection.connect();

function handleRequest(request, response){

    var requestUrl = url.parse(request.url, true);
    var photoPath = requestUrl.query.path;
    finder.getItemsForPath(connection, photoPath, response);
}

app.get("/",function(req,res){-
        handleRequest(req,res);
});

app.listen(PORT);
