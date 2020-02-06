exports.up = async (knex) => {
  await knex.schema.alterTable('products', (table) => {
    table.string('category_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('category_id');
  });
};
