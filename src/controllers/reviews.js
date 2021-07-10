import createError from "http-errors"
import ReviewModel from "../models/reviews.js"
import ProductModel from "../models/products.js"

export const getSingleProductReviews = async (req, res, next) => {
  try {
    const reviews = await ProductModel.findById(req.params.prodId, { reviews: 1, _id: 0 }).populate("reviews")
    res.send(reviews)
  } catch (error) {
    next(createError(500, "Generic server error"))
  }
}

export const postProductReview = async (req, res, next) => {
  try {
    const newReview = new ReviewModel(req.body)
    const { _id } = await newReview.save()
    await ProductModel.findByIdAndUpdate(req.params.prodId, {
      $push: {
        reviews: _id,
      },
    })
    res.status(201).send({ _id })
  } catch (error) {
    next(createError(500, "Generic server error"))
  }
}

export const editReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    const editedReview = await ReviewModel.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    })

    if (editedReview) {
      res.send(editedReview)
    } else {
      next(createError(404, `Review with id: ${reviewId} not found`))
    }
  } catch (error) {
    next(createError(500, "Generic server error"))
  }
}

export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    await ProductModel.findOneAndUpdate({ reviews: reviewId }, { $pull: { reviews: reviewId } })

    const review = await ReviewModel.findByIdAndDelete(reviewId)
    if (review) {
      res.json(review)
    } else {
      next(createError(404, `Review with id: ${reviewId} not found`))
    }
  } catch (error) {
    next(createError(500, "Generic server error"))
  }
}
