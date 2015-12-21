module.exports = {

  getItemsForPath: function(connection, path, response)
  {
    var query = 'SELECT Path,Orientation FROM PhotoByDate WHERE Path LIKE "' + path + '%" LIMIT 20';
      console.log(query);
      connection.query(query,
        function(err, rows, fields)
        {
          if (!err)
          {
            console.log('Found ' + rows.length + ' rows');
            //response.write('path=' + path);

            var result = [];
            for(var r in rows)
            {
              result.push(rows[r].Path);
            }

            response.setHeader('Content-Type', 'application/json');
            response.status(200);
            response.send(JSON.stringify({"paths":result}));
          }
          else
          {
            console.log('Error ' + err + ' while performing Query.');
            response.status(500);
            response.send(JSON.stringify({"fail":err}));
          }
        });
  }
};
