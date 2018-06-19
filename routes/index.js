const express = require('express')
const Teams  = require('./../schema/team')
const Matches = require('./../schema/match')

const app = express()

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/team', (req, res) => {
  Teams.find({}).exec((err, teams) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('teams/index', { teams: teams })
  })
})

app.get('/team/create', (req, res) => {
  res.render('teams/create')
})

app.get('match/create', (req, res) => {
  res.render('match/create')
})


app.post('/match', (req, res) => {
  Match.create({
    team1: req.body.team1,
    team2: req.body.team2
  },
  (err, match) => {
    if (err) return res.status(500).send('Das Match konnte nicht gespeichert werden')
    console.log('Match added...')
    return res.status(200).send(match)
  })
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
