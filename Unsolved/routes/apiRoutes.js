var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/drinks", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Create a new example
  app.post("/api/drinks", function(req, res) {
    db.Drinks.create(req.body).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Delete an example by id
  app.delete("/api/drinks/:id", function(req, res) {
    db.Drinks.destroy({ where: { id: req.params.id } }).then(function(dbDrink) {
      res.json(dbDrinks);
    });
  });
};
