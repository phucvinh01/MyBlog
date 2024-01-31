import { IBlog } from '@/types/backend';
import Image from 'next/image';
import { Dot, Settings } from 'lucide-react';
import formatDate from '@/util/formatDate';
import { truncateText } from '@/util/trunctedText';
import { useRouter } from 'next/navigation';
import ReactHtmlParser from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PopupSettingBlog from '../PopupSettingBlog';
const BlogCard = ({ post, mode }: { post: IBlog; mode?: any }) => {
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);
  const { data: session } = useSession();

  const handleShowCaption = (caption: any) => {
    if (caption.length > 100) {
      const trunctedText = truncateText(caption, 120);
      return ReactHtmlParser(trunctedText);
    } else {
      return ReactHtmlParser(caption);
    }
  };

  useEffect(() => {
    if (session?.userId === post.author?._id) {
      setIsAuthor(true);
    }
  }, [post, session]);

  return (
    <div className='flex gap-5 flex-col bg-white dark:bg-black max-w-[350px]'>
      <Image
        onClick={() => router.push(`/blog/${post.slug}`)}
        src={post.image as string}
        width={350}
        height={250}
        loading='lazy'
        alt='creator'
        className='cursor-pointer rounded-t-lg object-cover min-h-[250px] min-w-[350px] max-w-[350px] max-h-[250px] hover:scale-105 transition-all'
      />
      <div className='flex gap-5 flex-col p-4'>
        <h2
          onClick={() => router.push(`/blog/${post.slug}`)}
          className='h3 cursor-pointer overflow-hidden'>
          {truncateText(post.title as string, 80)}
        </h2>

        <div
          id='caption-text'
          className={` text-muted w-full ${
            mode === 'vertical' ? '' : 'max-h-[100px] min-h-[100px]'
          }`}>
          {handleShowCaption(post.caption)}
          {post.caption && post.caption.length > 150 ? (
            <span className='text-end cursor-pointer'></span>
          ) : (
            ''
          )}
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <Image
              width={24}
              height={24}
              alt='img-author'
              className='rounded-full object-cover'
              src={post.author?.image as string}
            />
            <p className='text-muted'>{post.author?.name}</p>
            <Dot
              className='text-muted'
              color='#5c6a78'
            />
            <p className='text-muted'>{formatDate(post.createdAt)}</p>
          </div>
          {isAuthor && <PopupSettingBlog blog={post} />}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
