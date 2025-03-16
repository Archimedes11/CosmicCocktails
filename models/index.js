"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config(); // Load environment variables

const basename = path.basename(__filename);
const db = {};

// Correct JawsDB MySQL Connection for Heroku
const sequelize = process.env.DB_HOST
  ? new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        logging: false, // Disable SQL logging for production
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Required for JawsDB SSL
          },
        },
      }
    )
  : new Sequelize(
      "drinks_db", // Local database
      "root",
      "Bornin1989.",
      {
        host: "localhost",
        dialect: "mysql",
        logging: false,
      }
    );

// Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
