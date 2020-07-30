var drinkOption = document.getElementById("drink-Option");

drinkOption.addEventListener("click", function() {
        var drinkHistory = [];
drinkHistory.push(this.drinkName);
console.log(drinkHistory);  
});


// // Get references to page elements this is the logic
// var $drinksName = $("#drinks-name");
// //var $drinksIngredients = $("#drinks-ingredients");
// var $submitBtn = $("#submit");
// var $drinksList = $("#drinks-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveDrinks: function(drinks) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/drinks",
//       data: JSON.stringify(drinks)
//     });
//   },
//   getDrinks: function() {
//     return $.ajax({
//       url: "api/drinks",
//       type: "GET"
//     });
//   },
//   deleteDrink: function(id) {
//     return $.ajax({
//       url: "api/drinks/" + id,
//       type: "DELETE"
//     });
//   },
//   searchCocktails: function(drinkName) {
//     return $.ajax({
//       url: "search/" + drinkName,
//       type: "POST"
//     });
//   }
// };


// // refreshExamples gets new examples from the db and repopulates the list
// var refreshDrinks = function() {
//   API.getDrinks().then(function(data) {
//     console.log(data);
//     var $drinks = data.map(function(drinks) {
//       var $a = $("<a>")
//         .text(drinks.drink_name)
//         .attr("href", "/drinks/" + drinks.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": drinks.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });


//     $drinksList.empty();
//     $drinksList.append($drinks);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   // event.preventDefault();

//   var drink_name = $drinksName.val().trim();

//   if (!drink_name) {
//     alert("You must enter a drink or an ingredient!");
//     return;
//   }

//   // Fetch Cocktails from the api
//   API.searchCocktails(drink_name);
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteDrink(idToDelete).then(function() {
//     refreshDrinks();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);

// $drinksList.on("click", ".delete", handleDeleteBtnClick);

