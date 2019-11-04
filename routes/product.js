const express = require('express');
const Objectid = require('objectid')
const {Products} = require('../Schemas/products')
const router = express.Router();

router.get('/', async (req, res, next)=>{
    const product = await Products.find()
  res.status(200).json({
      message: 'Handling Get request to /products',
      products:product
  }) ;
});

router.get('/:id', async (req, res, next)=>{
   const validId = Objectid.isValid(req.params.id)
   if(!validId) return res.status(400).json({
       message:'Invalid product id'
    })
   
    // if(product === req.params.id) {
    //     res.status(200).json({
    //         message: 'You discovered the special ID',
    //         product: product
    //     })
        
    // } else {
    //     res.status(200).json({
    //         message: 'There is no item for this ID'
    //     })
    const product = await Products.findById( req.params.id);
    if(!product) return res.status(400).send('Product ID does not exist')
    res.send(product)
  //  console.log('Produc ts', product)
})

router.patch('/:id',  (req, res, next)=>{
    res.status(200).json({
        message: 'Updated product'
    });
})

router.delete('/:id', async (req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid product id'
     })
     const product = await Products.findByIdAndDelete(req.params.id)
     if(!product) return res.status(400).send('Product ID does not exist')
     res.send(product)
    // res.status(200).json({
    //     message: 'Deleted product'
    // });
})
router.post('/',  async(req, res, next) => {
    const products = await new Products({
        name:req.body.name,
        price:req.body.price

        
    })
    products.save()
    res.status(201).json({
        message:'Handling post request',
        products:products
    })
    
    //res.send(products)
    //   const product = {
    //       name:req.body.name,
    //       price:req.body.price
    //   }
    // res.status(201).json({
    //     message: 'Handling a Post request',
    //     product: products,
      
    // });
    console.log(products)
   
});

module.exports = router