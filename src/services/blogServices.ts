import { IBlog, INewBlog } from '@/types/backend';
import connectDB from '@/util/database';
import Blog from '@/models/blog';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import cheerio from 'cheerio'
import sharp from 'sharp'
import { storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


function extractElements(content:string) {
  const $ = cheerio.load(content);
  
  // Tìm các thẻ <img>
  const imgTags = $('img');
  const imgSrcList = imgTags.toArray().map((img) => $(img).attr('src'));
  
  // Tìm các thẻ <p>
  const pTags = $('p');
  const pContentList = pTags.toArray().map((p) => $(p).text());
  
  // Tìm các thẻ <h2>
  const h2Tags = $('h2');
  const h2ContentList = h2Tags.toArray().map((h2) => $(h2).text());
  
  // Tìm các thẻ <ul> và <li>
  const ulTags = $('ul');
  const liContentList = ulTags.toArray().map((ul) => {
    const liTags = $(ul).find('li');
    return liTags.toArray().map((li) => $(li).text());
  });
  
  return {
    images: imgSrcList,
    paragraphs: pContentList,
    headings: h2ContentList,
    lists: liContentList,
  };
}

async function decodeBase64Image(base64Data:string) {
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const processedImage = await sharp(imageBuffer)
      .resize(500, 500) // Example resizing
      .jpeg({ quality: 80 }) // Example quality adjustment
      .toBuffer();

    return processedImage;
      

    // const storageRef = ref(storage, `files/${processedImage}`);
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((downloadURL) => {
    //       setImageAsUrl(downloadURL)
    //     });
    //   });
    


}


export const createBlog = async (blog: INewBlog) => {
  await connectDB();
  try {

    const getCaption = extractElements(blog.caption as string)


    getCaption.images.map(async (item) => {
      if(typeof(item) === 'string')
      {
        const data = decodeURI(item.split(",")[1]);
        console.log(await decodeBase64Image(data));
      }
    })

    // const title = `${blog.title}-${nanoid(5)}`;
    // const slug = slugify(title, { replacement: '-', locale: 'vi', remove: /[*+~.()'"!:@]/g });
    // const newBlog = new Blog({
    //   title: blog.title,
    //   image: blog.image,
    //   caption: blog.caption,
    //   tag: blog.tag,
    //   author: blog.author,
    //   slug: slug,
    //   location: blog.location,
    // });
    // await newBlog.save();
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
