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

    //"1" can easily be swapped out for a user cookie down the road
    const queryParams = [req.body.image, "1", req.body.listingtitle, req.body.featured, req.body.price, "true", req.body.description];
    // const queryParams = ["","","","","","",""]
    const queryString = `INSERT INTO listings (image_url, seller_id, title, created_at, featured, price, active, description)
    VALUES
    ($1, $2, $3, NOW(), $4, $5, $6, $7)`;
    //url, 6, 'War', 'April 17, 2019', true, 50, true)
    db.query( queryString, queryParams)
    .then(data => {
      // console.log("*****************************************************Abcdefghij:", data);
      // const users = data.rows;
      // res.json({ users });
      res.redirect("/listings");
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in favorites.js:", err);
      //   .json({ error: err.message });
    });
  });

  //******************************** LISTING UPDATE ******************************
  //Change query from Select to Update, change active to false
  router.post("/:listingid/update", (req, res) => {
    // res.json({hello: "how are you"})
    // console.log("POTATO:", req.session.user_id)
    const queryString = `
    UPDATE listings
    SET active = false
    WHERE id = $1`;

    const queryParams = [req.params.listingid];
    db.query( queryString, queryParams)
    .then(data => {
      // const templateVars = {"listing": data.rows, "user_id": req.session.user_id};
      // res.render("listingsid", templateVars);
      // res.json(templateVars);
      // console.log("Abcdefghij:", data);
      // const users = data.rows;
      res.redirect(`/listings/${req.params.listingid}`);
    })
    .catch(err => {
      res.status(500);
      console.log("ERROR in listings.js:", err);
      //   .json({ error: err.message });
    });
  });

  //******************************** LISTING DELETE ******************************
  router.post("/:listingid/delete", (req, res) => {
    res.json({hello: "how are you"})
    // // console.log("POTATO:", req.session.user_id)
    // const queryString = `
    // DELETE FROM listings
    // WHERE id = $1`;

    // const queryParams = [req.params.listingid];
    // db.query( queryString, queryParams)
    // .then(data => {
    //   // const templateVars = {"listing": data.rows, "user_id": req.session.user_id};
    //   // res.render("listingsid", templateVars);
    //   // res.json(templateVars);
    //   // console.log("Abcdefghij:", data);
    //   // const users = data.rows;
    //   res.redirect(`/listings/${req.params.listingid}`);
    // })
    // .catch(err => {
    //   res.status(500);
    //   console.log("ERROR in listings.js:", err);
    //   //   .json({ error: err.message });
    // });
  });
  return router;
};
