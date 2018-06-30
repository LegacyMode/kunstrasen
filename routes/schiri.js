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

app.post('/schiri/:id/goals', (req, res) => {
  Match.findById(req.params.id, (err, match) => {
    if (err) return res.status(500).send('Error Code 2')
    console.log(req.body)
    if (req.body.operator == 'add') {
      if (req.body.team == 1) { match.team1Goals = match.team1Goals + 1 }
      if (req.body.team == 2) { match.team2Goals = match.team2Goals + 1 }
    }
    else if (req.body.operator == 'sub') {
      if (req.body.team == 1) { match.team1Goals = match.team1Goals - 1 }
      if (req.body.team == 2) { match.team2Goals = match.team2Goals - 1 }
    }
    match.save((err) => {
      if (err) return res.status(500).send('Error Code 3')
      return res.status(200).send({ team1Goals: match.team1Goals,
                                    team2Goals: match.team2Goals })
    })
  })
})

module.exports = app
