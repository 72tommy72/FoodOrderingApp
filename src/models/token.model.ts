import mongoose, { model, Schema, Types } from "mongoose";
interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    isValid: boolean;
    agent: string;
    expiredAt: string;
    createdAt: Date;
    updatedAt: Date;

}
//schema
export const userSchema = new Schema<IToken>({
    token: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        // type: Types.ObjectId,
        ref: "User"
    },
    isValid: {
        type: Boolean,
        default: true
    },
    agent: String,
    expiredAt: String


}, { timestamps: true })

//model
export const Token = mongoose.models.token || model("Token", userSchema)