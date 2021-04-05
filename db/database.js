/* eslint-disable camelcase */
require('dotenv').config();
const {
  Pool,
  Client
} = require('pg');


const db = require('./db');



/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(res => {
      if (res.rows[0] === undefined) return null;
      return res.rows[0];
    })
    .catch(err =>
      setImmediate(() => {
        throw err;
      })
    );
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then(res => {
      if (res.rows[0] === undefined) return null;
      return res.rows[0];
    })
    .catch(err =>
      setImmediate(() => {
        throw err;
      })
    );
};
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err =>
      setImmediate(() => {
        throw err;
      }));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all favorites for a single user.
 * @param {string} user_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// eslint-disable-next-line camelcase
const getAllFavorites = function(user_id, limit = 10) {
  return db.query(`
SELECT listings.*, products.*, artists.*
FROM favorites
JOIN listings ON listing_id = listings.id
JOIN listingItems ON listings.id = listing_id
JOIN products ON product_id = products.id
JOIN artists ON artist_id = artists.id
WHERE favorites.user_id = $1
GROUP BY listings.id, products.id
ORDER BY date_added
LIMIT $2;
`, [user_id, limit])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.getAllFavorites = getAllFavorites;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllListings = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT DISTINCT listings.*,
  FROM listings
  JOIN listingItems ON listings.id = listing_id
  JOIN products ON product_id = products.id
  JOIN artists ON artist_id = artists.id
  JOIN users ON listings.seller_id = users.id
  `;

  if (options.featured) {
    queryString += `WHERE featured = true`;
  }

  if (options.active) {
    queryString += `AND active = true` || `WHERE active = true`;
  }

  if (options.seller_id) {
    queryParams.push(`${ options.seller_id }`);
    queryString += `AND seller_id = $${queryParams.length} ` || `WHERE seller_id = $${queryParams.length} `;
  }

  if (options.minimum_price && options.maximum_price) {
    queryParams.push(`${options.minimum_price * 100}`, `${ options.maximum_price * 100}`);
    queryString += `
    AND price <= $${ queryParams.length } AND price >= $${ queryParams.length - 1 }` || `
    WHERE price <= $${ queryParams.length } AND price >= $${ queryParams.length - 1 }`;
  }


  // 4
  queryString += `
  GROUP BY artists.id`;

  if (options.artist_id) {
    queryParams.push(`${ options.artist_id }`);
    queryString += `
     AND artist_id = $${ queryParams.length }` || ` WHERE artist_id = $${ queryParams.length } `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY created_at
  LIMIT $${ queryParams.length };
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.getAllListings = getAllListings;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addListing = function(listing) {
  return db.query(`
  INSERT INTO listings
  (title, description, seller_id, img_url, price, created_at, featured, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;`, [listing.title, listing.description, listing.seller_id, listing.img_url,
      listing.price, listing.featured, listing.active
    ])
    .then(res => res.rows[0])
    .catch(err =>
      setImmediate(() => {
        throw err;
      }));
};

exports.addListing = addListing;



/**
 * Add a reservation to the database
 * @param {{string}} guest_id
 * @param {{}} options An object containing query options.
 * @param {{}} property , An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const markAsSold = function(seller_id, listing) {
  return db.query(`
  UPDATE listings
  SET listing.active = false
  WHERE seller_id = $1
  AND listings.id = $2
  RETURNING *;`, [seller_id, listing.id])
    .then(res => res.rows[0])
    .catch(err =>
      setImmediate(() => {
        throw err;
      }));

};

exports.markAsSold = markAsSold;
