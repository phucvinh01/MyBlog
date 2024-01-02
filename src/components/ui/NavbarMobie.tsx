import React, { useState } from 'react';
import {Modal } from 'antd';
import { RxHamburgerMenu } from "react-icons/rx";
import { LuAlignJustify } from "react-icons/lu";
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/content/ThemeProvider';
import Route from './Route';
const NavbarMobie = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {theme} = useTheme()
 const pathname = usePathname()
  return (
    <div className='lg:hidden flex item'>
      <button     onClick={showModal} className='text-2xl p-0 m-0'>
        {theme === 'light' ? <RxHamburgerMenu  /> : <div style={{color:"white"}}><LuAlignJustify  /></div>}
      </button>
      <Modal footer={null}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <div
              className='justify-between items-center w-full '
              id='mobile-menu-2'>
              <ul className='flex flex-col mt-4 font-medium justify-center items-center'>
                {
                  navLinks.map((item, index) => {
                   
                    return (
                      <li className='py-4 text-xl' key={index}>
                        <Route label={item.label} route={item.route}  onClick={handleCancel}></Route>
                      </li>
                    )
                  })
                }               
              </ul>
            </div>
      </Modal>
    </div>
  );
};
export default NavbarMobie;