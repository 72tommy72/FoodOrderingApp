import Joi from "joi";

/**
 * Configuration for email validation
 * Requires minimum 2 domain segments and allows only .com and .net TLDs
 */
const emailConfig = {
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
};

/**
 * Password validation pattern
 * Allows alphanumeric characters with length between 3-30 characters
 */
const passwordPattern = new RegExp("^[a-zA-Z0-9]{3,30}$");

/**
 * Validation schema for user registration
 * Requires username, email, password and password confirmation
 */
export const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email(emailConfig).required(),
    password: Joi.string().pattern(passwordPattern).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
}).required();

/**
 * Validation schema for account activation
 * Requires activation code
 */
export const activateSchema = Joi.object({
    activationCode: Joi.string().required()
}).required();

/**
 * Validation schema for user login
 * Requires email and password
 */
export const loginSchema = Joi.object({
    email: Joi.string().email(emailConfig).required(),
    password: Joi.string().pattern(passwordPattern).required()
}).required();

/**
 * Validation schema for forget password request
 * Requires email address
 */
export const forgetPasswordSchema = Joi.object({
    email: Joi.string().email(emailConfig).required()
}).required();

/**
 * Validation schema for password reset
 * Requires email, forget code, new password and password confirmation
 */
export const resetPasswordSchema = Joi.object({
    email: Joi.string().email(emailConfig).required(),
    forgetCode: Joi.string().required(),
    password: Joi.string().pattern(passwordPattern).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
}).required();
