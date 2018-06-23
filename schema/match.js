const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.ObjectId;
const shortid = require('shortid')
const Team = require('./team')

const MatchSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   default: shortid.generate
  // },
  timer: {
    type: Number,
    default: 0
  },
  running: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  },
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    require: true
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    require: true
  },
  team1Goals: {
    type: Number,
    default: 0
  },
  team2Goals: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    default: 'Platz 1'
  },
  roundIdentifier: {
    type: String,
    default: 'unbekannt'
  }
})

mongoose.model('Match', MatchSchema)
module.exports = mongoose.model('Match')
