// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const cucumber = require('cypress-cucumber-preprocessor').default
 
// module.exports = (on, config) => {
//   on('file:preprocessor', cucumber())
// }

const mysql = require('mysql')

function getPayLoad(){
// const connection = mysql.createConnection(config.env.db);
const rows ="";
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
 })
 connection.end((err) => {
   // The connection is terminated gracefully
   // Ensures all remaining queries are executed
   // Then sends a quit packet to the MySQL server.
 });
 return rows
};

module.exports = (on, config) => {
  // Usage: cy.task('queryDb', query)
  on('task', {
    queryDb: query => {return getPayLoad()},
  }),
  on('file:preprocessor', cucumber())

}




