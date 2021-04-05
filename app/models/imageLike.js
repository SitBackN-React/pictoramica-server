const mongoose = require('mongoose')

const imageLikeSchema = new mongoose.Schema({
  liked: {
    type: Boolean
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = imageLikeSchema
