import { model, Schema, Document } from "mongoose";
interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: {
    product: Schema.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  coupon?: {
    code: string;
    discountType: string;
    discountValue: number;
  };
  totalPrice: number;  
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
}

;

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    coupon: {
      code: { type: String },
      discount: { type: Number },
    },
    shippingAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["stripe", "cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
