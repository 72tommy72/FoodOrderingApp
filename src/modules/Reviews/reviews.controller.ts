import { Response } from "express";
import { catchError } from "../../utils/catchError";
import * as reviewsService from './reviews.service'

/**
 * Reviews Controller
 * Handles HTTP requests related to reviews functionality
 */

/**
 * Get reviews for a specific item
 * @param req - Express request object containing item ID in params
 * @param res - Express response object
 */
export const getReviews = catchError(async (req, res: Response) => {
    const { id } = req.params;
    const result = await reviewsService.getReviewsService(id);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Add a new review
 * @param req - Express request object containing review data
 * @param res - Express response object
 */
export const addReviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.addReviewsService(req);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Update an existing review
 * @param req - Express request object containing updated review data
 * @param res - Express response object
 */
export const updateReviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.updateReviewsService(req);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Delete a specific review
 * @param req - Express request object containing review ID in params
 * @param res - Express response object
 */
export const deleteReviews = catchError(async (req, res: Response) => {
    const { id } = req.params;
    const result = await reviewsService.deleteReviewsService(id);
    return res.status(result.statusCode).json(result.data);
});
