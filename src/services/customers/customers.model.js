/* eslint-disable no-console */

// customers-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'customers';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('phone').notNullable();
        table.string('company');
        table.string('address');
        table.string('about');
        table.float('credit').defaultTo(0.00);
        table.enu('gender', ['male', 'female']).defaultTo('male').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(db.raw('now()'));
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
