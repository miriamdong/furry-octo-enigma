let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;

// const knex = require('knex');
// const knexfile = require('./knexfile');

// let db = knex(knexfile.development);
// if (process.env.DATABASE_URL) {
//   db.connectionString = process.env.DATABASE_URL;
// } else {
//   db = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

// module.exports = db;
