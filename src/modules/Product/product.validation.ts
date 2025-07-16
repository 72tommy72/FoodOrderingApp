// Import required modules
import Joi from "joi";
import { isValidIdObject } from "../../middlewares/validation.middleware";

/**
 * Validation schema for adding a new product
 * Defines the required fields and their validation rules
 */
export const addProductSchema = Joi.object({
  // Product name validation
  name: Joi.string()
    .required()
    .trim(),

  // Product price validation  
  price: Joi.number()
    .required()
    .positive(),

  // Product description validation
  description: Joi.string()
    .required()
    .trim(),

  // Product category validation  
  category: Joi.string()
    .required()
    .trim(),

  // Product availability status
  availabel: Joi.boolean()
    .required(),

  // Creator ID validation with custom check
  createdBy: Joi.string()
    .custom(isValidIdObject)
    .required()
});
