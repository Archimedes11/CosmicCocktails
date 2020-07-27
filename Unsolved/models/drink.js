module.exports = function (sequelize, DataTypes) {
  //columns for "text" (DataTypes.STRING), and "complete" (DataTypes.BOOLEAN).
  var Drink = sequelize.define("Drink",
    { drink_name: DataTypes.STRING
        
    });
  return Drink;
};