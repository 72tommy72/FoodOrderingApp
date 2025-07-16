import { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller";
import { isValid } from "../../middlewares/validation.middleware";
import { addCouponSchema } from "./coupon.validation";

const router = Router();

/**
 * @route   GET /coupon
 * @desc    Get all coupons
 * @access  Private/Admin
 */
router.get("/", isAuthentcated, isAuthorized('admin'), getAllCoupons);

/**
 * @route   GET /coupon/:id
 * @desc    Get single coupon by ID
 * @access  Private/Admin
 */
router.get("/:id", isAuthentcated, isAuthorized('admin'), getCoupon);

/**
 * @route   POST /coupon
 * @desc    Create new coupon
 * @access  Private/Admin
 */
router.post("/", isAuthentcated, isAuthorized('admin'), isValid(addCouponSchema), addCoupon);

/**
 * @route   PATCH /coupon/:id
 * @desc    Update existing coupon
 * @access  Private/Admin
 */
router.patch("/:id", isAuthentcated, isAuthorized('admin'), updateCoupon);

/**
 * @route   DELETE /coupon/:id
 * @desc    Delete coupon
 * @access  Private/Admin
 */
router.delete("/:id", isAuthentcated, isAuthorized('admin'), deleteCoupon);

export default router;
