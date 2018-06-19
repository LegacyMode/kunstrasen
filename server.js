const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('dotenv').config()

const db = require('./config/db')

const index = require('./routes/index')
const teams = require('./routes/team')
const matches = require('./routes/match')

const Team = require('./schema/team')
const Match = require('./schema/match')

const app = express()

const { PORT = 5000 } = process.env

app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))
   .use(methodOverride())

app.use(index)
   .use(matches)
   .use(teams)
   .use((req, res) => res.status(404).send({ url: `${req.originalUrl} not found` }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
