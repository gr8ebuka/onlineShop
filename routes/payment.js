const express = require('express');
const router = express.Router();
const { validate, Payment } = require('../models/payment'); 
const { CheckOut} = require('../models/checkOut')

router.post('/' , async( req, res) => {
  const {error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // const checkOut = await CheckOut.findById(req.params.checkOutId)
  // if(!checkOut) return res.status(400).send('Document not found')
  
  const payment = await new Payment({
    checkOut: {
      _id: req.body.checkOutId,
     },
    //  user: {
    //   _id: req.body.userId,
    //  },
                
  paid: req.body.paid
})
payment.save()

res.send(payment)

});

router.get('/:id', async( req, res, next) => {
  const payment = await Payment.aggregate([
    {
      $lookup: {
        from: "checkouts",
        localField: "checkOut",
        foreignField: "_id",
        as: "checkOut"

      }
    },
    {
      $unwind: "$checkOut"
   },
   {
    $lookup: {
      from: "carts",
      localField: "cart",
      foreignField: "checkOut.cart",
      as: "cart"
    }
  },
  {
    $unwind: "$cart"
 },
 {
  $lookup: {
    from: "products",
    localField: "product",
    foreignField: "cart.product",
    as: "product"
  }
},
{
  $unwind: "$product"
},
{
  $project: {
    _id: 0,
    fullAddress: { $concat: 
      ["$checkOut.address.no", ", ",
      "$checkOut.address.street", " ",
      "$checkOut.address.city", " ", 
      "$checkOut.address.state",]},
    name: "$product.name",
    price: "$product.price",
    productId: '$product._id',
    quantity: 1,
    totalSum: {
      $ceil: { $multiply: ["$product.price", "$cart.quantity"] },

    }
  }
}

  ])
res.send(payment)

})
module.exports = router;
