const mongoose = require('mongoose')
const Joi = require('joi')
const uuid = require('uuid')
const productSchema = new mongoose.Schema({
    uuid:{
        type: String, default: uuid.v4
    },
    name: {type:String, required: true },
    price: {type:Number, required: true},
    productImage: {type: [String], required: true}
})

const Products = mongoose.model('Products', productSchema)
function validateProduct(product){
    console.log('Product :', product)
    const schema = {
       name:Joi.string().required(),
        price:Joi.number().required(),
        // productImage:Joi.string().required()
    }
    return Joi.validate(product, schema)
}

exports.Products = Products
exports.validate = validateProduct