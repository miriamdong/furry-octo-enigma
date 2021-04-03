const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({hello: "how are you"})
    db.query(`SELECT * FROM users;`)
    .then(data => {
      res.render("messages");
      // console.log("Abcdefghij:", data);
      // const users = data.rows;
      // res.json({ users });
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in messages.js:", err);
      //   .json({ error: err.message });
    });
    console.log("success", db);
  });
  return router;
};
