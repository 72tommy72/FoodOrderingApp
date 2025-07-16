import { catchError } from "../../utils/catchError";
import * as cartService from "./cart.service";
import { Request, Response } from "express";

/**
 * Cart Controller
 * Contains all cart-related route handlers
 */

/**
 * Get cart contents for the current user
 */
export const getCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.getCartService(req);
    return sendResponse(res, result);
});

/**
 * Add new item to cart
 */
export const addToCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.addToCartService(req);
    return sendResponse(res, result);
});

/**
 * Update existing cart item quantity
 */
export const updateCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.updateCartService(req);
    return sendResponse(res, result);
});

/**
 * Remove specific item from cart
 */
export const removeCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.removeCartService(req);
    return sendResponse(res, result);
});

/**
 * Clear all items from cart
 */
export const clearCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.clearCartService(req);
    return sendResponse(res, result);
});

/**
 * Apply discount coupon to cart
 */
export const applyCouponToCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.applyCouponToCartService(req);
    return sendResponse(res, result);
});

/**
 * Process cart checkout
 */
export const checkoutCart = catchError(async (req: Request, res: Response) => {
    const result = await cartService.checkoutCartService(req);
    return sendResponse(res, result);
});

/**
 * Helper function to send consistent response
 */
const sendResponse = (res: Response, result: any) => {
    return res.status(result?.statusCode).json(result?.data);
};
