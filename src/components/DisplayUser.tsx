import {Popover } from 'antd';
import { CiUser } from 'react-icons/ci';
import React from 'react';
import { signOut } from 'next-auth/react';
import Route from './ui/Route';
import { VscLoading } from 'react-icons/vsc';

const DisplayUser = ({session}:{session: any }) => {
  const content = (
    <div className='flex flex-col gap-4 px-3 py-2'>
      <p>Hello! {session?.user?.name}</p>
      <Route label='My profile' route={`/profile/${session?.user?.name}`}/>
      <button
        onClick={() => {
          signOut({ callbackUrl: 'http://localhost:3000/'});
        }}
        className='p-2 px-5 -mt-1 bg-black text-light rounded-full'>
        Logout
      </button>
    </div>
  );
  return (
    
      !session ? <VscLoading /> : <Popover
      content={content}
      trigger={['click']}>
      <div className='rounded-full border p-1  hover:cursor-pointer bg-accent dark:bg-accent'>
        { session?.user?.image ? <img src={session?.user?.image} alt='img' className='object-cover w-[30px] rounded-full'  />: <div className='p-2'><CiUser /></div>}
      </div>
    </Popover>
    
    
  );
};

export default DisplayUser;
