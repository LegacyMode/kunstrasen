const express = require('express')
const Teams  = require('./../schema/team')

const app = express()

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/team', (req, res) => {
  Teams.find({}).exec((err, teams) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.status(200).send(teams);
  })
})

app.get('/team/create', (req, res) => {
  res.render('teams/create')
})

app.post('/team', (req, res) => {
  Teams.create({
    name: req.body.name
  },
  (err, team) => {
    if (err) return res.status(500).send('Das Team konnte nicht gespeichert werden')
    console.log('Team added...')
    return res.status(200).send(team)
  })
})

module.exports = app
