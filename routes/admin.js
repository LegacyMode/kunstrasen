const Team = require('./../schema/team')
const Match = require('./../schema/match')
const express = require('express')
//const helpers = require('')
const app = express()

app.get('/admin', (req, res) => {
  return res.render('admin')
})

module.exports = app
