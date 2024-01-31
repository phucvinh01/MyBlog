import { IBlog } from '@/types/backend'
import formatDate from '@/util/formatDate'
import { Dot } from 'lucide-react'
import Image from 'next/image'

const BlogCardHero = ( {post}: {post:IBlog}) => {
  return (
    <div className='flex gap-3 shadow-sm bg-white dark:bg-black p-2 rounded-xl'>
        <Image
        alt='img'
        width={280}
        height={200}
        className='w-[280px] h-[200px] rounded-lg object-cover'
        src={post.image}/>
        <div className='flex gap-3 flex-col p-4 justify-center'>
            <p className='text-primary'>Health</p>
            <h3 className='h3'>
                {post.title}
            </h3>
            <div className='flex gap-2'>
                <p className='text-muted'>by {post.author?.name}</p>
                <Dot color='#5c6a78'/>
                <p className='text-muted'> {formatDate(post.createdAt)}</p>
            </div>
        </div>
    </div>
  )
}

export default BlogCardHero