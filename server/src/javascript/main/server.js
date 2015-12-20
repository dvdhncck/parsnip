//Lets require/import the HTTP module
var http = require('http');
var url = require('url');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dave',
  password : '',
  database : 'parsnip'
});

connection.connect();

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){

    var requestUrl = url.parse(request.url, true);
    var photoPath = requestUrl.query.path;
    var items = getItemsForPath(photoPath);

    response.write('path=' + photoPath);

    for(var i in items) { response.write("p=" + items[i]); };

    response.end('items=' + items.length);
}


function getItemsForPath(path)
{
    var query = 'SELECT Path,Orientation FROM PhotoByDate WHERE Path LIKE "%' + path + '%" LIMIT 20';
    var paths = [];

    console.log(query);

    connection.query(query,
      function(err, rows, fields)
      {
      if (!err)
      {
        console.log('Found ' + rows.length + ' rows');
        for(var r in rows)
        {
            console.log(rows[r].Path);
            paths.push(rows[r].Path);
        }
      }
      else
      {
        console.log('Error ' + err + ' while performing Query.');
       }
    });

    return paths;
}


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
