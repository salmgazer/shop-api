exports.up = async (knex) => {
  await knex.schema.alterTable('sale_entries', (table) => {
    table.dropColumn('created_by');
  });

};

exports.down = async () => {};
