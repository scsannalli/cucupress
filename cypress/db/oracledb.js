var oracledb = require('oracledb');
oracledb.getConnection(
  {
    user          : 'HR',
    password      : 'oracle',
    connectString : 'localhost:1521/orcl',
    database:'orcl'
    
  },
  function(err, connection)
  {
      var query =  "SELECT department_id, department_name "
      + "FROM departments "
      + "WHERE department_id < 70 "
      + "ORDER BY department_id";
    
      if (err) { console.error(err); return; }
    connection.execute(query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });