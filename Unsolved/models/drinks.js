module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("drinks", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Drink;
};
