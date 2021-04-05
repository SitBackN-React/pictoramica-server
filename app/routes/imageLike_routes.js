const express = require('express')
const passport = require('passport')
const Image = require('./../models/image')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = customErrors.handle404

// const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE imagelike
router.post('/images/:imageId/imageLikes', requireToken, (req, res, next) => {
  req.body.imageLike.owner = req.user.id
  const imageLikeData = req.body.imageLike
  const imageId = req.params.imageId

  Image.findById(imageId)
    .then(handle404)
    .then(image => {
      image.imageLikes.push(imageLikeData)
      return image.save()
    })
    .then(image => {
      res.status(201).json({image: image})
    })
    .catch(next)
})

// UPDATE imageLike
router.patch('/images/:imageId/imageLikes/:imageLikeId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.imageLike.owner

  const imageLikeId = req.params.imageLikeId
  const imageLikeData = req.body.imageLike
  const imageId = req.params.imageId

  Image.findById(imageId)
    .then(handle404)
    .then(image => {
      image.imageLikes.id(imageLikeId).set(imageLikeData)
      return image.save()
    })
    .then(image => res.status(200).json({image: image}))
    .catch(next)
})

// DELETE imageLike
router.delete('/images/:imageId/imageLikes/:imageLikeId', requireToken, (req, res, next) => {
  const imageId = req.params.imageId
  const imageLikeId = req.params.imageLikeId

  Image.findById(imageId)
    .then(handle404)
    .then(image => {
      // requireOwnership(req, image)
      image.imageLikes.id(imageLikeId).remove()
      return image.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
