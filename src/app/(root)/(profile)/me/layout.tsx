import LeftSideBarProfile from '@/components/LeftSideBarProfile';
import MenuHorizontal from '@/components/MenuHorizontal';
import { Inter } from 'next/font/google';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className}   min-h-screen relative`}>
      <div className='absolute left-0 w-[350px] border-r-[4px] hidden sm:block bg-transparent dark:border-[#000]  h-full'></div>
      <MenuHorizontal />
      <LeftSideBarProfile />
        {children}
    </div>
  );
};

export default ProfileLayout;
