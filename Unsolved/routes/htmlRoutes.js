var db = require("../models");
var cocktailAPI = require("../utilities-backend/cocktailapi.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    var { query } = req.query;

    if(query) {
      cocktailAPI.getDrinksFromCocktaildb(query, cocktails => {
        res.render("index", {
          msg: "Welcome!",
          drinks: cocktails
        })
      })
    } 
    else {
      res.render("index", {
        msg: "Welcome!",
        drinks: []
      });
    }
  });

  // Load example page and pass in an example by id
  app.get("/drink/:id", async (req, res) => {
    var id = req.params.id;
    var drink = await cocktailAPI.getCocktailByID(id);

    res.render("drink", {
      drink
    });
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/favorites", async (req, res) => {
    // Fetch Favorites from DB by UserID
    var userID = 1;
    console.log(db.Favorite);

    db.Favorite.findAll({where: { UserID: userID }})
      .then( async favorites => {

        var drinks = []
        for(var i = 0; i < favorites.length; i++) {
          var id = favorites[i].DrinkID
          var drink = await cocktailAPI.getCocktailByID(id);
          drinks.push(drink);
        }

        console.log(drinks);

        res.render("favorites", {
          drinks: drinks
        })
      })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

//add code to add user entry to the database