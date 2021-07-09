import express from "express"
import * as Controller from "../../controllers/cart.js"
import { validateObjectId } from "../sharedMiddlewares.js"

const router = express.Router()

// Get Active Cart
router.get("/", Controller.getCart)

// Get Cart History
router.get("/history", Controller.getCartHistory)

// Update Cart Status
router.put("/status", Controller.updateCartStatus)

// Update Cart product
router.put("/:prodId", validateObjectId, Controller.updateCartProducts)

export default router
