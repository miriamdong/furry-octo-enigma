// Update with your config settings.

require('dotenv').config();
module.exports = {


  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    // searchPath: ['knex', 'public'],
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     port: process.env.DB_PORT,
  //     host: process.env.DB_HOST,
  //     database: process.env.DB_NAME,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASS,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     directory: __dirname + '/migrations',
  //   },
  //   seeds: {
  //     directory: __dirname + '/seeds'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     port: process.env.DB_PORT,
  //     host: process.env.DB_HOST,
  //     database: process.env.DB_NAME,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASS,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     directory: __dirname + '/migrations',
  //   },
  //   seeds: {
  //     directory: __dirname + '/seeds'
  //   }
  // }
};
