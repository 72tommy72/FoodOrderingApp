import { Router } from "express"
import { isAuthentcated } from "../../middlewares/authentication.middleware"
import { isValid } from "../../middlewares/validation.middleware"
import { getReviews, addReviews, updateReviews, deleteReviews } from "./reviews.controller"
import { addReviewSchema, updateReviewSchema } from "./reviews.validation"

const router = Router()

/**
 * @route GET /reviews/:id
 * @desc Get reviews for a specific item
 * @access Private
 */
router.get('/:id', isAuthentcated, getReviews)

/**
 * @route POST /reviews/:id
 * @desc Add a new review
 * @access Private
 */
router.post('/:id', isAuthentcated, isValid(addReviewSchema), addReviews)

/**
 * @route PATCH /reviews/:id
 * @desc Update an existing review
 * @access Private
 */
router.patch('/:id', isAuthentcated, isValid(updateReviewSchema), updateReviews)

/**
 * @route DELETE /reviews/:id
 * @desc Delete a review
 * @access Private
 */
router.delete('/:id', isAuthentcated, deleteReviews)

export default router