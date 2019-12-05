const Objectid = require('objectid');
const {validate, Cart} = require('../models/cart');
const {Products} = require('../models/products');
const { User } = require('../models/users');

exports.getOneCart = async(req,res) => {
    
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid cart id'
     })
    
    const cart = await Cart.findById(req.params.id)
    if(!cart) return res.status(400).send('Id does not exist')

    res.send(cart)
}

exports.getAllCart =  async(req, res, next) => {
       
    const carts = await Cart.find()
    if(carts <= 0){
        res.status(400).json({
            message: 'Cart Empty'
        })
    } else {
        res.status(200).json({
            count:carts.length,
            Items: carts.map(carts => {
                return {
                      carts                  
                }
            })
        })
    }

}

exports.createCart =  async(req, res, next) => {
    const {error }  = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const product = await Products.findById(req.body.productId).populate('product', 'name price productImage')
    if(product === req.body.productId) res.status(400).send('Product already in cart')
   // const user = await User.findById(req.body.userId).populate('user','name email phone' )
   
            if(!product) return res.status(400).send('Invalid product ID');
            // if(!user) return res.status(400).send('Invalid user ID');

                let  cart = await new Cart({
                    product :{
                        _id: req.body.productId,
                         price: product.price,
                         image: product.productIamge
                    },
                    //user: {_id: req.body.userId},                    
                    quantity:req.body.quantity
                    })
            //console.log({product: product})
                cart.save()
                //console.log({product: product})

                res.status(201).json({
                    message: 'Handling a Post request on orders',          
                    Carts: {
                            _id:cart._id,
                            image: product.productIamge,
                            price: product.price,
                            product:cart.product,
                            quantity: cart.quantity,
                            // numberInStock: product.numberInStock,
                            request:{
                                type: 'GET',
                                url: 'http://localhost:3000/api/products/'+ cart._id                    
                        }
                    }
                    
            });
            
        
        }

        exports.updateCart =  async(req, res) => {
            const validId = Objectid.isValid(req.params.id)
            if(!validId) return res.status(400).json({
                message:'Invalid cart id'
             })
            
             const cart = await Cart.updateOne({_id: req.params.id} , {$inc: {quantity: 1, price: product.price }})
             if(!cart) return res.status(400).send('cart ID does not exist')
        
        res.send(cart)
        }

        exports.deleteCart = async(req, res) => {
            const validId = Objectid.isValid(req.params.id)
            if(!validId) return res.status(400).json({
                message:'Invalid cart id'
             })
            
             const cart = await Cart.findByIdAndDelete(req.params.id)
             if(!cart) return res.status(400).send('Id does not exist')
        
            res.send(cart)
        }