exports.up = async (knex) => {
  await knex.schema.createTable('brands', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('notes');
    table.string('company_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('brands');
};
