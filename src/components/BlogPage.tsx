'use client'

import { Dot} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import ReactHtmlParser from 'html-react-parser';
import { IBlog } from '@/types/backend';
import formatDate from '@/util/formatDate';
import useSWR from 'swr';
import fetcher from '@/util/fetcher';

const BlogPage = ({slug}: {slug:string}) => {

   const { data, error, isLoading } = useSWR(
    `/api/blog/${slug}`,
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

        <p className='h2 text-start'>{data.data.title}</p>
        <div className='p-1 w-full flex justify-between'>
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
            className='Demo__some-network__share-button'>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
                <Image
          src={data.data.image}
          width={400}
          height={300}
          alt={data.data.image}
          className='rounded-lg'
        />
        <div className='text-justify'>{ReactHtmlParser(data.data.caption)}</div>
      </div>
    </div>
  );
};

export default BlogPage;
