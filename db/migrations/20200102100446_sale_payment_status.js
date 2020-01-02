exports.up = async (knex) => {
  await knex.schema.alterTable('sales', (table) => {
    table.string('payment_status');
  });

};

exports.down = async () => {};
