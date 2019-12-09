const { validate, CheckOut } = require('../models/checkOut');
const { Products } = require('../models/products');
const { Cart } = require('../models/cart')
const Objectid = require('objectid');



exports.getCheckOut = async (req, res, next) => {
  // const checkOuts = await CheckOut.find()
  //   .select('product')
  //   // .populate('product', 'name')
  //   .populate('cart', 'product quantity')
  // console.log(checkOuts)
  // if (checkOuts <= 0) {
  //   res.status(404).json({
  //     message: 'No entry found'
  //   })
  // } else {
  //   res.status(200).json({
  //     message: 'Handling a Get request on checkOuts',
  //     count: checkOuts.lenght,
  //     checkOuts: checkOuts.map(checkOuts => {
  //       return {
  //         // uuid:checkOuts.uuid,
  //         _id: checkOuts._id,
  //         cart: checkOuts.cart,
  //         //quantity: checkOuts.cart.quantity,
  //         response: {
  //           type: 'GET',
  //           url: 'http://localhost:3000/api/checkOuts/' + checkOuts._id
  //         }
  //       }
  //     })
  //   });
  // }

  const checkOut = await CheckOut.aggregate([
    {
      $match: {
        _id: "$cart._id"
      }
    }
  ])
  res.send(checkOut)
}

exports.getOnecheckOut = async (req, res, next) => {
  // const order = await Order.findById( req.params.id).populate('products')
  //  if(order) 
  //      {
  //          res.status(200).json({
  //              message: ' Your order is very special',
  //              Orders : order
  //          });
  //      } else {
  //          res.status(400).send('Wrond order Id');
  //      }

  const checkOut = await CheckOut.aggregate([
    {
      $match: { cart: Objectid(req.params.id)}
    },
   
    // {
    //   $lookup: {
    //     from: "carts",
    //     localField: "cart",
    //     foreignField: "_id",
    //     as: "cart"

    //   }
    //  },
    // {
    //   $unwind: "$cart"
    // },
    // {
    //   $lookup: {
    //       from: "products",
    //       localField: "product",
    //       foreignField: "_id",
    //       as: "product"

    //   }
    // },
    // {
    //   $project: {
    //     _id: 0, cart: 1,
    //     product:  "$cart.product.name"
    //   }
    // }
  ])
  console.log({ checkOut })
  res.send(checkOut)


}

exports.createCheckOut = async (req, res, next) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const cart = await Cart.findById(req.body.cartId).populate('cart')
  console.log(cart)
  if (!cart) return res.status(400).send('Invalid cart Id')

  let checkOut = await new CheckOut({
    cart: {
      _id: req.body.cartId,
      quantity: cart.quantity
    }

  })
  checkOut.save()

  res.status(201).json({
    message: 'Handling a Post request on orders',
    Che: {
      _id: checkOut._id,
      cart: checkOut.cart,
      quantity: cart.quantity,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/api/products/' + checkOut._id
      }
    }
  });
}

// exports.updateCheckOut = async (req, res, next) => {
//   const { error } = validate(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

//   const product = await Products.findById(req.body.productId)
//   if (!product) return res.status(400).send('Invalid product ID')
//   console.log('Pro: v', product)

//   const order = await Order.findByIdAndUpdate(req.params.id, {
//     product: { _id: product._id },
//     quantity: req.body.quantity
//   }, { new: true })
//   res.send(order)
//   console.log(order)
// }

// exports.deleteOrder = async (req, res, next) => {
//   const validId = Objectid.isValid(req.params.id)
//   if (!validId) return res.status(400).json({
//     message: 'Invalid order id'
//   })
//   const order = await Order.findByIdAndDelete(req.params.id)
//   if (!order) return res.status(400).send('Product ID does not exist')
//   res.send(order)

// }