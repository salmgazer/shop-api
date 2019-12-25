exports.up = async (knex) => {
  await knex.schema.createTable('products', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('description');
    table.float('quantity').defaultTo(0).notNullable();
    table.float('selling_price').notNullable();
    table.integer('brand_id');
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
};
