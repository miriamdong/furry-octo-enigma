const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({hello: "how are you"})

    db.query(`
    SELECT listings.*, products.*, artists.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN listingItems ON listings.id = favorites.listing_id
    JOIN products ON product_id = products.id
    JOIN artists ON artist_id = artists.id
    WHERE favorites.user_id = 1
    GROUP BY listings.id, products.id, artists.id, favorites.date_added
    ORDER BY date_added
    LIMIT 10;`)
    .then(data => {
      console.log("****************************************************POTATO:", data);
      const templateVars = {"user_id": req.session.user_id, "data": data}; //"listing": data.rows,
      res.render("favorites", templateVars);
      // const users = data.rows;
      // res.json({ data.rows });
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in favorites.js:", err);
      //   .json({ error: err.message });
    });
    console.log("success", db);
  });

  router.post("/:listingid", (req, res) => {
    const queryParams = ["1", req.params.listingid]; //"1" can easily be swapped out for a user cookie down the road
    const queryString = `INSERT INTO favorites (user_id, listing_id, date_added)
    VALUES
    ($1, $2, NOW())`;
    db.query( queryString, queryParams)
    .then(data => {
      console.log("*****************************************************Abcdefghij:", data);
      // const users = data.rows;
      // res.json({ users });
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in favorites.js:", err);
      //   .json({ error: err.message });
    });
  });
  return router;
};
