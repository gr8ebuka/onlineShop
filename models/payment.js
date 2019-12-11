const mongoose = require('mongoose');
const Joi = require('joi');


const paySchema = new mongoose.Schema({
  checkOut: {
    type: mongoose.Schema.Types.ObjectId, ref: 'CheckOut'
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, ref: 'User'
  // },
  paid: {
    type: Boolean, default: false
  }
});

const Payment = mongoose.model('Payment', paySchema);

function validatePay(pay) {
  const schema = {
    checkOutId: Joi.objectId().required(),
    // userId: Joi.objectId().required(),
    paid: Joi.boolean()
  }
  return Joi.validate( pay, schema )
}

exports.Payment = Payment;
exports.validate = validatePay;