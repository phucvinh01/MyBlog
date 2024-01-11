import { IBlog, INewBlog } from '@/types/backend';
import connectDB from '@/util/database';
import Blog from '@/models/blog';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const createBlog = async (blog: INewBlog) => {
  await connectDB();
  try {
    const title = `${blog.title}-${nanoid(5)}`;
    const slug = slugify(title, { replacement: '-', locale: 'vi', remove: /[*+~.()'"!:@]/g });
    const newBlog = new Blog({
      title: blog.title,
      image: blog.image,
      caption: blog.caption,
      tag: blog.tag,
      author: blog.author,
      slug: slug,
      location: blog.location,
    });
    await newBlog.save();
    return true;
  } catch (err) {
    console.log('Error saving user', err);
    return false;
  }
};

export const getAllBlog = async () => {
  await connectDB();
  try {
    const listBlog = await Blog.find({}).populate('author').sort({ createdAt: -1 }).exec()
    if(listBlog) {
      return listBlog;
    }
  } catch (error) {
    console.log(error);
    return false
  }
};

export const getBlogByAuthor = async (idAuthor: string) => {
  await connectDB();
  try {
    const listBlog = await Blog.find({author: idAuthor}).populate('author').sort({ createdAt: -1 }).exec()
    if(listBlog) {
      return listBlog;
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getLastestBlog = async () => {
  try {
    const lastestBlog = await Blog.find({}).populate('author').sort({ createdAt: -1 }).limit(3).exec()
    if(lastestBlog) {
      return lastestBlog;
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getOneBlogBySlug = async (slug: string) => {
  try {
    const blog = await Blog.findOne({"slug":slug}).populate('author').exec()

    if(blog) {
      return blog;
    }
  } catch (error) {
    console.log(error);
    return false
  }
}
