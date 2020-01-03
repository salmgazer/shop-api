exports.up = async (knex) => {
  await knex.schema.alterTable('sales', (table) => {
    table.float('sales_total');
    table.float('arrears');
  });

};

exports.down = async () => {};
