const mongoose = require('mongoose')
const Joi = require('joi')
const ObjectId = require('objectid')
const uuid = require('uuid')

const checkOutSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
  },
  })
const CheckOut = mongoose.model('CheckOut', checkOutSchema)
function validateCheckOut(checkOut) {
  const schema = {
    
    cartId: Joi.objectId().required()
  }
  return Joi.validate(checkOut, schema)
}

exports.CheckOut = CheckOut
exports.validate = validateCheckOut