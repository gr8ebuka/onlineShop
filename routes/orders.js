const express = require('express');
const router = express.Router();

router.get('/' , async(req, res, next)=>{
    res.status(200).json({
        message: 'Handling a Get request on orders'
    });
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
    const orders = {
        productId:req.body.productId,
        quantityId:req.body.quantityId
    }
    res.status(201).json({
        message: 'Handling a Post request on orders',
        orders:orders
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