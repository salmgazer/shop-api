exports.up = async (knex) => {
  await knex.schema.createTable('companies', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('code').notNullable().unique();
    table.string('address');
    table.string('phone').notNullable();
    table.string('description');
    table.string('category');
    table.string('location_name').notNullable();
    table.string('location_gps');
    table.string('logo');
    table.string('status').notNullable();
    table.boolean('deleted').defaultTo(false).notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('companies');
};
