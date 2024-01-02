import MenuHorizontal from '@/components/MenuHorizontal'
import { Inter } from 'next/font/google';
import React from 'react'
const inter = Inter({ subsets: ['latin'] });
const ProfileLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <div className={`${inter.className}`}>
        <MenuHorizontal/>
        {children}
        </div>
  )
}

export default ProfileLayout