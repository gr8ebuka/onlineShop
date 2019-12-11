const { validate, CheckOut } = require('../models/checkOut');
const { Products } = require('../models/products');
const { Cart } = require('../models/cart')
const Objectid = require('objectid');

exports.getOnecheckOut = async (req, res, next) => {

  const checkOut = await CheckOut.aggregate([
    {
      $match: { cart: Objectid(req.params.id) }
    },
    {
      $lookup: {
          from: "carts",
          localField: "cart",
          foreignField: "_id",
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
        name: "$product.name",
        price: "$product.price",
        productId: '$product._id',
        quantity: 1,
        totalSum: {
          $ceil: { $multiply: ["$product.price", "$cart.quantity"] },

        }

      }

    },
    // {
    //   $lookup: {
    //       from: "products",
    //       localField: "product",
    //       foreignField: "_id",
    //       as: "product"

    //   }
    // },
    //  {
    //   $project: {
    //     _id: 0, cart: 1,
    //     product:  "$product"
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
    },
    address: req.body.address,
  })
  checkOut.save()

  res.status(201).json({
    message: 'Handling a Post request on orders',
    Cart: {
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

exports.deleteOrder = async (req, res, next) => {
  const validId = Objectid.isValid(req.params.id)
  if (!validId) return res.status(400).json({
    message: 'Invalid order id'
  })
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) return res.status(400).send('Product ID does not exist')
  res.send(order)

}