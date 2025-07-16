import Joi from "joi";
import { isValidIdObject } from "../../middlewares/validation.middleware";

/**
 * Validation schema for adding items to cart
 * Requires quantity and valid product ID
 */
export const addCartSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),
    productId: Joi.string()
        .custom(isValidIdObject)
        .required(),
});

/**
 * Validation schema for updating cart items
 * Requires quantity and valid product ID
 */
export const updateCartSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(1)
        .required(),
    productId: Joi.string()
        .custom(isValidIdObject)
        .required(),
});

/**
 * Validation schema for removing items from cart
 * Requires valid product ID
 */
export const removeCartSchema = Joi.object({
    productId: Joi.string()
        .custom(isValidIdObject)
        .required(),
});