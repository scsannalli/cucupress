var oracledb = require('oracledb');

function executeODB(config) {
  oracledb.getConnection(config.env.odb, function (err, connection) {
    var query = "SELECT department_id, department_name "
      + "FROM departments "
      + "WHERE department_id < 70 "
      + "ORDER BY department_id";
    if (err) {
      console.error(err);
      return;
    }
    connection.execute(query, function (err, result) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result.rows);
    });
  });
}

module.exports.executeODB = executeODB