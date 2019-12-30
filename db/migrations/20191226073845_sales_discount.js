exports.up = async (knex) => {
  await knex.schema.alterTable('sales', (table) => {
    table.float('discount');
  });

};

exports.down = async () => {};
