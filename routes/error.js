const express = require('express');
const router  = express.Router();
// const getAllListings = require('../db/seeds/01_users.sql');
// const getAllListings = require('../db/database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    // if (req.session.user_id !== "admin") {
    //   return res.redirect("/");
    // }
    const templateVars = {"user_id": req.session.user_id}
    res.render("error", templateVars);
  });
  return router;
};
