exports.up = async (knex) => {
  await knex.schema.createTable('users_companies', (table) => {
    table.string('id').notNullable().primary();
    table.string('user_id').notNullable();
    table.string('company_id').notNullable();
    table.string('role').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users_companies');
};
