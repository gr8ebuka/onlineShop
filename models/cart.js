const mongoose = require('mongoose');
const Joi = require('joi');

const cartSchema = new mongoose.Schema({
      product:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Products'
    },
    name:String,
    quantity:{
        type: Number,  required: true
    }   
})

const Cart =  mongoose.model('Cart', cartSchema);
function validateOrder(order){
    const schema = {
        productId: Joi.objectId().required(),
        quantity: Joi.number().required()
    }
    return Joi.validate(order, schema)
}

exports.validate = validateOrder
exports.Cart = Cart;