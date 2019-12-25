exports.up = async (knex) => {
  await knex.schema.createTable('sale_entries', (table) => {
    table.string('id').notNullable().primary();
    table.float('quantity').notNullable();
    table.string('type').notNullable();
    table.float('cost_price');
    table.float('selling_price');
    table.string('product_id').notNullable();
    table.string('product_name').notNullable();
    table.string('cost_price_allocations').notNullable();
    table.string('sale_id').notNullable();
    table.float('total').notNullable();
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sale_entries');
};
