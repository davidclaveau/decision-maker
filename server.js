// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

const db = require('./lib/connection.js');
const indexQueries = require('./lib/index-queries');


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
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const pollsRoutes = require("./routes/polls");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const errorRoutes = require("./routes/error");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/index/", indexRoutes);
app.use("/users/", usersRoutes);
app.use("/polls", pollsRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/error", errorRoutes);
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const templateVars = {};

  if (req.cookies.user_id) {
    indexQueries.getUser(req.cookies.user_id)
      .then((user) => {
        templateVars["userId"] = user.id;
        templateVars["userName"] = user.name;
        res.render('index.ejs', templateVars);
      })
      .catch((err) => {
        res.render("error.ejs");
      })
  } else {
    templateVars["userId"] = null;
    templateVars["userName"] = null;
    res.render('index.ejs', templateVars);
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
