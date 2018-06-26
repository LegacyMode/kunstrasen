const express = require('express')
const app = express()
const Team = require('./../schema/team')
const Match = require('./../schema/match')


app.get('/schiri/:id', (req, res) => {
  Match.find({ _id: req.params.id }).populate(['team1', 'team2']).exec((err, match) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('schiri/index', { match: match[0] })
  })
})

app.post('/schiri/:id/team1', (req, res) => {
  //Match.findById({ _id: req.params.id })
})

module.exports = app
