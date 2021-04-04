const mongoose = require('mongoose')
// const imageLikeSchema = require('./imageLike')

const imageSchema = new mongoose.Schema({
  tag: {
    type: String
  },

  caption: {
    type: String
  },

  imageUrl: {
    type: String,
    required: true
  },

  // imageLikes: [imageLikeSchema],

  price: {
    type: Number
    // required: true
  },

  forSale: {
    type: Boolean
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Image', imageSchema)
