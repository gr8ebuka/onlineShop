const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {type:String },
    price: Number
})

const Products = mongoose.model('Products', productSchema)

exports.Products = Products