const express = require('express');
const Objectid = require('objectid')
const router = express.Router();
const multer = require ('multer');
const auth = require('../middleware/auth')
const productController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null,  Date.now()  + file.originalname )
      //  cb(null, new Date().toISOString()+ '-' + file.originalname ); //new Date().toISOString() + file.originalname);
    }
});
const  upload = multer({ storage: storage}) ;
 
router.get('/',  productController.getAllProducts );

router.get('/:id', productController.getOneProduct);

//router.get('/:ids', productController.getManyProductsWithIds);

router.put('/:id', auth, upload.array('productImage', 3), productController.updateProduct)

router.delete('/:id', auth, productController.deleteProduct)
router.post('/', auth, upload.array('productImage', 3), productController.createProduct);

module.exports = router