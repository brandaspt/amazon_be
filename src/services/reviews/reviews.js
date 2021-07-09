import express from "express";
import { validateObjectId } from "../sharedMiddlewares.js";
import * as Controllers from "../../controllers/reviews.js";
import * as ProductControllers from "../../controllers/products.js"

const router = express.Router();

router.get("/:prodId", validateObjectId, ProductControllers.getSingleProduct, Controllers.getSingleProductReviews);

router.post("/", Controllers.postProductReview);

router.put("/:reviewId", validateObjectId, Controllers.editReview);

router.delete("/:reviewId", Controllers.deleteReview);

export default router;
