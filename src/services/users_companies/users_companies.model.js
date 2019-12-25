/* eslint-disable no-console */

// users_companies-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users_companies';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      console.error(`Table ${tableName} does not exist`);
    } else {
      console.log(`Table ${tableName} exists`);
    }
  });


  return db;
};
