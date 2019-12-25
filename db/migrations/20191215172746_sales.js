exports.up = async (knex) => {
  await knex.schema.createTable('sales', (table) => {
    table.string('id').notNullable().primary();
    table.float('quantity').notNullable();
    table.string('type').notNullable();
    table.float('cost_price');
    table.float('selling_price');
    table.string('customer_id').notNullable();
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sales');
};
