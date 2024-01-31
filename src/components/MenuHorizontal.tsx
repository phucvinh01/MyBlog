'use client';;
import Link from 'next/link';
import { CiSaveDown2 } from 'react-icons/ci';
import { VscBrowser } from 'react-icons/vsc';
import ModalNewBlog from './ModalNewBlog';
const MenuHorizontal = () => {

  return (
    <div className='flex justify-start font-medium top-[100px] z-40 sticky'>
      <ul className='flex flex-col gap-[10px] h-[46px] shadow-2xl rounded-3xl bg-slate-50'>
        <li className={`px-[50px] py-[12px]  cursor-pointer hover:bg-slate-300 transition-transform rounded-3xl`}>
          <ModalNewBlog />
        </li>
        <li className={`px-[50px] py-[12px]  cursor-pointer hover:bg-slate-300 transition-transform rounded-3xl`}>
          <Link
            className={`flex items-center gap-3 `}
            href={'#'}>
            <VscBrowser />
            <p>All</p>
          </Link>
        </li>
        <li className={`px-[50px] py-[12px]  cursor-pointer hover:bg-slate-300 transition-transform rounded-3xl`}>
          <Link
           className={`flex items-center gap-3`}
            href={'#'}>
            <CiSaveDown2 />
            <p>Saved</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuHorizontal;
