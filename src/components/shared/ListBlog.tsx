'use client';

import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const ListBlog = () => {
  const [listBlog, setListBlog] = useState([]);

  const getData = async () => {
    const response = await fetch(`/api/blog`, {
      method: 'GET',
    });

    if (response.status === 200) {
    const data = await response.json()
      setListBlog(data.data);
    } else {
      message.error('Get data failed');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  return (
    <div className='grid grid-cols-3 justify-center items-center gap-4'>
        {
            listBlog.map((item,index) => {
                return <div className='flex justify-center'>
                   <BlogCard key={index} post={item}/>
                   </div>;
            })
        }
    </div>
  )
   
};

export default ListBlog;
