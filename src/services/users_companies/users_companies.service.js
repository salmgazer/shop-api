// Initializes the `users_companies` service on path `/users-companies`
const createService = require('feathers-knex');
const createModel = require('./users_companies.model');
const hooks = require('./users_companies.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users_companies',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users-companies', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users-companies');

  service.hooks(hooks);
};
