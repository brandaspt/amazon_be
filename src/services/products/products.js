import express from "express"
import { validateObjectId } from "../sharedMiddlewares.js"

const router = express.Router()

router.get("/:prodId", validateObjectId, (req, res) => res.send("Hello"))

export default router
