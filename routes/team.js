const express = require('express')
const app = express()
const Team = require('./../schema/team')
const Match = require('./../schema/match')


app.get('/team', (req, res) => {
  Team.find({}).populate('matches').exec((err, teams) => {
    if (err) return res.status(500).send('There was a problem finding the teams')
    return res.render('teams/index', { teams: teams })
  })
})

app.get('/team/create', (req, res) => {
  res.render('teams/create')
})

app.get('/team/:id/edit', async (req, res) => {
  Team.find({ '_id': req.params.id }).exec((err, team) => {
    if (err) return res.status(500).send('Nope')
    //console.log(teams)
    return res.render('teams/edit', { team: team[0]})
  })
})

app.get('/team/:id', (req, res) => {
  Team.find({ '_id': req.params.id }).populate('matches').exec((err, team) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(team)
  })
})

app.patch('/team/:id', (req, res) => {
  Team.findById(req.params.id, (err, team) => {
    if (err) return res.status(500).send('Error Code 2')
    team.name = req.body.name
    team.save((err) => {
      if (err) return res.status(500).send('Error Code 3')
      //return res.status(200).send(team)
      res.redirect('/team')
    })
  })
})

app.delete('/team/:id', (req, res) => {
  Team.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).send('Error Code 4')
    res.redirect('/team')
  })
})

app.post('/team', (req, res) => {
  Team.create({
    name: req.body.name,
    matches: []
  },
  (err, team) => {
    if (err) return res.status(500).send('Das Team konnte nicht gespeichert werden')
    console.log('Team added...')
    //return res.status(200).send(team)
    res.redirect('/team')
  })
})

module.exports = app
