const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'userb',
  password: 'password',
  database: 'sitepoint'
});

let gerLoad  = getPayLoad();

function getPayLoad(){ 
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
  end()
};

function end(connection)
{
connection.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });
};

module.exports.getPayLoad = getPayLoad;

