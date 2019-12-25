exports.up = async (knex) => {
  await knex.schema.createTable('expenses', (table) => {
    table.string('id').notNullable().primary();
    table.float('amount').notNullable();
    table.string('purpose');
    table.string('expense_category_id').notNullable();
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.bigInteger('date').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('expenses');
};
