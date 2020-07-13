exports.up = async (knex) => {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('brand_id');
  });

  await knex.schema.alterTable('products', (table) => {
    table.string('brand_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('category_id');
  });
};
