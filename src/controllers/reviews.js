import createError from "http-errors"
import ReviewModel from "../models/reviews.js" 

export const getSingleProductReviews = (req, res, next) => {
    try {
        const reviews = product.reviews
        console.log(res.reviews);
        res.send(res.reviews)
        
    } catch (error) {
        next(createError(500, 'Generic server error'))
    }
}

export const postProductReview = async (req, res, next) => {
    try {
        const newReview = new ReviewModel(req.body)
        const {_id} = await newReview.save()
        res.status(201).send({_id})
        
    } catch (error) {
        next(createError(500,'Generic server error' ))
    }
}

export const editReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId
        const editedReview = await ReviewModel.findByIdAndUpdate(reviewId,
            req.body,
            {
                new:true,
                runValidators:true
            }
            )
    } catch (error) {
        next(createError(500,'Generic server error'))
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId
        const review = await ReviewModel.findByIdAndDelete(reviewId)
        if(review){
            res.status(204).send()
        } 
        else{
            next(createError(404, `Review with id: ${reviewId} not found`))
        }       
    } catch (error) {
        next(createError(500, 'Generic server error'))
    }
}
