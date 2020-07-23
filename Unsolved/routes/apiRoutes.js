var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/drinks", function(req, res) {
    db.drinks.findAll({}).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Create a new example
  app.post("/api/drinks", function(req, res) {
    db.drinks.create(req.body).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Delete an example by id
  app.delete("/api/drinks/:id", function(req, res) {
    db.drinks.destroy({ where: { id: req.params.id } }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });
};
