const express = require('express')
const passport = require('passport')
const CartItem = require('./../models/cartItem')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = customErrors.handle404

const requireToken = passport.authenticate('bearer', { session: false })

const requireOwnership = customErrors.requireOwnership

const router = express.Router()

// GET cartItem
router.get('/cartItems', requireToken, (req, res, next) => {
  CartItem.find({'owner': req.user.id})
    .populate('cartItem')
    .then(cartItem => {
      return cartItem.map(cartItem => cartItem.toObject())
    })
    .then(cartItems => res.status(200).json({ cartItems: cartItems }))
    .catch(next)
})

// CREATE cartItem
router.post('/cartItems', requireToken, (req, res, next) => {
  req.body.cartItem.owner = req.user.id

  CartItem.create(req.body.cartItem)
    .then(cartItem => {
      res.status(201).json({ cartItem: cartItem.toObject() })
    })
    .catch(next)
})

// UPDATE cartItem
router.patch('/cartItems/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.cartItem.owner

  CartItem.findById(req.params.id)
    .then(handle404)
    .then(cartItem => {
      requireOwnership(req, cartItem)
      return cartItem.updateOne(req.body.cartItem)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE cartItem
router.delete('/cartItems/:id', requireToken, (req, res, next) => {
  CartItem.findById(req.params.id)
    .then(handle404)
    .then(cartItem => {
      requireOwnership(req, cartItem)
      cartItem.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
