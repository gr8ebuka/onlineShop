const express = require('express');
const router = express.Router();
const {Products} = require('../models/products');
const {validate, Cart} = require('../models/cart')

router.get('/', async(req, res, next) => {
    const carts = await Cart.find().select('name price quantity')
    if(carts <= 0){
        res.status(400).json({
            message: 'Cart Empty'
        })
    } else {
        res.status(200).json({
            count:carts.length,
            Cart: carts.map(carts => {
                return {
                                        
                }
            })
        })
    }

})

router.post('/', async(req, res, next) => {
    const {error }  = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const product = await Products.findById(req.body.productId).populate('product', 'name price productImage')
   
            if(!product) return res.status(400).send('Invalid product ID')
                    let  cart = await new Cart({
                    product :{_id: req.body.productId},                    
                    quantity:req.body.quantity
                    })
                    console.log(cart)
                cart.save()
                res.status(201).json({
                    message: 'Handling a Post request on orders',          
                    Carts: {
                            _id:cart._id,
                            image:[product.productIamge],
                            product:cart.product,
                            quantity: cart.quantity,
                            numberInStock: product.numberInStock,
                            request:{
                                type: 'GET',
                                url: 'http://localhost:3000/api/products/'+ cart._id                    
                        }
                    }
                    
            });
        })
module.exports = router 