module.exports = {

  getItemsForPath: function(connection, path, response)
  {
    var query = 'SELECT Path,Orientation FROM PhotoByDate WHERE Path LIKE "%' + path + '%" LIMIT 20';
      console.log(query);
      connection.query(query,
      function(err, rows, fields)
      {
        if (!err)
        {
          console.log('Found ' + rows.length + ' rows');
          //response.write('path=' + path);
          for(var r in rows)
          {
            response.write("  " + rows[r].Path);
          }
          response.end('bye!');
        }
        else
        {
          console.log('Error ' + err + ' while performing Query.');
        }
    });
  }};
