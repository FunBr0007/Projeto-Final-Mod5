const { DataTypes } = require('sequelize')
const User = require('./User')
const db = require('../db/conn')

const Film = db.define('Movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
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

const FilmsController = require('../controllers/FilmsController')

setTimeout(() => {
    FilmsController.imagePath()
}, 3000)
