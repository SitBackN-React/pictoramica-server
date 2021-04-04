const express = require('express')

const Image = require('../models/image.js')

const s3Upload = require('../../lib/s3Upload')

// multer
const multer = require('multer')
const upload = multer({ dest: 'public/' })

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

const randomChars = num => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = '-'
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

router.post('/post-image', requireToken, upload.single('image'), (req, res, next) => {
  s3Upload(req.file, req.body.tag + randomChars(16))
    .then((data) => {
      return Image.create({
        tag: req.body.tag,
        caption: req.body.caption,
        imageUrl: data.Location,
        forSale: req.body.forSale,
        price: req.body.price,
        owner: req.user.id
      })
    })
    .then(image => res.status(201).json({ image: image.toObject() }))
    .catch(next)
})

// Extra?
router.get('/get-image', (req, res, next) => {
  Image.find()
    .populate('owner')
    .then(images => {
      return images.map(image => image.toObject())
    })
    .then(images => res.status(200).json({ images: images }))
    .catch(next)
})

module.exports = router
