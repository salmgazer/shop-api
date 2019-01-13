// Initializes the `categories` service on path `/categories`
const createService = require('feathers-knex');
const createModel = require('./categories.model');
const hooks = require('./categories.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'categories',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/categories', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('categories');

  service.hooks(hooks);
};
  