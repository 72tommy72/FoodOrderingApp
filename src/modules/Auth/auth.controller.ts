import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { catchError } from "../../utils/catchError";

/**
 * Authentication Controller
 * Handles all authentication related operations
 */

/**
 * Register new user
 * @param req Request object containing user registration data
 * @param res Response object
 */
export const register = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.registerService(req.body);
    return sendResponse(res, result);
});

/**
 * Activate user account using activation code
 * @param req Request object containing activation code
 * @param res Response object
 */
export const activatedAccount = catchError(async (req: Request, res: Response) => {
    const { activationCode } = req.params;
    const result = await AuthService.activateAccountService({ activationCode });
    return sendResponse(res, result, 500);
});

/**
 * User login
 * @param req Request object containing login credentials
 * @param res Response object
 */
export const login = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.loginService(req.body);
    return sendResponse(res, result);
});

/**
 * Send forget password email
 * @param req Request object containing user email
 * @param res Response object
 */
export const sendForgetPassword = catchError(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await AuthService.forgetPasswordService(email);
    return sendResponse(res, result);
});

/**
 * Reset user password
 * @param req Request object containing new password data
 * @param res Response object
 */
export const resetPassword = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.resetPasswordService(req.body);
    return sendResponse(res, result);
});

/**
 * Get user profile
 * @param req Request object containing user data
 * @param res Response object
 */
export const getUser = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.getUserService((req as any).user);
    return sendResponse(res, result);
});

/**
 * User logout
 * @param req Request object containing user data
 * @param res Response object
 */
export const logout = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.logoutService((req as any).user);
    return sendResponse(res, result);
});

/**
 * Helper function to send consistent response
 * @param res Response object
 * @param result Service result containing status code and data
 * @param defaultStatus Default status code if not provided
 */
const sendResponse = (res: Response, result: any, defaultStatus: number = 200) => {
    return res.status(result?.statusCode || defaultStatus).json(result?.data || {});
};
