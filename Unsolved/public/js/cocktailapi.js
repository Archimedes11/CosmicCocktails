//This loads the enviroment variables from the .env folder
require("dotenv").config();

//Import the keys.js file
var keys = require("./keys.js");

function drinkType(userSearch) {
    // Run the get request via json using axios
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userSearch)
        .then(function (response) {
            var apiCocktail = response.data;
            for (var i = 0; i < apiCocktail.length; i++) {
                var liquidType = apiCocktail[i].drinks.strDrink;
                var alcohol = apiCocktail[i].drinks.strAlcoholic;
                var glass = apiCocktail[i].drinks.strGlass;
                var instructions = apiCocktail[i].drinks.strInstructions;
                var drinkImage = apiCocktail[i].drinks.strDrinkThumb;

                for (var j = 1; j < apiCocktail.length; j++)
                    var ingredient = apiCocktail[i].drinks["strIngredient" + j];
                if (!ingredient === null) {
                    var measure = apiCocktail[i].drinks["strMeasure" + j];
                } else {
                    j = 16;
                };

                console.log(liquidType);
                console.log(alcohol);
                console.log(glass);
                console.log(instructions);
                console.log(drinkImage);
                console.log(ingredient);
                console.log(measure);


            }
        }
        );
}