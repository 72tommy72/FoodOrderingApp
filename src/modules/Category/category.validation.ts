// Import required validation library
import Joi from "joi";

// Import custom validation middleware
import { isValidIdObject } from "../../middlewares/validation.middleware";

/**
 * Validation schema for adding a new category
 * Requires:
 * - name: string
 * - createdBy: valid MongoDB ObjectId
 */
export const addCategorySchema = Joi.object({
    name: Joi.string()
        .required()
        .trim(),
    createdBy: Joi.string()
        .custom(isValidIdObject)
        .required()
});
