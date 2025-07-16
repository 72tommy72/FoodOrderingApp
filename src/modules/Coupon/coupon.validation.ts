import Joi from "joi";

/**
 * Validation schema for adding a new coupon
 * Defines the required fields and their validation rules
 */
export const addCouponSchema = Joi.object({
    // Unique coupon code identifier
    code: Joi.string()
        .required(),

    // Type of discount - either fixed amount or percentage
    discountType: Joi.string()
        .valid('fixed', 'percentage')
        .required(),

    // Value of the discount to be applied
    discountValue: Joi.number()
        .required(),

    // Minimum order amount required to use the coupon
    minAmount: Joi.number()
        .required(),

    // Date when the coupon will expire
    expiresAt: Joi.date()
        .required()
});
