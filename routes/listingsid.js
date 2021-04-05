//DO NOT USE THIS CODE. Now handled through listings.js

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("POTATO:", req.params.id)
    // res.json({hello: "how are you"})
    // db.query(`SELECT * FROM listings WHERE id = ${req.params.id};`)
    // .then(data => {
    //   // res.render("listingsid");
    //   // console.log("Abcdefghij:", data);
    //   // const users = data.rows;
    //   res.json({ data });
    // })
    // .catch(err => {
    //   res.status(500);
    //   console.log("ERROR in listingsid.js:", err);
    //   //   .json({ error: err.message });
    // });
    // console.log("success", db);
  });
  return router;
};
