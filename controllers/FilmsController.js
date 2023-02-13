const Film = require('../models/Film')
const User = require('../models/User')
const { Sequelize } = require('sequelize')
const fs = require('fs')
const Wishlist = require('../models/Wishlist')

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
        const userId = req.session.userid;
        const filmId = req.params.id;
        
            if (!userId) {
              return res.render('films/whitelistFilms', {message: 'Usuário não encontrado'});
            }
          
            try {
              const user = await User.findOne({
                where: {
                  id: userId,
                },
              });
              
                const films = await Film.findAll();
                const filmData = films.map((result) => result.dataValues)
          
              if (!user) {
                return res.render('films/whitelistFilms', {message: 'Usuário não encontrado'});
              }
          
              const film = await Film.findOne({
                where: {
                  id: filmId,
                },
              });
          
              if (!film) {
                return res.render('films/whitelistFilms', {message: 'Filme não encontrado'});
              }
          
              await Wishlist.create({
                userId,
                filmId,
              });
          
              return res.render('films/addWhitelistFilms', {filmData});
            } catch (error) {
              console.error(error);
              return res.status(500).send('Erro no servidor: Não foi possível adicionar o filme à lista de desejos');
            }
    } 
        
    static async showWishlist(req, res) {
      const userId = req.session.userid;

      const user = await User.findOne({
          where: {
              id: userId,
          },
          include: Film,
          plain: true,
      })

      // check if user exists
      if (!user) {
          res.redirect('/login')
      }

      const movies = await User.findOne({
        where: {
            id: userId,
        },
        raw: true,
    })

      res.render('films/wishlist', { movies})
  }
    

}
