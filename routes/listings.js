const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({hello: "how are you"})
    db.query(`SELECT * FROM users;`)
    .then(data => {
      // res.render("listings");
      // console.log("Abcdefghij:", data);
      const users = data.rows;
      res.json({ users });
    })
    // .catch(err => {
    //   console.log("ERROR in listings.js:", err);
    //   // res
    //   //   .status(500)
    //   //   .json({ error: err.message });
    // });
    // console.log("success", db);
  });
  return router;
};
