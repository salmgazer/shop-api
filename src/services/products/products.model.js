/* eslint-disable no-console */

// products-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'products';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.integer('quantity');
        table.float('costPricePerUnit').notNullable();
        table.float('sellingPricePerUnit');
        table.float('length');
        table.string('unitOfMeasure');
        table.integer('categoryId').notNullable();
        table.foreign('categoryId').references('categories.id');
        table.string('description');
        table.integer('brandId').notNullable();
        table.foreign('brandId').references('brands.id');
        table.string('image');
        table.timestamp('createdAt').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(db.raw('now()'));
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
