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
const admin = require('./routes/admin')

const Team = require('./schema/team')
const Match = require('./schema/match')

const app = express()

const { PORT = 8080 } = process.env

const dev = false

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
users['schiri'] = process.env.SCHIRI_PW

function auth(req, res, next) {
   if (((req.session) && users[req.session.user] && req.session.admin) || dev)
     return next();
   else
     req.session.redirectTo = req.originalUrl
     res.redirect('/login');
 }

app.get('/login', (req, res) => {
  let schiri = false;
  if (req.session.redirectTo && req.session.redirectTo.indexOf('schiri/') != -1) {
    schiri = true;
  }
  res.render('login', {schiri: schiri})
})

app.post('/login', (req, res) => {
  console.log('login request')
  if (!req.body.username || !req.body.password) {
    res.send('Login Failed')
  }
  else if (users[req.body.username] && users[req.body.username] === req.body.password ) {
    console.log('login granted')
    let redirectTo
    if (req.body.username == 'schiri') {
      redirectTo = req.session.redirectTo ? req.session.redirectTo : '/'
    } else {
      redirectTo = req.session.redirectTo ? req.session.redirectTo : '/admin'
    }
    delete req.session.redirectTo
    req.session.user = req.body.username
    req.session.admin = true
    req.session.save()
    res.redirect(redirectTo)
  }
  else {
    console.log(users[req.body.username])
    console.log(req.body.password)
    console.log('wuuut')
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.use(index)
   .use(auth)
   .use(schiri)
   .use(admin)
   .use(matches)
   .use(teams)
   .use((req, res) => res.status(404).send({ url: `${req.originalUrl} not found` }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
