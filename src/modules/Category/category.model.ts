import { model, Schema,Document } from "mongoose";

interface ICategory extends Document{
    name: String,
    image: String,
    userId : Schema.Types.ObjectId
}
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: {
      url: { type: String },
      id: { type: String }
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }, {
    timestamps: true
  });
export const Category = model<ICategory>("Category", categorySchema)