const {validate, Order} = require('../models/order');
const {Products} = require('../models/products');
const Objectid = require('objectid');



exports.getAllOrders =  async(req, res, next)=>{
        const orders = await Order.find().select('product quantity').populate('product', 'name')
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
                    uuid:orders.uuid,
                    _id:orders._id,
                    product: orders.product,
                    quantity: orders.quantity,
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
    const order = await Order.findById( req.params.id).populate('products')
     if(order) 
         {
             res.status(200).json({
                 message: ' Your order is ver special',
                 Orders : order
             });
         } else {
             res.status(400).send('Wrond order Id');
         }
 }

 exports.createOrder = async(req, res, next)=>{
        const {error }  = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

    const product = await Products.findById(req.body.productId).populate('product')
            if(!product) return res.status(400).send('Invalid product ID')
                    let  order = await new Order({
                    product :{_id: req.body.productId},
                    quantity:req.body.quantity
                    })
                    console.log(order)
                order.save()

    res.status(201).json({
            message: 'Handling a Post request on orders',          
            Orders: {
                    _id:order._id,
                    product:order.product,
                    quantity:order.quantity,
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