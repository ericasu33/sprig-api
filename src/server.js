// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const cors       = require("cors");



// PG database client/connection setup
const { Client } = require("pg");
const db = new Client({
  connectionString: process.env.DATABASE_URL});

db
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(cors());
app.use(cookieSession({
  name: 'session',
  keys: ["lilduck"],
}));
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const soundsRoutes = require("./routes/sounds");
const pomodorosRoutes = require("./routes/pomodoros");
const stopwatchsRoutes = require("./routes/stopwatches");

// Mount all resource routes

app.use("/api/sound", soundsRoutes(db));
app.use("/api/pomodoro", pomodorosRoutes(db));
app.use("/api/stopwatches", stopwatchsRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
