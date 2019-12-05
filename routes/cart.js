const express = require('express');
const router = express.Router();
const Objectid = require('objectid');
const auth = require('../middleware/auth')
const cartController = require('../controllers/cart')

router.get('/:id', cartController.getOneCart)

router.get('/', auth, cartController.getAllCart)

router.post('/', auth, cartController.createCart)

router.put('/:id', auth ,cartController.updateCart)

router.delete('/:id', auth, cartController.deleteCart)

module.exports = router 