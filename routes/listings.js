const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //******************************** LISTINGID ******************************
  router.get("/:listingid", (req, res) => {
    // console.log("POTATO:", req.session.user_id)
    // res.json({hello: "how are you"})
    db.query(`SELECT * FROM listings WHERE id = ${req.params.listingid};`)
    .then(data => {
      const templateVars = {"listing": data.rows, "user_id": req.session.user_id};
      res.render("listingsid", templateVars);
      // res.json(templateVars);
      // console.log("Abcdefghij:", data);
      // const users = data.rows;
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in listings.js:", err);
      //   .json({ error: err.message });
    });
    console.log("success", db);
  });

  //******************************** LISTING ******************************
  router.get("/", (req, res) => {
    // console.log(`Potato`, req.session.user_id);
    // // res.json({hello: "how are you"})
    db.query(`SELECT * FROM listings;`)
    .then(data => {
      const templateVars = {"listings": data.rows, "user_id": req.session.user_id};
      res.render("listings", templateVars);
      // res.json(templateVars);
      // console.log("Abcdefghij:", data);
      // const users = data.rows;
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in listings.js:", err);
      //   .json({ error: err.message });
    });
    console.log("success", db);
  });

  //******************************** LISTING POST ******************************
  router.post("/", (req, res) => {
    console.log("********************************************************POTATO:", req.body)
    // res.json({hello: "how are you"})

    const queryParams = [req.body.image, "1", req.body ]; //"1" can easily be swapped out for a user cookie down the road
    const queryString = `INSERT INTO listings (image_url, seller_id, title, created_at, featured, price, active)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7),`;
    //('url', 6, 'On the Line', 'March 22, 2019', true, 30, true)
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
