const mongoose = require('mongoose')
const Joi = require('joi')
const productSchema = new mongoose.Schema({
    name: {type:String, required: true },
    price: {type:Number, required: true},
    numberInStock: Number,
    productImage: {type: [String], required: true}
})

const Products = mongoose.model('Products', productSchema)
function validateProduct(product){
    const schema = {
        name:Joi.string().required(),
        price:Joi.number().required(),
        numberInStock: Joi.number().required()
      
        // productImage:Joi.string().required()
    }
    return Joi.validate(product, schema)
}

exports.Products = Products
exports.validate = validateProduct