// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');



// PG database client/connection setup
const pg = require("pg");
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL || ""
});

db
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");
const tagsRoutes = require("./routes/tags");
const entriesTagRoutes = require("./routes/entries-tags");
const entriessRoutes = require("./routes/entries");
const timersRoutes = require("./routes/timers");
const audiosRoutes = require("./routes/audios");

// Mount all resource routes
app.use("/users", usersRoutes(db));
app.use("/categories", categoriesRoutes(db));
app.use("/tags", tagsRoutes(db));
app.use("/etnries-tags", entriesTagRoutes(db));
app.use("/entries", entriessRoutes(db));
app.use("/timers", timersRoutes(db));
app.use("/audios", audiosRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
