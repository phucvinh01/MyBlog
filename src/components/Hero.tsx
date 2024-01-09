'use client';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import BlogCardHero from './BlogCardHero';
import useSWR from 'swr';
import { Skeleton } from 'antd';
import formatDate from '@/util/formatDate';
import { truncateText } from '@/util/trunctedText';

const Hero = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(`/api/blog/lastestBlog`, fetcher, {
    refreshInterval: 30,
  });
  if (error) {
    return <div>Đã xảy ra lỗi khi tải danh sách bài blog.</div>;
  }
  if (isLoading) {
    return (
      <div className='bg-[#F9FAFB] dark:bg-slate-600 rounded-b-[80px]  p-10'>
        <section className='p-2 bg-white dark:bg-black rounded-lg flex gap-4 shadow-sm'>
          <Skeleton />
        </section>
        <section className='mt-5 flex gap-5 '>
          <div className='flex gap-11'>
            <Skeleton />
            <Skeleton />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className='bg-[#F9FAFB] dark:bg-slate-600 rounded-b-[80px]  p-10'>
      <section className='p-2 bg-white dark:bg-black rounded-lg flex gap-4 shadow-sm'>
        <Image
          src={data.data[0].image}
          alt='hero.img'
          width={570}
          height={340}
          className='rounded-xl min-h-[400px] object-center'
        />
        <div className='p-10 flex gap-4 flex-col'>
          <p className='text-primary'>New</p>
          <h2 className='h2'>{data.data[0].title}</h2>
          <p className='text-muted'>
            {truncateText(data.data[0].caption as string, 200)}{' '}
            <span className='text-end cursor-pointer'>...Xem thêm</span>
          </p>
          <div className='flex gap-4'>
            <img
              className='w-[24px] h-[24px] rounded-full object-cover'
              src={data.data[0].author?.image}
            />
            <p className='text-muted'>{data.data[0].author?.name}</p>
            <Dot
              className='text-muted'
              color='#5c6a78'
            />
            <p className='text-muted'>{formatDate(data.data[0].createdAt)}</p>
          </div>
        </div>
      </section>
      <section className='mt-5 flex gap-5 '>
        <div className='flex gap-11'>
          <BlogCardHero post={data.data[1]} />
          <BlogCardHero post={data.data[2]} />
        </div>
      </section>
    </div>
  );
};

export default Hero;
