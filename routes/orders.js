const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

const auth = require('../middleware/auth')

router.get('/' , orderController.getAllOrders );
router.get('/:id', orderController.getOneOrder);
router.post('/' , auth , orderController.createOrder);
router.put('/:id' ,  auth, orderController.updateOrder);
router.delete('/:id' , auth, orderController.deleteOrder);
module.exports = router 