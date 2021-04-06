const express = require('express');
const router = express.Router();

module.exports = (db) => {
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

  router.post("/:listingid", (req, res) => {
    console.log("********************************************************POTATO:", req.body)
    // res.json({hello: "how are you"})

    /*
    text -> names
    action: listing id -> post listings (change route to just listings)
    req.params -> route,
    req.body -> form body
    */

    // db.query(`SELECT * FROM listings WHERE id = ${req.params.listingid};`)
    // .then(data => {
    //   const templateVars = {"listing": data.rows, "user_id": req.session.user_id};
    //   res.render("listingsid", templateVars);
    //   // res.json(templateVars);
    //   // console.log("Abcdefghij:", data);
    //   // const users = data.rows;
    // })
    // .catch(err => {
    //   res.status(500);
    //   console.log("ERROR in listings.js:", err);
    //   //   .json({ error: err.message });
    // });
    // console.log("success", db);
  });

  return router;
};
