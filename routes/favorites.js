const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({hello: "how are you"})

    db.query(`
    SELECT favorites.date_added, users.name, listings.title, favorites.user_id
    FROM favorites
    JOIN users ON favorites.user_id = users.id
    JOIN listings ON listings.id = favorites.listing_id
    WHERE favorites.user_id = 1
    GROUP BY favorites.user_id, users.name, favorites.listing_id, favorites.date_added, listings.title
    ORDER BY favorites.date_added;`)
    .then(data => {
      console.log("****************************************************POTATO:", data);
      const templateVars = {"user_id": req.session.user_id, "favorites": data.rows}; //"listing": data.rows,
      // res.render("favorites", templateVars);
      // const users = data.rows;
      res.json({ data });
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
      // res.done();
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
