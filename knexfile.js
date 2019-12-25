const {types} = require('pg');
require('dotenv').config();

types.setTypeParser(1082, (val) => val);

module.exports = {
  local: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  development: {
    debug: true,
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  test: {
    debug: false,
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_TEST_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  beta: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    pool: {
      min: 2,
      max: 10,
      softIdleTimeoutMillis: 60000,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  qa: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    pool: {
      min: 2,
      max: 10,
      softIdleTimeoutMillis: 60000,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    pool: {
      min: 2,
      max: 20,
      softIdleTimeoutMillis: 60000,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
};
