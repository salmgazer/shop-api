const auth = require('@feathersjs/authentication');
const updateSellingPrice = require('../../hooks/update-selling-price');

module.exports = {
  before: {
    all: [auth.hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => updateSellingPrice(context)
    ],
    update: [
      (context) => updateSellingPrice(context)
    ],
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
