const express = require('express')
const app = express()

const Team = require('./../schema/team')
const Match = require('./../schema/match')

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

app.get('/match/:id/edit', async (req, res) => {
  const teams = await Team.find({}).exec();
  Match.find({ '_id': req.params.id }).populate(['team1', 'team2']).exec((err, match) => {
    if (err) return res.status(500).send('Nope')
    return res.render('match/edit', { match: match[0], teams: teams})
  })
})

app.get('/match/:id', (req, res) => {
  Match.find({ '_id': req.params.id }).populate(['team1', 'team2']).exec((err, match) => {
    if (err) return res.status(500).send('Nope')
    return res.status(200).send(match)
  })
})

app.patch('/match/:id', (req, res) => {
  Match.findById(req.params.id, (err, match) => {
    if (err) return res.status(500).send('Error Code 2')
    match.team1 = req.body.team1
    match.team2 = req.body.team2
    match.roundIdentifier = req.body.roundIdentifier
    match.location = req.body.location
    let date = new Date()
    const time = req.body.startingTime.split(':')
    date.setHours(time[0], time[1], 0)
    console.log(date)
    match.startingTime = date
    match.save((err) => {
      if (err) return res.status(500).send('Error Code 3')
      res.redirect('/match')
    })
  })
})

app.delete('/match/:id', (req, res) => {
  Match.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).send('Error Code 4')
    res.redirect('/matches')
  })
})

app.post('/match', (req, res) => {
  let date = new Date()
  const time = req.body.startingTime.split(':')
  date.setHours(time[0], time[1], 0)
  console.log(date)
  Match.create({
    team1: req.body.team1,
    team2: req.body.team2,
    roundIdentifier: req.body.roundIdentifier,
    location: req.body.location,
    startingTime: date
  },
  (err, match) => {
    if (err) return res.status(500).send('Das Match konnte nicht gespeichert werden')
    Team.findById(match.team1, (err, team) => {
      if (err) return res.status(500).send('Das Match konnte nicht gespeichert werden (Code: 2)')
      team.matches.push(match.id)
      team.save((err) => { if (err) return res.status(500).send('(Code: 3)') })
    })
    Team.findById(match.team2, (err, team) => {
      if (err) return res.status(500).send('Das Match konnte nicht gespeichert werden (Code: 2)')
      team.matches.push(match.id)
      team.save((err) => { if (err) return res.status(500).send('(Code: 3)') })
    })
    res.redirect('/match')
  })
})

module.exports = app
