const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/db");

// Bring in the routes
const mainRoutes = require("./routes/main.js");

// Use the .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport
require("./config/passport")(passport);

// Connect to database
connectDB();

// Use EJS for the views
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Express built in parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging with Morgan
app.use(logger("dev"));

// Sessions stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash for errors
app.use(flash());

// Call Routes
app.use("/", mainRoutes);

const PORT = process.env.PORT || 8000;

// Run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
