var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Drink.findAll({}).then(function(dbDrinks) {
      res.render("index", {
        msg: "Welcome!",
        Drink: dbDrinks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/drinks/:id", function(req, res) {
    db.Drink.findOne({ where: { id: req.params.id } }).then(function(dbDrinks) {
      res.render("drink", {
        Drink: dbDrinks
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

//add code to add user entry to the database