const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'userb',
  password: 'password',
  database: 'sitepoint'
});

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
  });



connection.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });
