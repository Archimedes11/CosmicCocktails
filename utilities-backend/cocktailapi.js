const axios = require('axios').default;

var parseDrink = (data) => {
    if (!data) {
        return null;
    }

    var drink = {
        drinkName: data.strDrink,
        alcohol: data.strAlcoholic,
        glass: data.strGlass,
        instructions: data.strInstructions,
        drinkImage: data.strDrinkThumb,
        idDrink: data.idDrink,
        ingredients: []
    };

    for (var j = 1; j <= 15; j++) {
        var name = data["strIngredient" + j];
        var measurement = data["strMeasure" + j];

        if (name !== null) {
            drink.ingredients.push({ name, measurement });
        } else {
            break;
        }
    }

    return drink;
};

var drinkUtilities = {
    getDrinksFromCocktaildb: function (searchQuery, callback) {
        axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchQuery)
            .then(function (response) {
                var drinks = response.data.drinks || []; // Fix: Handle null response
                var drinks_final = drinks.map(parseDrink).filter(d => d !== null);
                callback(drinks_final);
            })
            .catch(err => {
                console.error("Error fetching drinks:", err);
                callback([]); // Return empty array on error
            });
    },

    getCocktailByID: async (idDrink) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
            return parseDrink(response.data.drinks ? response.data.drinks[0] : null);
        } catch (err) {
            console.error("Error fetching cocktail:", err);
            return null;
        }
    }
};

module.exports = drinkUtilities;
