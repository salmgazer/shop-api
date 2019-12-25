exports.up = async (knex) => {
  await knex.schema.createTable('settings', (table) => {
    table.string('id').notNullable().primary();
    table.string('primary_color');
    table.string('secondary_color');
    table.string('company_id').notNullable();
    table.string('user_id').notNullable();
    table.string('created_by').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('settings');
};
