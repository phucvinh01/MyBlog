'use client';
import { IUser } from '@/types/backend';
import extractUsernameFromEmail from '@/util/extractUsernameFromEmail';
import formatDate from '@/util/formatDate';
import { Dot } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LeftSideBarProfile = () => {
  const { data: session } = useSession();
  const [dataUser, setDataUser] = useState<IUser>();

  const email = session?.user?.email;

  const getDataUser = async () => {
    try {
      const resutl = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (resutl.status === 200) {
        setDataUser(await resutl.json());
      } else {
        throw new Error('Failed to load user profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);


  return (
    <div className=' hidden sm:block min-h-screen w-[350px] px-5 absolute right-0 bg-transparent  '>
      <div className=' flex gap-3 flex-col   '>
        <div className='flex w-full justify-between items-center '>
          <p className='text-primary'>Profile</p>
          <button className='btn-primary'>Edit profile</button>
        </div>
        <div className='bg-[#1C1F24] rounded-3xl flex items-start '>
          <div className='border-[#000] border-4 rounded-3xl'>
            <Image
              src={session?.user?.image as string}
              alt='logo-user'
              width={80}
              height={80}
              className='object-cover rounded-3xl border-[#000] '
            />
          </div>
        </div>
        <div className='mt-5'>
          <div className='flex gap-1 flex-col'>
            <h3 className='text-primary !text-3xl capitalize'>
              {dataUser?.username}
            </h3>
            <div className='flex items-center'>
              <p className='text-primary !text-[12px] '>
                @{extractUsernameFromEmail(dataUser?.email)}
              </p>
              <Dot color='white' />
              <small className='text-primary !text-[10px] !text-gray-500'>
                Joined {formatDate(dataUser?.createdAt as string)}
              </small>
            </div>
            <div className='flex justify-center'>
              {dataUser?.bio ? (
                <p className='text-center'>{dataUser.bio}</p>
              ) : (
                <button className='btn-secondary px-3 py-1 mt-3'>
                  Add bio
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarProfile;
