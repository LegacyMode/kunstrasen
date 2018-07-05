const Team = require('./../schema/team')
const Match = require('./../schema/match')
const express = require('express')
//const helpers = require('')
const app = express()

app.get('/', (req, res) => {
    Match.find({}).populate(['team1', 'team2']).sort({finished: '1',running: '-1', startingTime: '1'}).exec((err, matches) => {
    if (err) return res.status(500).send('Error Code 2')
    return res.render('index', { matches: matches })
  })
})

module.exports = app
