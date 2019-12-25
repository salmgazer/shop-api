exports.up = async (knex) => {
  await knex.schema.createTable('categories', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.string('company_id').notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('categories');
};
