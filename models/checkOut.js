const mongoose = require('mongoose')
const Joi = require('joi')
const ObjectId = require('objectid')
const uuid = require('uuid')

const orderSchema = new mongoose.Schema({
//    totalAmout: {
//     type:mongoose.Schema.Types.ObjectId, ref: 'Products'
// },
    cart:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Cart'
    },
    // quantity: {
    //     type: Number,
    //     required: true
    // }
})
const Order = mongoose.model('Order', orderSchema)
function validateOrder(order){
    const schema = {
        // productId: Joi.objectId().required(),
        cartId: Joi.objectId().required()
    }
    return Joi.validate(order, schema)
}

exports.Order = Order
exports.validate = validateOrder