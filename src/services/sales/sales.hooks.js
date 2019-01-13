const auth = require('@feathersjs/authentication');
const calculateSalesTotal = require('../../hooks/calculate-sales-total');

module.exports = {
  before: {
    all: [auth.hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (context) => calculateSalesTotal(context)
    ],
    update: [
      (context) => calculateSalesTotal(context)
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
