const express = require('express')
const router = express.Router()
const FilmsController = require('../controllers/FilmsController')

const checkAuth = require('../helpers/auth').checkAuth


router.get('/', FilmsController.showHome)
router.get('/sobre/:id', FilmsController.showOneFilm)
router.get('/add/:id', checkAuth, FilmsController.addToWishlist)
router.post('/adicionar', checkAuth, FilmsController.addToWishlist )
//router.post('/add/:id', checkAuth, FilmsController.addToWishlist)
router.get('/wishlist', checkAuth, FilmsController.showWishlist)
router.post('/wishlist', checkAuth, FilmsController.removeWishlist)

module.exports = router