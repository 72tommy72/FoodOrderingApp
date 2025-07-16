import Joi from "joi";

/**
 * Validation schema for adding a new review
 * Requires rating (number) and serviceId (string)
 * Optional comment field
 */
export const addReviewSchema = Joi.object({
    rating: Joi.number()
        .required()
        .min(1)
        .max(5),
    comment: Joi.string()
        .trim()
        .max(500),
    serviceId: Joi.string()
        .required()
        .trim()
});

/**
 * Validation schema for updating an existing review
 * All fields are optional to allow partial updates
 */
export const updateReviewSchema = Joi.object({
    rating: Joi.number()
        .min(1)
        .max(5),
    comment: Joi.string()
        .trim()
        .max(500)
});
