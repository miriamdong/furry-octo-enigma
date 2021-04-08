const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //get favorites page
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    // res.json({hello: "how are you"})
    // res.json(req.session.user_id);
    if (!req.session.user_id) {
      return res.redirect("/");
    }
    db.query(`
    SELECT DISTINCT favorites.date_added, users.name, listings.*, favorites.user_id, favorites.listing_id
    FROM favorites
    JOIN users ON favorites.user_id = users.id
    JOIN listings ON listings.id = favorites.listing_id
    WHERE favorites.user_id = 1
    GROUP BY favorites.user_id, users.name, favorites.listing_id, favorites.date_added, listings.title, listings.id
    ORDER BY favorites.date_added
    LIMIT 10;`)
      .then(data => {
        // console.log("****************************************************POTATO:", data);
        const templateVars = {
          "user_id": req.session.user_id,
          "favorites": data.rows
        }; //"listing": data.rows,
        res.render("favorites", templateVars);
        // const users = data.rows;
        // res.json(data.rows);
      })
      .catch(err => {
        res.status(500);
        console.log("ERROR in favorites.js:", err);
        //   .json({ error: err.message });
      });
    console.log("success", db);
  });

  //add new listing to favorites list
  router.post("/:listingid", (req, res) => {
    if (!req.session.user_id) {
      // console.log("is this printing");
      return res.redirect("/");
    }

    const queryParams = ["1", req.params.listingid]; //"1" can easily be swapped out for a user cookie down the road
    const queryString = `SELECT * FROM favorites WHERE favorites.user_id = $1 AND favorites.listing_id = $2`;
    db.query(queryString, queryParams)

      .then(data => {
        console.log("*****************************************************Abcdefghij:", data);

        if (data.rows.length === 0) {
          const queryParams2 = ["1", req.params.listingid]; //"1" can easily be swapped out for a user cookie down the road
          const queryString2 = `INSERT INTO favorites (user_id, listing_id, date_added)
          VALUES
          ($1, $2, NOW())`;
          db.query(queryString2, queryParams2)
        }
        // res.done();
        // const users = data.rows;

      })
      .then(data => {
        // res.json({ data });
        res.redirect("/listings");
      })
      .catch(err => {
        res.status(500);
        console.log("ERROR in favorites.js:", err);
        //   .json({ error: err.message });
      });
  });

  //remove listing from favorites
  router.post("/:listingid/delete", (req, res) => {
    if (!req.session.user_id) {
      return res.redirect("/");
    }
    // res.json({hello: "how are you"});
    const queryParams = [req.params.listingid]; //"1" can easily be swapped out for a user cookie down the road
    const queryString = `DELETE FROM favorites WHERE listing_id = $1 `;
    db.query(queryString, queryParams)
      .then(data => {
        // console.log("*****************************************************Abcdefghij:", data);
        // res.done();
        // const users = data.rows;
        // res.json({ users });
        res.redirect("/favorites");
      })
      .catch(err => {
        res.status(500);
        console.log("ERROR in favorites.js:", err);
        //   .json({ error: err.message });
      });

  });
  return router;
};
