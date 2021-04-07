const express = require('express');
const router  = express.Router();
// const getAllListings = require('../db/seeds/01_users.sql');
// const getAllListings = require('../db/database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //*********************** DEFAULT PAGE (may move to its own route file later) */

      // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT DISTINCT listings.*
    FROM listings
    JOIN listingItems ON listings.id = listing_id
    JOIN products ON product_id = products.id
    JOIN artists ON artist_id = artists.id
    JOIN users ON listings.seller_id = users.id
    `;

    //commented this out because as far as we know, all of the front page stuff should always be featured
    // if (options.featured) {
      queryString += `WHERE featured = true `;
    // }

    //similar deal here
    // if (options.active) {
      queryString += `AND active = true `; // || `WHERE active = true`;
    // }

    /* also commenting this out because we aren't setting seller ID in cookies
    if (req.params.user_id === "admin") {
      queryParams.push(`${ options.seller_id }`);
      queryString += `AND seller_id = $${queryParams.length} ` || `WHERE seller_id = $${queryParams.length} `;
    }
    */

    if (req.body.minimum_price && req.body.maximum_price) {
      queryParams.push(`${req.body.minimum_price * 100}`, `${ req.body.maximum_price * 100}`);
      queryString += `
      AND price <= $${ queryParams.length } AND price >= $${ queryParams.length - 1 }` || `
      WHERE price <= $${ queryParams.length } AND price >= $${ queryParams.length - 1 }`;
    }

    // 4
    queryString += `
    GROUP BY artists.id, listings.id`;

    if (req.body.artist_id) {
      queryParams.push(`${ req.body.artist_id }`);
      queryString += `
      AND artist_id = $${ queryParams.length }` || ` WHERE artist_id = $${ queryParams.length } `;
    }

    queryParams.push(req.body.limit);
    queryString += `
    ORDER BY created_at
    LIMIT $${ queryParams.length };
    `;

    // 5
    console.log(queryString, queryParams);

    // 6
    return db.query(queryString, queryParams)
      .then(data => { //res.rows
        const templateVars = {
          "user_id": req.session.user_id,
          "data": data
        }
        // console.log("***********************************success!", data)
        res.render("index", templateVars);
      })
      .catch((err) => {
        console.log("************************************FATAL ERROR", err)
      })
      // console.log(getAllListings);
      // res.render("index", templateVars);
      // db.query(`SELECT * FROM users;`).then((data) => {
      //   console.log(data, res)
      // });

  });
  return router;
};
