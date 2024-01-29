import { IBlog, INewBlog } from '@/types/backend';
import connectDB from '@/util/database';
import Blog from '@/models/blog';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import cheerio from 'cheerio';
import sharp from 'sharp';
import { storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytes, UploadResult } from 'firebase/storage';
import { random6Char } from '@/util/randomChar';

function extractElements(content: string) {
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
  // await uploadBytes(storageRef, processedImage).then((snapshot) => {
  //    getDownloadURL(snapshot.ref).then((downloadURL) => {
  //       url =  downloadURL
  //   });
  // })
  // return url

async function decodeBase64Image(data: string) {


  const imageBuffer = Buffer.from(data, 'base64');

  const processedImage = await sharp(imageBuffer)
    .resize(500, 500) // Example resizing
    .jpeg({ quality: 80 }) // Example quality adjustment
    .toBuffer();

  const storageRef = ref(storage, `files/${random6Char()}`);

  const snapshot =  await uploadBytes(storageRef, processedImage,{ contentType: 'image/jpeg' })

  const urlDownload = await getDownloadURL(snapshot.ref)

  return urlDownload;

}

export const createBlog = async (blog: INewBlog) => {
  let imgArray: any[] = []

  //console.log("check blog caption: >>>>>>>>>>>>", blog.caption);

  await connectDB();
  try {
    const getCaption = extractElements(blog.caption as string);

    //console.log("check blog getCaption: >>>>>>>>>>>>", getCaption);
    // console.log("check caption.imgage", getCaption.images);
    // console.log("check lenght caption.imgage", getCaption.images.length);


    getCaption.images.map(async (item: any) => {
      if (typeof item === 'string') {
        const data = decodeURI(item.split(',')[1]);
        imgArray.push(await decodeBase64Image(data));
      }
    });

    console.log("check list image ủl upload:", imgArray);

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
    const listBlog = await Blog.find({})
      .populate('author')
      .sort({ createdAt: -1 })
      .exec();
    if (listBlog) {
      return listBlog;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getBlogByAuthor = async (idAuthor: string) => {
  await connectDB();
  try {
    const listBlog = await Blog.find({ author: idAuthor })
      .populate('author')
      .sort({ createdAt: -1 })
      .exec();
    if (listBlog) {
      return listBlog;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLastestBlog = async () => {
  try {
    const lastestBlog = await Blog.find({})
      .populate('author')
      .sort({ createdAt: -1 })
      .limit(3)
      .exec();
    if (lastestBlog) {
      return lastestBlog;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getOneBlogBySlug = async (slug: string) => {
  try {
    const blog = await Blog.findOne({ slug: slug }).populate('author').exec();

    if (blog) {
      return blog;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
