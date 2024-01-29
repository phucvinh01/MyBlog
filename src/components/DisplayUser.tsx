import { Popover} from 'antd';
import { CiUser } from 'react-icons/ci';
import React from 'react';
import { signOut } from 'next-auth/react';
import { VscLoading } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Session } from 'next-auth';
import extractUsernameFromEmail from '@/util/extractUsernameFromEmail';
import { Settings, UserCog } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/content/ThemeProvider';

const DisplayUser = ({
  session,
  status,
}: {
  session: Session;
  status: any;
}) => {
  const {theme} = useTheme()
 
  const content = (
    <>
    
     <div className={`flex flex-col items-center justify-center relative `}>
        <Image
          src={session.user?.image as string}
          alt='logo-user'
          width={150}
          height={200}
          className='brightness-50 rounded-md w-full'
        />
        <div className='absolute flex gap-2 flex-col justify-center items-center'>
          <div className='!text-2xl text-primary'>{session.user?.name}</div>
          <div className='text-primary !text-sm'>
            @{extractUsernameFromEmail(session.user?.email as string)}
          </div>
        </div>
      </div>
    <div className='flex flex-col gap-4 px-10 py-4 text-primary dark:bg-[#000] dark:rounded-lg'>
      <div className='hover:bg-gray-400 border px-3 py-1 w-full rounded-xl flex items-center gap-3 cursor-pointer'>
        <UserCog size={24} className='text-primary' color={theme ==='light' ? '#000' : '#fff' }/>
        <Link href={'/me'} className='text-primary'>Profile</Link>
      </div>
       <div className='hover:bg-gray-400 border px-3 py-1 w-full rounded-xl flex items-center gap-3 cursor-pointer'>
        <Settings size={24} className='text-primary' color={theme ==='light' ? '#000' : '#fff' }/>
        <Link href={'/me'} className='text-primary'>Account detail</Link>
      </div>

      <button
        onClick={() => {
          signOut({ callbackUrl: 'http://localhost:3000/' });
        }}
        className='btn-primary'>
        Logout
      </button>
    </div>
    </>
  );

  const router = useRouter();


  if (status === 'unauthenticated') {
    router.replace('/login');
  }

  return !session ? (
    <VscLoading />
  ) : (
    <Popover
      content={content}
      trigger={['click']}
      fresh = {false}
      overlayInnerStyle={{
        padding:0
      }}
      >
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
