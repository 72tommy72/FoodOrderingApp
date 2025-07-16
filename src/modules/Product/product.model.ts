import { model, Schema } from "mongoose";

interface IProduct {
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    quantity: Number,
    available: Boolean,
    createdBy : Schema.Types.ObjectId
}
export const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
        url: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    quantity : { type: Number, required: true },
    available: { type: Boolean, required: true },
    category:{
        ref: "Category",
        type: Schema.Types.ObjectId
    },
    createdBy: {
        ref: "User",
        type: Schema.Types.ObjectId
    }
},{
    timestamps: true
})
export const Product = model<IProduct>("Product", productSchema)