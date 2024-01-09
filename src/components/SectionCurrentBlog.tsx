import React from 'react';
import ListBlog from './shared/ListBlog';

const category = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Bleach' },
  { id: 3, name: 'Moutain' },
  { id: 4, name: 'Nature' },
  { id: 5, name: 'Culture' },
  { id: 6, name: 'Funny' },
];

const SessionCurrentBlog = () => {
  return (
    <section className='pt-[150px] px-10'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <h2 className='h2'>Browse by Category</h2>
        <p className='text-muted'>
          Select a category to see more related content
        </p>
        <ul className='flex gap-5 mt-10'>
          {category.map((item) => {
            return (
              <li
                className=' text-black px-4 py-2 rounded-3xl text-lg capitalize bg-[#f9fafb] border border-[#e5e7eb]'
                key={item.id}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='mt-[50px]'>
        <ListBlog/>
      </div>
    </section>
  );
};

export default SessionCurrentBlog;
