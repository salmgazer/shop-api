exports.up = async (knex) => {
  await knex.schema.createTable('product_prices', (table) => {
    table.string('id').notNullable().primary();
    table.float('price');
    table.string('product_id');
    table.float('quantity').notNullable();
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('product_prices');
};
