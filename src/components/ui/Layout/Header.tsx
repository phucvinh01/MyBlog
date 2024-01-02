'use client';
import { FiSun } from 'react-icons/fi';
import { FaRegMoon } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import { navLinks } from '@/constants';
import Image from 'next/image';
import light from '/public/next.svg';
import dark from '/public/vercel.svg';
import { useSession } from 'next-auth/react';
import Route from '../Route';
import ModalSearch from '@/components/ModalSearch';
import DisplayUser from '@/components/DisplayUser';
import NavbarMobie from '@/components/ui/NavbarMobie';
import { useTheme } from '@/content/ThemeProvider';
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { data: session , status} = useSession();
  return (
    <>
     
        <header className='top-0 z-40 sticky'>
          <nav className='bg-white border-gray-200 px-4 lg:px-6 dark:bg-dark py-3 sticky'>
            <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
              <Link
                href='/'
                className='flex items-center'>
                {theme === 'light' ? (
                  <Image
                    loading='lazy'
                    width={80}
                    src={light}
                    alt='Logo'
                    priority={false}
                    placeholder='empty'
                  />
                ) : (
                  <Image
                    loading='lazy'
                    width={80}
                    src={dark}
                    alt='Logo'
                    priority={false}
                    placeholder='empty'
                  />
                )}
              </Link>
              <div className='flex gap-16 items-center justify-between'>
                <div
                  className='hidden justify-between items-center w-full lg:flex lg:w-auto '
                  id='mobile-menu-2'>
                  <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                    {navLinks.map((item, index) => {            
                      return (
                        <React.Fragment key={index}>
                          <Route
                            label={item.label}
                            route={item.route}
                           ></Route>
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
                <div className='flex gap-4 items-center'>
                  <ModalSearch />

                  {!session?.accessToken ? (
                    <>
                      <Link
                        prefetch={false}
                        href='/login'
                        className='btn-primary dark:text-white'>
                        Đăng nhập
                      </Link>
                    </>
                  ) : (
                    <>
                      <DisplayUser session={session} status={status} />
                    </>
                  )}

                  <div className='flex gap-3 items-center justify-center '>
                    {theme === 'light' ? (
                      <button className='btn-primary-rounded' onClick={() => toggleTheme()}>
                        <FiSun  />
                      </button>
                    ) : (
                      <button
                      className='btn-primary-rounded'
                        onClick={() => toggleTheme()}>
                        <FaRegMoon />
                      </button>
                    )}
                    <NavbarMobie />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
     
    </>
  );
};

export default Header;
