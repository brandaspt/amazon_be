import Cart from "../models/cart.js"
import CreateError from "http-errors"
import Product from "../models/products.js"

export const getCart = async (req, res, next) => {
  try {
    const activeCart = await Cart.findOne({ status: "active" }).populate(
      "products.product"
    )
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
    const cartHistory = await Cart.find({ status: { $ne: "active" } }).populate(
      "products.product"
    )
    res.send(cartHistory)
  } catch (error) {
    next(error)
  }
}

export const updateCartProducts = async (req, res, next) => {
  try {
    const prodId = req.params.prodId
    const product = await Product.findById(prodId)
    if (product) {
      const newProduct = {
        product: product._id,
        quantity: req.body.quantity,
      }
      const productAlreadyInCart = await Cart.findOne({
        status: "active",
        "products.product": product._id,
      })
      if (productAlreadyInCart) {
        if (req.body.quantity === 0) {
          const deleted = await Cart.findOneAndDelete({
            status: "active",
            "products.product": product._id,
          })
          res.send(deleted)
        } else {
          console.log("ok")
          const modifiedCart = await Cart.findOneAndUpdate(
            {
              status: "active",
              "products.product": product._id,
            },
            {
              $set: {
                "products.$.quantity": req.body.quantity,
              },
            },
            { new: true }
          )
          res.send(modifiedCart)
        }
      } else {
        const newCart = await Cart.findOneAndUpdate(
          { status: "active" },
          { $push: { products: newProduct } },
          { new: true }
        )
        res.send(newCart)
      }
    } else {
      next(CreateError(404, "Product not found"))
    }
  } catch (error) {
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
      },
      { runValidators: true, new: true }
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
