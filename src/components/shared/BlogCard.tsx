import { formatRelativeTime } from '@/util/formatRelativeTime';
import { IBlog } from '@/types/backend';
import { Smile } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ post }: { post: IBlog }) => {
  return (
    <div className='p-4 bg-white max-w-[400px]'>
      <div className='flex-between mb-4'>
        <div className='flex items-center gap-3'>
          <Link href={`/profile/${post.author?.id}`}>
            <Image
              src={post.author?.image as string}
              width={48}
              height={48}
              loading='lazy'
              alt='creator'
              className='rounded-full'
            />
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.author?.name}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular '>
                {formatRelativeTime(post.createAt)}
              </p>
              •
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={post.image as string}
        width={300}
        height={300}
        loading='lazy'
        alt='creator'
        className='rounded-full'
      />
      <div className='small-medium lg:base-medium py-2'>
        <p>{post.caption}</p>
      </div>

      <div className='flex justify-between items-center'>
        <input
          className='outline-none bg-transparent py-3'
          placeholder='Insert comment'
        />
        <Smile />
      </div>

      <div className='border mt-3'></div>
    </div>
  );
};

export default BlogCard;
