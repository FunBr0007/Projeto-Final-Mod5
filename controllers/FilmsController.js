const Film = require('../models/Film')
const User = require('../models/User')
const { Sequelize } = require('sequelize')
const fs = require('fs')
const Wishlist = require('../models/Wishlist')
const url = require("url");

module.exports = class FilmsController {
    static async showHome(req, res) {
        try {
            const films = await Film.findAll({
                where: {
                    id: {[Sequelize.Op.ne]: null},
                    image: {[Sequelize.Op.ne]: null}
                }
            })
            const filmData = films.map((result) => result.dataValues)
            res.render('films/home', { filmData });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro no servidor: Nenhuma imagem encontrada');
        }
    }

    static async showOneFilm(req, res) {
        const id = req.params.id;
        if (!id) {
          res.render('films/whitelistFilms', { message: 'ID não fornecido' });
        } else {
          const movie = await Film.findOne({ where: { id: id } });
          if (!movie) {
            res.render('films/whitelistFilms', { message: 'Filme não encontrado' });
          } else {
            const baseUrl = 'http://localhost:3000';
            const imageUrl = `${baseUrl}/${movie.dataValues.image}`;
            res.render('films/whitelistFilms', { movie: movie.dataValues, imagePath: imageUrl });
          }
        }
    }

    static async imagePath(req, res) {
        const images = [];
        const files = fs.readdirSync('public/img');

        for (const file of files) {
            const existingImage = await Film.findOne({ where: { image: `img/${file}` } });

            if (!existingImage) {
                images.push({ image: `img/${file}` });
            }
        }

        await Film.bulkCreate(images);
        console.log('success');
    }

    static async addToWishlist(req, res) {
        const user = req.session.userid
        const imageUrl = req.body.imagePath
        const parsedURL = url.parse(imageUrl);
        const path = parsedURL.pathname;

        const film = {
          name: req.body.name,
          synopse: req.body.synopse,
          image: path,
          UserId: req.session.userid,
          FilmId: req.body.FilmId
        }

        if(!user) {
          return res.redirect('/');
        }

        try {
          await Wishlist.create(film)

          req.flash('message', 'Filme adicionado com sucesso')

          req.session.save(() => {
            res.redirect('/')
          })
        } catch (error) {
          console.log(error)
        }
    } 
        
    static async showWishlist(req, res) {
      const userId = req.session.userid;
      const user = await User.findOne({
        where: {
          id: userId
        },
        include: Wishlist,
        plain:true
      });
      
      const wishlist = user.Wishlists.map((result) => result.dataValues)
      
      if(!user) {
        return res.redirect('/');
      }

      res.render('films/wishlist', { wishlist });
    }

    static async removeWishlist(req, res) {
      const userId = req.session.userid;
      const filmId = req.body.idFilm;
      
      const wishlistItem = await Wishlist.findOne({
        where: {
          UserId: userId,
          FilmId: filmId
        }
      });

      if (!wishlistItem) {
        return res.redirect('/wishlist');
      }

      await wishlistItem.destroy();
      res.redirect('/wishlist');
    }
     
  }