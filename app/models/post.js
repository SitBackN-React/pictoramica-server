const mongoose = require('mongoose')
// const commentSchema = require('./comment')
// const postLikeSchema = require('./postLike')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
  // comments: [commentSchema],
  // postLikes: [postLikeSchema]

}, {
  timestamps: true
})

module.exports = postSchema
