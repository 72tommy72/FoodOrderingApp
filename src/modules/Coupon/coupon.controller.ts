import { Request, Response } from "express";
import { catchError } from "../../utils/catchError";
import * as couponService from "./coupon.service";

/**
 * Controller for handling coupon-related operations
 */

/**
 * Get all coupons from the database
 * @param req Express Request object
 * @param res Express Response object
 */
export const getAllCoupons = catchError(async (_req: Request, res: Response) => {
    const { statusCode, data } = await couponService.getAllCouponsService();
    res.status(statusCode).json(data);
});

/**
 * Get a specific coupon by ID
 * @param req Express Request object containing coupon ID
 * @param res Express Response object
 */
export const getCoupon = catchError(async (req: Request, res: Response) => {
    const { statusCode, data } = await couponService.getCouponService(req);
    res.status(statusCode).json(data);
});

/**
 * Add a new coupon to the database
 * @param req Express Request object containing coupon data
 * @param res Express Response object
 */
export const addCoupon = catchError(async (req: Request, res: Response) => {
    const { statusCode, data } = await couponService.addCouponService(req);
    res.status(statusCode).json(data);
});

/**
 * Update an existing coupon
 * @param req Express Request object containing updated coupon data
 * @param res Express Response object
 */
export const updateCoupon = catchError(async (req: Request, res: Response) => {
    const { statusCode, data } = await couponService.updateCouponService(req);
    res.status(statusCode).json(data);
});

/**
 * Delete a coupon from the database
 * @param req Express Request object containing coupon ID
 * @param res Express Response object
 */
export const deleteCoupon = catchError(async (req: Request, res: Response) => {
    const { statusCode, message } = await couponService.deleteCouponService(req);
    res.status(statusCode).json(message);
});