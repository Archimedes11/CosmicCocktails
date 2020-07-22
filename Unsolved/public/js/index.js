// Get references to page elements this is the logic
var $drinksText = $("#drinks-text");
var $drinksDescription = $("#drinks-description");
var $submitBtn = $("#submit");
var $drinksList = $("#drinks-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDrinks: function(drinks) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/drinks",
      data: JSON.stringify(drinks)
    });
  },
  getDrinks: function() {
    return $.ajax({
      url: "api/drinks",
      type: "GET"
    });
  },
  deleteDrinks: function(id) {
    return $.ajax({
      url: "api/drinks/" + id,
      type: "DELETE"
    });
  }
};

//this is where third party api is inserted????? -- add to api routes and html routes

// refreshExamples gets new examples from the db and repopulates the list
var refreshDrinks = function() {
  API.getDrinks().then(function(data) {
    var $drinks = data.map(function(drinks) {
      var $a = $("<a>")
        .text(drinks.text)
        .attr("href", "/drinks/" + drinks.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": drinks.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $drinksList.empty();
    $drinksList.append($drinks);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var drinks = {
    text: $drinksText.val().trim(),
    description: $drinksDescription.val().trim()
  };

  if (!(drinks.text && drinks.description)) {
    alert("You must enter a drink or an ingredient!");
    return;
  }

  API.saveDrinks(drinks).then(function() {
    refreshDrinks();
  });

  $drinksText.val("");
  $drinksDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDrink(idToDelete).then(function() {
    refreshDrink();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$drinksList.on("click", ".delete", handleDeleteBtnClick);
