const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  item: {
    type: []
  },

  price: {
    type: Number
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('CartItem', cartItemSchema)
