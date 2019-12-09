const {validate, Products} = require('../models/products')
const Objectid = require('objectid');

exports.getAllProducts =async (req, res, next)=>{
    const product = await Products.find().select('name price _id productImage')
      
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
                        productImage:[product.productImage],
                        _id: product._id,
                        request:{
                                type: 'GET',
                                url: 'http://localhost:3000/api/products/'+ product._id
                        }
                    }
                })
                       
        }) ;
    }
}

exports.getOneProduct = async (req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid product id'
     })
    
         const product = await Products.findById( req.params.id);
         if(!product) return res.status(400).send('Product ID does not exist')
         res.send(product)
   
 }

//  exports.getManyProductsWithIds = async (req, res, next)=>{
//     // const validId = Objectid.isValid(req.params.ids)
//     // if(!validId) return res.status(400).json({
//     //     message:'Invalid product id'
//     //  })
    
//          const products = await Product.find({ _id: { $in: req.params.ids } });
//          if(!products.length) return res.status(400).send('Product ID does not exist')
//          res.send(products)
   
//  }

 exports.updateProduct = async(req, res, next)=>{ 
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid product id'
     })
   
    let product = await Products.findByIdAndUpdate( req.params.id ,     { 
            name:req.body.name,     
            price: req.body.price,
            productImage: req.files.map(({path}) => path)
            //productImage:req.files.map(({path}) => path)

         },       
         
          {new:true})
          if(!product) return res.status(400).send('Product ID does not exist')

            res.send(product)
}

exports.deleteProduct = async (req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'Invalid product id'
     })
     const product = await Products.findByIdAndRemove(req.params.id)
     if(!product) return res.status(400).send('Product ID does not exist')
     res.send(product)
  
}
exports.createProduct = async(req, res, next) => {
    try {
         const {error} = validate(req.body)
         if(error) return res.status(400).send(error.details[0].message)
          
         const product = await new Products({
             name:req.body.name,
             price:req.body.price,
             numberInStock: req.body.numberInStock,
             productImage: req.file.path
         })

         console.log({path: req.file.path})
     
         product.save()
         res.status(201).json({
             message:'New Product added',
             product:{
                _id:product._id,
                numberInStock:product.numberInStock,
                name:product.name,
                price: product.price,
                productImage:product.productImage, 
                 request:{
                     type: 'GET',
                     url: 'http://localhost:3000/api/products/'+ product._id
     
                 }
            }
         })
         
    } catch (error)
     {
        throw error        
    }
   
}