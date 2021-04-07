const express = require('express');
const router  = express.Router();
// const getAllListings = require('../db/seeds/01_users.sql');
// const getAllListings = require('../db/database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {"user_id": req.session.user_id}
    res.render("newlisting", templateVars);
  });
  return router;
};
