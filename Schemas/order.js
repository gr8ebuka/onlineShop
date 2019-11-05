const mongoose = require('mongoose')
const Joi = require('joi')


const orderSchema = new mongoose.Schema({
    product :{ type: mongoose.Schema.Types.ObjectId, ref:'Products', required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
const Order = mongoose.model('Order', orderSchema)
function validateOrder(order){
    const schema = {
        productId: Joi.objectId().required(),
        quantity: Joi.number().required()
    }
    return Joi.validate(order, schema)
}

exports.Order = Order
exports.validate = validateOrder