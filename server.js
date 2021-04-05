// load .env data into process.env
require('dotenv').config();
// COMMANDS to try in case of errors
// grant all on users to labber; (change users to table name)
// npm install pg@latest

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));



// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

//  ******************** ROUTES *****************************
const listings = require("./routes/listings");
app.use("/listings", listings(db));

// const listingsId = require("./routes/listingsid");
// app.use("/listings/:listingid", listingsId(db, req.params.id));

const favorites = require("./routes/favorites");
app.use("/favorites", favorites(db));

const messages = require("./routes/messages");
app.use("/messages", messages(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//if we were actually coding this out I'd put it in its own route file
//but since we were told not to code out login stuff, I'm putting it here
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  // console.log("POTATO:", req.session.user_id);
  res.redirect('/');
});

app.get("/", (req, res) => {
  const templateVars = {"user_id": req.session.user_id}
  res.render("index", templateVars);
  // db.query(`SELECT * FROM users;`).then((data) => {
  //   console.log(data, res)
  // });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
