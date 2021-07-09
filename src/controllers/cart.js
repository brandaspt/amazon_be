import Cart from "../models/cart.js"
import CreateError from "http-errors"

export const getCart = async (req, res, next) => {
  try {
    const activeCart = await Cart.findOne({ status: "active" })
    if (activeCart) {
      res.send(activeCart)
    } else {
      const newCart = await new Cart().save()
      res.send(newCart)
    }
  } catch (error) {
    next(error)
  }
}

export const getCartHistory = async (req, res, next) => {
  try {
    const cartHistory = await Cart.find({ status: { $ne: "active" } })
    res.send(cartHistory)
  } catch (error) {
    next(error)
  }
}

export const updateCartProducts = async (req, res, next) => {
  try {
    // const prodId = req.params.prodId
    // const product = await Product.findById(prodId)
    console.log("hello")
    req.body.quantity = 5
    const product = { _id: "hello" }
    if (product) {
      const newProduct = {
        product: { ...product.toObject() },
        quantity: req.body.quantity,
      }
      const productAlreadyInCart = await Cart.findOne({
        status: "active",
        "products.product._id": product._id,
      })
      if (productAlreadyInCart) {
        await Cart.findOneAndUpdate(
          {
            status: "active",
            "products.product._id": product._id,
          },
          {
            $set: {
              "products.product.$.quantity": req.body.quantity,
            },
          }
        )
      } else {
        await Cart.findOneAndUpdate(
          { status: "active" },
          { $push: { products: newProduct } }
        )
      }
    } else {
      next(CreateError(404, "Product not found"))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateCartStatus = async (req, res, next) => {
  try {
    const oldCart = await Cart.findOneAndUpdate(
      { status: "active" },
      {
        $set: {
          status: req.body.status,
        },
      }
    )
    if (oldCart) {
      await new Cart().save()
      res.send(oldCart)
    } else {
      next(CreateError(400, "Error Occured"))
    }
  } catch (error) {
    next(error)
  }
}
