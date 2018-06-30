const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      session = require('express-session')

require('dotenv').config()

const db = require('./config/db')

const index = require('./routes/index')
const teams = require('./routes/team')
const matches = require('./routes/match')
const schiri = require('./routes/schiri')

const Team = require('./schema/team')
const Match = require('./schema/match')

const app = express()

const { PORT = 5100 } = process.env

const dev = true

app.use(session({
  secret: process.env.SESSION_TOKEN,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))


let users = {}
users[process.env.USER_NAME] = process.env.USER_PW

function auth(req, res, next) {
   if (((req.session) && users[req.session.user] && req.session.admin) || dev)
     return next();
   else
   res.redirect('/login');
 }

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  console.log('login request')
  if (!req.body.username || !req.body.password) {
    res.send('Login Failed')
  }
  else if ( users[req.body.username] && users[req.body.username] === req.body.password ) {
    console.log('login granted')
    req.session.user = req.body.username
    req.session.admin = true
    req.session.save()
    res.redirect('/')
  }
  else {
    console.log('wuuut')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.use(index)
   .use(schiri)
   .use(auth)
   .use(matches)
   .use(teams)
   .use((req, res) => res.status(404).send({ url: `${req.originalUrl} not found` }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
