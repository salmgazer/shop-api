exports.up = async (knex) => {
  await knex.schema.createTable('customers', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('note');
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('customers');
};
