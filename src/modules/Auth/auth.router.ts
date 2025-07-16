import { Router } from "express";
import { 
    activatedAccount, 
    getUser, 
    login, 
    logout, 
    register, 
    resetPassword, 
    sendForgetPassword 
} from "./auth.controller";
import { 
    activateSchema,
    forgetPasswordSchema, 
    loginSchema, 
    registerSchema, 
    resetPasswordSchema 
} from "./auth.validation";
import { isValid } from "../../middlewares/validation.middleware";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
const router = Router()
/**
 * @route   POST /auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", isValid(registerSchema), register);

/**
 * @route   GET /auth/confirm-email/:activationCode
 * @desc    Activate user account via email confirmation
 * @access  Public
 */
router.get(
    "/confirm-email/:activationCode",
    isValid(activateSchema),
    activatedAccount
);

/**
 * @route   POST /auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post("/login", isValid(loginSchema), login);

/**
 * @route   PATCH /auth/forget-password
 * @desc    Send password reset email
 * @access  Public
 */
router.patch(
    "/forget-password",
    isValid(forgetPasswordSchema),
    sendForgetPassword
);

/**
 * @route   PATCH /auth/reset-password
 * @desc    Reset user password with token
 * @access  Public
 */
router.patch("/reset-password", isValid(resetPasswordSchema), resetPassword);

/**
 * @route   GET /auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/me", isAuthentcated, getUser);

/**
 * @route   GET /auth
 * @desc    Logout user
 * @access  Private
 */
router.get("/", isAuthentcated, logout);

export default router;
