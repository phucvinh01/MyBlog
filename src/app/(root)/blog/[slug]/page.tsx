'use client';

import fetcher from '@/util/fetcher';
import formatDate from '@/util/formatDate';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import ReactHtmlParser from 'html-react-parser';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import useSWR from 'swr';
const Page = ({ params }: { params: { slug: string } }) => {

  const { data, error, isLoading } = useSWR(
    `/api/blog/${params.slug}`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  if (error) {
    return <div>Đã xảy ra lỗi khi tải bài blog.</div>;
  }

  if (isLoading) {
    return <div>Đang tải bài blog...</div>;
  }

  if (!data) {
    return <div>Đang tải bài blog...</div>;
  }

  return (
    <div className='flex justify-center p-10'>
      <div className='flex justify-center items-center flex-col gap-8 w-2/3'>
        <Image
          src={data.data.image}
          width={400}
          height={300}
          alt={data.data.image}
          className='rounded-lg'
        />
        <p className='h2 text-start'>{data.data.title}</p>
        <div className="p-1 w-full flex justify-between">
<div className='flex  gap-2'>
            <Image
            width={24}
            height={24}
            alt='img-author'
              className='rounded-full object-cover'
              src={data.data.author?.image as string}
            />
            <p className='text-muted'>{data.data.author?.name}</p>
            <Dot
              className='text-muted'
              color='#5c6a78'
            />
            <p className='text-muted'>{formatDate(data.data.createdAt)}</p>

          </div>
          <FacebookShareButton
          
          url={window.location.href}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        </div>
        <div className='text-justify'>{ReactHtmlParser(data.data.caption)}</div>

      </div>
      <div className='w-1/3'></div>
    </div>
  );
};

export default Page;
