const express = require('express')
const passport = require('passport')
const router = express.Router()

const Blog = require('./../models/blog')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// CREATE new blog post info
router.post('/blogs/:blogId/posts', requireToken, (req, res, next) => {
  req.body.post.owner = req.user.id
  const postData = req.body.post
  const blogId = req.params.blogId

  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      blog.posts.push(postData)
      return blog.save()
    })
    .then(blog => res.status(201).json({blog: blog}))
    .catch(next)
})

// SHOW show one post
router.get('/blogs/:blogId/posts/:postId', requireToken, (req, res, next) => {
  const blogId = req.params.blogId
  const postId = req.params.postId
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      let post = blog.posts.id(postId)
      post = handle404(post)
      res.status(200).json({post: post})
    })
    .catch(next)
})

// UPDATE post info
router.patch('/blogs/:blogId/posts/:postId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.post.owner

  const postId = req.params.postId
  const postData = req.body.post
  const blogId = req.params.blogId

  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      requireOwnership(req, blog)
      blog.posts.id(postId).set(postData)
      return blog.save()
    })
    .then(blog => res.status(200).json({blog: blog}))
    .catch(next)
})

// DELETE single post
router.delete('/blogs/:blogId/posts/:postId', requireToken, (req, res, next) => {
  const blogId = req.params.blogId
  // const postData = req.body.post
  const postId = req.params.postId

  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      requireOwnership(req, blog)
      blog.posts.id(postId).remove()
      return blog.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
