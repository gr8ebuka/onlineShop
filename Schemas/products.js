const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
})

const Products = mongoose.model('Products', productSchema)

exports.Products = Products