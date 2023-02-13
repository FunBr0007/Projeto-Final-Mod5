const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//Models
const User = require('./models/User')
const Film = require('./models/Film')
const Wishlist = require('./models/Wishlist')

// Routes
const authRoutes = require('./routes/authRoutes')
const filmRoutes = require('./routes/filmsRoutes')


//Controller
const FilmsController = require('./controllers/FilmsController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber respostas do body
app.use(express.urlencoded({
    extended: true,
}))


app.use(express.json())

//session middleware
app.use(
    session({
        name: "session",
        secret: "mySecret8160",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

//public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

//Routes
app.use('/', authRoutes)
app.use('/', filmRoutes)
app.use('/sobre', authRoutes)
app.use('/sobre:id', authRoutes)
app.use('/add', authRoutes)
app.use('/add/:id', authRoutes)

app.get('/', FilmsController.showHome)
app.get('/sobre', FilmsController.showOneFilm)
app.get('/wishlist', authRoutes, FilmsController.showWishlist)


conn
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))