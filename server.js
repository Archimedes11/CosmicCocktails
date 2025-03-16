require("dotenv").config();
const express = require("express");
const { engine } = require('express-handlebars');
const axios = require('axios').default;
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require("./models");

// Passport Setup
passport.use(new Strategy(
  function(username, password, cb) {
    db.User.findAll({ where: { Username: username} })
      .then(users => {
        // No user found
        if(users.length === 0) {
          return cb(null, false);
        }
        
        // Wrong Password
        if(users[0].Password !== password) {
          return cb(null, false);
        }

        // Successful Login
        return cb(null, users[0].dataValues);
      })
      .catch(err => {
        return cb(err)
      });
  }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user.UserID);
});

passport.deserializeUser(function(id, cb) {
  db.User.findAll({where: {UserId: id}})
    .then(users => {
      cb(null, users[0]);
    })
    .catch(err => cb(err));
});

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
