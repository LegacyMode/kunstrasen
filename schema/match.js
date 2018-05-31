const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
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
    type: String,
    require: true
  },
  team2: {
    type: String,
    require: true
  },
  team1Goals: {
    type: Number,
    default: 0
  },
  team2Goals: {
    type: Number,
    default: 0
  }
})

mongoose.model('Match', MatchSchema)
module.exports = mongoose.model('Match')
