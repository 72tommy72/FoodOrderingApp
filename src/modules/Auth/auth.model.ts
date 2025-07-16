
import mongoose, { model, Schema } from "mongoose";
interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    isConfirmed: boolean;
    isLogged: boolean;
    role: 'customer' | 'admin';
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}
//schema
export const userSchema = new Schema<IUser>({
    // User credentials
    userName: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    // User status and confirmation
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    isLogged: {
        type: Boolean,
        default: false,
    },

    // User profile
    // firstName: String,
    // lastName: String,

    // User role and permissions
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },

    // User contact information
    phone: String,
    address: String,
    
}, {
    timestamps: true // Adds createdAt and updatedAt
});



//model
export const User = mongoose.models.User || model("User", userSchema)