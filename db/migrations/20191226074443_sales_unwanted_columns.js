exports.up = async (knex) => {
  await knex.schema.alterTable('sales', (table) => {
    table.dropColumn('quantity');
    table.dropColumn('cost_price');
    table.dropColumn('selling_price');
    table.string('note');
  });

};

exports.down = async () => {};
