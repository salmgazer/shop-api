const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

module.exports = {
  before: {
    all: [auth.hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [
      local.hooks.hashPassword({ passwordField: 'password' })
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [auth.hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
