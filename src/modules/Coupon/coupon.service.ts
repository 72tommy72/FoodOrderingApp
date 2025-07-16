import { Request } from "express";
import { Coupon } from "./coupon.model";

export const getAllCouponsService = async () => {
    const coupon = await Coupon.find({});
    return {
        statusCode: 200,
        data: coupon
    };
}
export const getCouponService = async (req: Request) => {
    const coupon = await Coupon.find({
        _id: req.params.id
    });
    return {
        statusCode: 200,
        data: coupon
    };
};

export const addCouponService = async (req: Request) => {
    const {
        code,
        discountType,
        discountValue,
        minAmount,
        expiresAt,
    } = req.body;
    const coupon = await Coupon.create(
        {
            code,
            discountType,
            discountValue,
            minAmount,
            expiresAt,
        }
    );
    return {
        statusCode: 200,
        data: coupon
    };
};
export const updateCouponService = async (req: Request) => {
    const updateFields: any = {};

    if (req.body.code) updateFields.code = req.body.code;
    if (req.body.discountType) updateFields.discountType = req.body.discountType;
    if (req.body.discountValue) updateFields.discountValue = req.body.discountValue;
    if (req.body.minAmount) updateFields.minAmount = req.body.minAmount;
    if (req.body.expiresAt) updateFields.expiresAt = req.body.expiresAt;
    if (typeof req.body.isActive !== 'undefined') updateFields.isActive = req.body.isActive;

    const coupon = await Coupon.findByIdAndUpdate({
        _id: req.params.id
    }, updateFields
    );
    return {
        statusCode: 200,
        data: coupon
    };
};
export const deleteCouponService = async (req: Request) => {
    await Coupon.findByIdAndDelete({
        _id: req.params.id
    });
    return {
        statusCode: 200,
        message: "Coupon deleted successfully",
    };
};