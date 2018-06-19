const express = require('express')
const app = express()

const Team = require('./../schema/team')

app.get('/team', (req, res) => {
  Team.find({}).exec((err, teams) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('teams/index', { teams: teams })
  })
})

app.get('/team/create', (req, res) => {
  res.render('teams/create')
})
app.post('/team', (req, res) => {
  Team.create({
    name: req.body.name
  },
  (err, team) => {
    if (err) return res.status(500).send('Das Team konnte nicht gespeichert werden')
    console.log('Team added...')
    return res.status(200).send(team)
  })
})

module.exports = app
