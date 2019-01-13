module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/development`,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.POSTGRESQLCONNSTR_DB,
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
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
      directory: `${__dirname}/db/seeds/test`,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.CUSTOMCONNSTR_DB,
    pool: {
      min: 2,
      max: 20,
      softIdleTimeoutMillis: 60000,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`,
    },
  },
};
