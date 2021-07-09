import express from "express"
import * as Controller from "../../controllers/cart.js"

const router = express.Router()

// Get Active Cart
router.get("/", Controller.getCart)

// Get Cart History
router.get("/history", Controller.getCartHistory)

// Update Cart product
router.put("/:prodId", Controller.updateCartProducts)

export default router
