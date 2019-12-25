// Initializes the `sale_entries` service on path `/sale_entries`
const createService = require('feathers-knex');
const createModel = require('./sale_entries.model');
const hooks = require('./sale_entries.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sale_entries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sale_entries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sale_entries');

  service.hooks(hooks);
};
