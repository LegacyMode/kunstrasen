const mongoose = require('mongoose')

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
  }
})

mongoose.model('Team', TeamSchema)
module.exports = mongoose.model('Team')
