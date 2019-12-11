const express = require('express');
const router = express.Router();
const checkOutController = require('../controllers/checkOuts');

const auth = require('../middleware/auth')

// router.get('/' , checkOutController.getCheckOut );
router.get('/:id', checkOutController.getOnecheckOut);
router.post('/' , auth , checkOutController.createCheckOut);
// router.put('/:id' ,  auth, checkOutController.updateOrder);
router.delete('/:id' , auth, checkOutController.deleteOrder);
module.exports = router 