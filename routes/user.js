const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const auth = require('../middleware/auth')

router.post('/signup',  userController.createUser);

router.post('/login' , userController.userLogin );    

router.delete('/:id', auth, userController.deleteUser)
router.get('/',  userController.getOneUser)

module.exports = router;