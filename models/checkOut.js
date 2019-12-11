const mongoose = require('mongoose')
const Joi = require('joi')
const ObjectId = require('objectid')
const uuid = require('uuid')

const checkOutSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
  },
  address: {
    street: { type: String, required: true  },
    no: {   type: String, required: true   },
    state: { type: String, required: true },
    city: { type: String, required: true  }
  }

  // product: {
  //   type: mongoose.Schema.Types.ObjectId, ref: 'Products'
  // },
})
const CheckOut = mongoose.model('CheckOut', checkOutSchema)
function validateCheckOut(checkOut) {
  const schema = {
    cartId: Joi.objectId().required(),
    address: Joi.object({
      street: Joi.string().required(),
      no: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
    }).required(),
  }
  return Joi.validate(checkOut, schema)
}

exports.CheckOut = CheckOut
exports.validate = validateCheckOut