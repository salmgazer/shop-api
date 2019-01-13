// Initializes the `sales` service on path `/sales`
const createService = require('feathers-knex');
const createModel = require('./sales.model');
const hooks = require('./sales.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sales',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sales', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sales');

  service.hooks(hooks);
};
  