const Team = require('./../schema/team')
const Match = require('./../schema/match')
const express = require('express')
//const helpers = require('')
const app = express()

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app
