const express = require('express');
const Objectid = require('objectid')
const {Products} = require('../Schemas/products')
const router = express.Router();

router.get('/', async (req, res, next)=>{
    const product = await Products.find().select('name price _id')
      
    if(product <= 0) {
        res.status(404).json({
            message: 'No entry found'
        })
    } else{
  res.status(200).json({
      message: 'Handling Get request to /products',
           
      
         count: product.length,
                Product: product.map( product => {
                return{
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    request:{
                         type: 'GET',
                         url: 'http://localhost:3000/api/products/'+ product._id
                    }
                }
        })
      
      
  }) ;
}
});

router.get('/:id', async (req, res, next)=>{
   const validId = Objectid.isValid(req.params.id)
   if(!validId) return res.status(400).json({
       message:'Invalid product id'
    })
   
        const product = await Products.findById( req.params.id);
        if(!product) return res.status(400).send('Product ID does not exist')
        res.send(product)
  
})

router.patch('/:id',  async(req, res, next)=>{ 
   
    let product = await Products.update( req.params.id ,     { 
            name:req.body.name,     
            price: req.body.price   ,
         },       
         
          {new:true})
            res.send(product)
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
        message:'New Product added',
        product:{
            _id:products._id,
            name:products.name,
           price: products.price,
            request:{
                type: 'GET',
                url: 'http://localhost:3000/api/products/'+ products._id

            }
        }
    })
    
       
});

module.exports = router