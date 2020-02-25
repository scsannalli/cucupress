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

const oracledb = require('oracledb');
const sdb = require('../../db/mqsqldb');
const odb = require('../../db/oracledb');

function getMySQLDetails(config){
if (config.env.backend){
  sdb.executeMySQLQuery(config);
};
 return null
};

function getODB(config)
{ 
  if (config.env.backend){
  odb.executeODB(config);
  }
  return null
}

function validateAPIs(config){
  console.log('Validate APIs');
  return null
}


module.exports = (on, config) => {
  on('file:preprocessor', cucumber()),
  
  on('task', {
    queryDb: execute => {return getMySQLDetails(config)},
  }),

  on('task', {
    odb: execute =>  {return getODB(config)}
  }),

  on('task', {
    api: execute => {return validateAPIs(config)},
  })

}




