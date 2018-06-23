const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.ObjectId;
const Match = require('./match')

const TeamSchema = new mongoose.Schema({
  name : {
    type: String, required: true, trim: true
  },
  goals : {
    type: Number,
    default: 0
  },
  goalsAgainst : {
    type: Number,
    default: 0
  },
  matches : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }],
})

mongoose.model('Team', TeamSchema)
module.exports = mongoose.model('Team')
