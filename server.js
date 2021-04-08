// load .env data into process.env
require('dotenv').config();
// COMMANDS to try in case of errors
// grant all on users to labber; (change users to table name)
// GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
// for tbl in `psql -qAt -c "select tablename from pg_tables where schemaname = 'public';" midterm` ;
// do  psql -c "alter table \"$tbl\" owner to labber" midterm ; done
// npm install pg@latest

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const morgan = require('morgan');
const express = require("express");
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
console.log('io: ', io);


const users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id]
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});




// PG database client/connection setup
const {
  Pool
} = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


// View engine setup
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

// Static folder
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


//  ******************** ROUTES *****************************
const listings = require("./routes/listings");
app.use("/listings", listings(db));

const newlisting = require("./routes/newlisting");
app.use("/newlisting", newlisting(db));


// const listingsId = require("./routes/listingsid");
// app.use("/listings/:listingid", listingsId(db, req.params.id));

const favorites = require("./routes/favorites");
app.use("/favorites", favorites(db));

const messages = require("./routes/messages");
app.use("/messages", messages(db));

const index = require("./routes/index");
app.use("/", index(db));

//  ******************** LOG IN STUFF *****************************

//if we were actually coding this out I'd put it in its own route file
//but since we were told not to code out login stuff, I'm putting it here
app.post('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
  // console.log("POTATO:", req.session.user_id);
});

app.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/');
  // console.log("POTATO:", req.session.user_id);
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
