const { DataTypes } = require('sequelize')
const User = require('./User')
const db = require('../db/conn')

const Film = db.define('Movies', {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    synopse:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Film

const FilmsController = require('../controllers/FilmsController');

setTimeout(() => {
    FilmsController.imagePath()
}, 3000)
