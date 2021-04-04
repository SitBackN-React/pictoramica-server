const express = require('express')
const passport = require('passport')

const Blog = require('./../models/blog')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = customErrors.handle404

// const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// SHOW state of the like user
router.get('/blogs/:blogId/posts/:postId/postLikes/:postLikeId', requireToken, (req, res, next) => {
  req.body.post.owner = req.user.id
  const blogId = req.params.blogId
  const postId = req.params.postId
  const postLikeId = req.params.postLikeId

  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      let post = blog.posts.id(postId).postLikes.id(postLikeId)
      post = handle404(post)
      res.status(200).json({post})
    })
    .catch(next)
})
// CREATE postlike
router.post('/blogs/:blogId/posts/:postId/postLikes', requireToken, (req, res, next) => {
  req.body.postLike.owner = req.user.id
  const postLikeData = req.body.postLike
  const postId = req.params.postId
  const blogId = req.params.blogId
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      blog.posts.id(postId).postLikes.push(postLikeData)
      return blog.save()
    })
    .then(blog => {
      res.status(201).json({blog: blog})
    })
    .catch(next)
})

// UPDATE postLike
router.patch('/blogs/:blogId/posts/:postId/postLikes/:postLikeId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.postLike.owner

  const postLikeId = req.params.postLikeId
  const postLikeData = req.body.postLike
  const postId = req.params.postId
  const blogId = req.params.blogId

  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      blog.posts.id(postId).postLikes.id(postLikeId).set(postLikeData)
      return blog.save()
    })
    .then(blog => res.status(200).json({blog: blog}))
    .catch(next)
})

// DELETE postLike
router.delete('/blogs/:blogId/posts/:postId/postLikes/:postLikeId', requireToken, (req, res, next) => {
  const postId = req.params.postId
  const postLikeId = req.params.postLikeId
  const blogId = req.params.blogId
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      // requireOwnership(req, post)
      blog.posts.id(postId).postLikes.id(postLikeId).remove()
      return blog.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
