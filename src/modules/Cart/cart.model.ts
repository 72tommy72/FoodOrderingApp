
import { Document, model, Schema } from "mongoose";

interface ICart extends Document {
    userId: Schema.Types.ObjectId, // ref to User
    items: [
        {
            product: Schema.Types.ObjectId // ref to Product
            quantity: Number,
        }
    ],
    coupon: {
        code: String,
        discountType: "percentage" | "fixed",
        discountValue: Number
    },
    totalPrice: Number
}
const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    coupon: {
        code: { type: String },
        discountType: { type: String, enum: ["percentage", "fixed"] },
        discountValue: { type: Number }
    }
}, { timestamps: true });

export const Cart = model<ICart>("Cart", cartSchema);