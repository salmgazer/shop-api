/* eslint-disable no-console */

// sales-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'sales';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.enu('type', ['invoice', 'sale']);
        table.specificType('products', 'json[]').notNullable();
        table.specificType('returnedProducts', 'json[]');
        table.float('totalCostPrice').defaultTo(0.00).notNullable();
        table.float('totalSellingPrice').defaultTo(0.00).notNullable();
        table.float('profit').defaultTo(0.00).notNullable();
        table.string('salesPerson').notNullable();
        table.integer('customerId').notNullable();
        table.foreign('customerId').references('customers.id');
        table.timestamp('createdAt').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(db.raw('now()'));
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
