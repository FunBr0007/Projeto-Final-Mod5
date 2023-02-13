const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Film = require("./Film");
const User = require("./User");


const Wishlist = db.define('Wishlist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

User.belongsToMany(Film, { through: Wishlist, foreignKey: 'userId' });
Film.belongsToMany(User, { through: Wishlist, foreignKey: 'filmId' });

module.exports = Wishlist