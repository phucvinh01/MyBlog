'use client';

import React from 'react';
import BlogCard from './BlogCard';
import useSWR from 'swr';
import {Skeleton} from 'antd'

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ListBlog = () => {

  const { data, error, isLoading } = useSWR(`/api/blog`, fetcher, {
    refreshInterval: 30,
  });

  if (error) {
    return <div>Đã xảy ra lỗi khi tải danh sách bài blog.</div>;
  }

  if (isLoading) {
    return <div className='grid grid-cols-3 justify-center items-center gap-4'>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>;
  }

  return (
    <div className='grid grid-cols-3 justify-center items-center gap-4'>
      {data.data.map((item: any, index: number) => {
        return (
          <div className='flex justify-center' key={index}>
            <BlogCard
              key={index}
              post={item}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListBlog;
