import { Popover } from 'antd';
import { CiUser } from 'react-icons/ci';
import React from 'react';
import { signOut } from 'next-auth/react';
import Route from './ui/Route';
import { VscLoading } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DisplayUser = ({ session, status }: { session: any; status: any }) => {
  const content = (
    <div className='flex flex-col gap-4 px-3 py-2 text-primary dark:bg-dark dark:border dark:rounded-lg' >
      <p className='text-primary'>
        Hello! <strong className='text-primary text-sm'>{session?.user?.name}</strong>
      </p>
      <Route
        label='My profile'
        route={`/me`}
      />
      <button
        onClick={() => {
          signOut({ callbackUrl: 'http://localhost:3000/' });
        }}
        className='btn-primary'>
        Logout
      </button>
    </div>
  );

  const router = useRouter();

  if (status === 'unauthenticated') {
    router.replace('/login');
  }
  console.log(session);

  return !session ? (
    <VscLoading />
  ) : (
    <Popover
      content={content}
      trigger={['click']}>
      <div className='btn-primary'>
        {session?.user?.image ? (
          <div className=' flex gap-1 justify-center items-center'>
          <Image
          loading='lazy'
            src={session?.user?.image}
            alt='img'
            className='object-cover  rounded-full'
            width={30}
            height={30}
          />
          <span>
            {
              session?.user?.name
            }
          </span>
          </div>

        ) : (
          <div className=''>
            <CiUser />
          </div>
        )}
      </div>
    </Popover>
  );
};

export default DisplayUser;
