exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('address');
    table.string('email');
    table.string('username').notNullable().unique();
    table.string('profile_picture');
    table.string('password').notNullable();
    table.string('status').notNullable();
    table.string('created_by');
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
