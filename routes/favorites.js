const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.json({hello: "how are you"})
    const templateVars = {"user_id": req.session.user_id}; //"listing": data.rows,
    res.render("favorites", templateVars);
    // db.query(`SELECT * FROM users;`)
    // .then(data => {
    //   // console.log("Abcdefghij:", data);
    //   const users = data.rows;
    //   // res.json({ users });
    // })
    // .catch(err => {
    //   res.status(500);
    //   console.log("ERROR in favorites.js:", err);
    //   //   .json({ error: err.message });
    // });
    // console.log("success", db);
  });

  router.post("/:listingid", (req, res) => {
    // const queryParams = ["favorites"];
    const queryString = `SELECT * FROM favorites;`;
    db.query( queryString)
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
