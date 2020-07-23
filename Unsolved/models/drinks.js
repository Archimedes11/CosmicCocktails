// Dependencies
// =============================================================

/*This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");*/

module.exports = function (sequelize, DataTypes) {

  //columns for "text" (DataTypes.STRING), and "complete" (DataTypes.BOOLEAN).
  var Drink = sequelize.define("Drink",
    { drink_name: DataTypes.STRING },
    {
      timestamps: false
    });

  return Drink;
};

