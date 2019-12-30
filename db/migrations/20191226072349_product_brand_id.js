exports.up = async (knex) => {
  await knex.schema.alterTable('products', (table) => {
    table.string('brand_id').alter();
  });

};

exports.down = async () => {};
