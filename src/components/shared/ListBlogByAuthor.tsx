'use client';

import React from 'react';
import BlogCard from './BlogCard';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((r) => r.json());
const ListBlogByAuthor = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `/api/blog/blogByUser/?idAuthor=${session?.userId}`,
    fetcher,
    {
      refreshInterval: 30
    }
  );

  if (error) {
    return <div>Đã xảy ra lỗi khi tải danh sách bài blog.</div>;
  }

  if (!data) {
    return <div>Đang tải danh sách bài blog...</div>;
  }


  return (
    <div className='p-3 flex flex-col justify-center items-center gap-4'>
      {data?.data?.map((item: any, index: any) => {
        return (
          <BlogCard
            key={index}
            post={item}
          />
        );
      })}
    </div>
  );
};

export default ListBlogByAuthor;
