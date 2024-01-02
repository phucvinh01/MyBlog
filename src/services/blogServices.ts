import { IBlog } from "@/types/backend";
import connectDB from "@/util/database";
import Blog from '@/models/blog'



export const createBlog = async (blog: IBlog) => {
    connectDB()
    console.log(blog);
  try {
      const newBlog = new Blog({
        ...blog
      });
      const data =  await newBlog.save();
      console.log(data);
    return true;
  } catch (err) {
    console.log('Error saving user', err);
    return false;
  }
};
