import { IBlog } from '@/types/backend';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import formatDate from '@/util/formatDate';
import { truncateText } from '@/util/trunctedText';
import { useRouter } from 'next/navigation';

const BlogCard = ({ post, mode }: { post: IBlog, mode: any }) => {
  const router = useRouter()
  return (
    <div className='gap-2 p-4 bg-white dark:bg-black max-w-[380px]' onClick={() => router.push(`/blog/${post.slug}`)}>
        {/* <div className='flex justify-between items-center gap-3'>
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
      </div>      */}
      <div className='flex gap-5 flex-col '>
       <Image
        src={post.image as string}
        width={350}
        height={250}
        loading='lazy'
        alt='creator'
        className='cursor-pointer rounded-lg object-cover min-h-[250px] min-w-[350px] max-w-[350px] max-h-[250px] hover:scale-110 transition-all'
      />
      <h2 className='h3'>
        {truncateText(post.title as string, 80)}
      </h2>

      <p className={`text-muted ${mode === 'vertical' ? '' : 'max-h-[100px] min-h-[100px]'}`}>{truncateText(post.caption as string, 150)} {post.caption && post.caption.length > 150 ? <span className='text-end cursor-pointer'></span> : "" } </p>

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
      </div>
    </div>
  );
};

export default BlogCard;
