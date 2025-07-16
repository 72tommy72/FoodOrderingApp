// models/coupon.model.ts
import { Schema, model } from "mongoose";
interface ICoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minAmount: number;
  expiresAt?: Date;
  isActive: boolean;
}
const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true },
  minAmount: { type: Number, default: 0 },
  expiresAt: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Coupon =  model<ICoupon>("Coupon", couponSchema);
