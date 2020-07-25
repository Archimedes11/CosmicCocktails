var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/drinks", function(req, res) {
    db.Drink.findAll({}).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // Create a new example
  app.post("/api/drinks", function(req, res) {
    db.Drink.create(req.body).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });
  
 // POST route for saving a new todo. We can create a todo using the data on req.body
 app.post("/api/drinks", function(req, res) {
  var drinkItem = {
    drink_name: req.body.drink_name,
    complete: req.body.complete
  }
  db.Drink.create(drinkItem).then(function(result) {
    return res.json(result);
  });
});

  // Delete an example by id
  app.delete("/api/drinks/:id", function(req, res) {
    db.Drink.destroy({ where: { id: req.params.id } }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });
};
// PUT route for updating todos. We can access the updated todo in req.body
//app.put("/api/drinks", function(req, res) {
//});