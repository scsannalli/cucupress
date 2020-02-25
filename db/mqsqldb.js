const mysql = require('mysql');

// let gerLoad  = getPayLoad();

function executeMySQLQuery(config){ 
  const connection = mysql.createConnection(config.env.db);
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  connection.query('SELECT * FROM authors', (err,rows) => {
    if(err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
    rows.forEach( (row) => {
      console.log(`${row.name} lives in ${row.city}`);
    });
  })
  end(connection)
};


function end(connection)
{
connection.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });
};

module.exports.executeMySQLQuery = executeMySQLQuery;

