const express = require('express');
const router = express.Router();
const {validate, Order} = require('../Schemas/order')
//const product = require('../routes/product')
//const {Products} = require('../Schemas/products')

router.get('/' , async(req, res, next)=>{
    const orders = await Order.find().select('productId quantity')
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
                productId: orders.productId,
                quantity: orders.quantity,
                response: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/orders/'+orders._id
                }
            }
        })
    });
}
});

router.get('/:id', async(req, res, next) => {
    const ordersId = req.params.id;
    if(ordersId === 'special'){
        res.status(200).json({
            message: ' Your order is ver special',
            ordersId: ordersId
        });
    } else {
        res.status(400).send('Wrond order Id');
    }
});

router.post('/' , async(req, res, next)=>{
    const {error }  = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

   // const product = await Products.findById(req.body.productId)
   // if(!product) return res.status(400).send('Invalid product ID')
        let  order = await new Order({
          //  product :{_id: product._id, name: product.name, price: product.price},
          product: req.body.productId,  
          quantity:req.body.quantity
        })

    
        console.log(order)
     order.save()
     //if(product._id) return res.status(400).send('Order already exist')

    res.status(201).json({
            message: 'Handling a Post request on orders',
            orders:order
    });
});
router.patch('/' , async(req, res, next)=>{
    res.status(200).json({
        message: 'Orders Updated' 
    });
});
router.delete('/' , async(req, res, next)=>{
    res.status(200).json({
        message: 'orders deleted'
    });
});
module.exports = router