const {validate, Order} = require('../models/checkOut');
const {Products} = require('../models/products');
const {Cart} = require('../models/cart')
const Objectid = require('objectid');



exports.getAllOrders =  async(req, res, next)=>{
        const orders = await Order.find()
            .select('product')
            // .populate('product', 'name')
            .populate('cart', 'product quantity')
        console.log(orders)
        if(orders <= 0) {
        res.status(404).json({
                message: 'No entry found'
            })
        } else{
        res.status(200).json({
            message: 'Handling a Get request on orders',
            count: orders.lenght,
            Orders: orders.map( orders => {
                return {
                   // uuid:orders.uuid,
                    _id:orders._id,
                    cart: orders.cart,
                    //quantity: orders.cart.quantity,
                    response: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/orders/'+orders._id
                    }
                }
            })
        });
    }
}

exports.getOneOrder = async(req, res, next) => {
    // const order = await Order.findById( req.params.id).populate('products')
    //  if(order) 
    //      {
    //          res.status(200).json({
    //              message: ' Your order is very special',
    //              Orders : order
    //          });
    //      } else {
    //          res.status(400).send('Wrond order Id');
    //      }

    const order = await Order.aggregate([
        {$match : { _id : req.params.id }},
        { $group: { _id: "cartId$" , total: {$sum: "${product.price}"}}}
    ])
    res.send(order)
 }

 exports.createOrder = async(req, res, next)=>{
        const {error }  = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

    // const product = await Products.findById(req.body.productId).populate('product')
    // console.log(product)
    //         if(!product) return res.status(400).send('Invalid product ID')
    const cart = await Cart.findById(req.body.cartId).populate('cart', 'product')
    console.log(cart)
    if(!cart) return res.status(400).send('Invalid cart Id')

        let  order = await new Order({
                    cart :{
                        _id: req.body.cartId,
                        quantity:cart.quantity
                    }

        })                  
                order.save()

    res.status(201).json({
            message: 'Handling a Post request on orders',          
            Orders: {
                    _id:order._id,
                    cart:order.cart,
                    quantity:cart.quantity,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/api/products/'+ order._id                    
                    }
            }
    });
}

exports.updateOrder = async(req, res, next)=>{
    const {error} = validate(req.body)
         if(error) return res.status(400).send(error.details[0].message)

    const product = await Products.findById(req.body.productId)
        if(!product) return res.status(400).send('Invalid product ID')
        console.log('Pro: v', product)

    const order = await Order.findByIdAndUpdate(req.params.id, {  product :{_id: product._id},
       quantity:req.body.quantity}, {new: true})    
        res.send(order)
        console.log(order)
}

exports.deleteOrder = async(req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid order id'
    })
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order) return res.status(400).send('Product ID does not exist')
    res.send(order)

}