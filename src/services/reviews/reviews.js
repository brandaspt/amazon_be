import express from "express";
import { validateObjectId } from "../sharedMiddlewares.js";
import * as Controllers from "../../controllers/reviews.js";

const router = express.Router();

router.get("/:prodId", validateObjectId, Controllers.getSingleProductReviews);

router.post("/:prodId", validateObjectId, Controllers.postProductReview);

router.put("/:reviewId", validateObjectId, Controllers.editReview);

router.delete("/:reviewId", Controllers.deleteReview);

export default router;
