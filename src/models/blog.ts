import mongoose from "mongoose";

const { Schema } = mongoose;
// title: string,
//   caption?: string | null,
//   image: string,
//   tag?: string,
//   author?: string,
//   slug?: string,
//   location?: string
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
        image: {
            type: String,
            required: true
        },
        tag: {
            type: String,
        },
        
        author: { type: Schema.Types.ObjectId, ref: 'User' },

        location: {
            type: String,
        },
        slug: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
 export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);