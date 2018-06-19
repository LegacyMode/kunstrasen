const express = require('express')
const app = express()

const Match = require('./../schema/match')
const Team = require('./../schema/team')

app.get('/match', (req, res) => {
  Match.find({}).populate(['team1', 'team2']).exec((err, matches) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('match/index', { matches: matches })
  })
})

app.get('/match/create', (req, res) => {
  Team.find({}).exec((err, teams) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('match/create', { teams: teams })
  })
})

app.get('/match/:id', (req, res) => {
  Match.find({ '_id': req.params.id }).populate(['team1', 'team2']).exec((err, match) => {
    if (err) return res.status(500).send('Nope')
    return res.status(200).send(match)
  })
})

app.get('/match/edit/:id', (req, res) => {
  Match.find({ '_id': req.params.id }).populate(['team1', 'team2']).exec((err, match) => {
    if (err) return res.status(500).send('Nope')
    return res.render('match/edit', { match:match })
  })
})

app.patch('/match/:id', (req, res) => {
  console.log('test')
})

app.post('/match', (req, res) => {
  console.log(req)
  Match.create({
    team1: req.body.team1,
    team2: req.body.team2,
    roundIdentifier: req.body.roundIdentifier,
    location: req.body.location
  },
  (err, match) => {
    if (err) return res.status(500).send('Das Match konnte nicht gespeichert werden')
    console.log('Match added...')
    return res.status(200).send(match)
  })
})

module.exports = app
