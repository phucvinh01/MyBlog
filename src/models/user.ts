import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        bio: {
            type: String,
        },
        role: {
            type: String,
            default: "Content Writer"
        }
    },
    { timestamps: true }
);
 export default mongoose.models.User || mongoose.model('User', userSchema);