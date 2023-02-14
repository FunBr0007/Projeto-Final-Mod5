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
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopse:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    FilmId:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Wishlist.belongsTo(User)
  User.hasMany(Wishlist)
  
module.exports = Wishlist