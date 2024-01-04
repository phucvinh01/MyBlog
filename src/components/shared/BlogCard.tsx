import { IBlog } from '@/types/backend';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightSquare, Forward, GripVertical, MessageSquareMore } from 'lucide-react';
import { useTheme } from '@/content/ThemeProvider';
import formatDate from '@/util/formatDate';

const BlogCard = ({ post }: { post: IBlog }) => {

  const {theme} = useTheme()
  return (
    <div className=' flex flex-col gap-2 p-4 bg-neutral-200 dark:bg-black max-w-[400px] rounded-3xl'>
        <div className='flex justify-between items-center gap-3'>
          <Link href={`/profile/${post.author?.id}`}>
            <Image
              src={post.author?.image as string}
              width={36}
              height={36}
              loading='lazy'
              alt='creator'
              className='rounded-full'
            />
          </Link>
          <div className='flex gap-1 items-center'>
              <Link className='flex gap-2 px-3 py-2 border rounded-2xl font-semibold bg-white !text-black' href={'/'}><span className='text-black'>Read Post</span> <ArrowUpRightSquare color={'black'}/></Link>
              <div><GripVertical color='white' /></div>
          </div>
      </div>
        <p className='text-primary capitalize !text-2xl font-medium px-3 max-h-[100px] min-h-[100px] overflow-hidden flex items-center'>{post.title}</p>
        <p className='capitalize !text-2xl font-medium px-3'><small className='text-primary '>{formatDate(post.createdAt)}</small></p>
      <Image
        src={post.image as string}
        width={350}
        height={100 }
        loading='lazy'
        alt='creator'
        className='min-h-[170px] max-h-[170px] rounded-3xl object-cover'
      />
      <div className='flex justify-between items-center mt-3 px-3'>
        <div>
          <MessageSquareMore color={theme === 'light' ? 'black' : 'white'} />
          </div>  
          <div>
          <Forward  color={theme === 'light' ? 'black' : 'white'}/> 
          </div>
      </div>     
    </div>
  );
};

export default BlogCard;
