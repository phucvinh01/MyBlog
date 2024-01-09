import { footerLink } from '@/constants';
import React from 'react'
import { PiCopyrightLight } from "react-icons/pi";
import Route from '../Route';
const Footer = () => {
  return (
    <div className='flex flex-col justify-between items-center py-6 px-4 text-gray-700 border-t text-sm sm:flex-row'>
        <div className='flex gap-1 items-center '>
            <PiCopyrightLight /> 2023 NextBlog. All rights reserved
        </div>
        <ul className='flex gap-3  lg:order-1'>
            {
                footerLink.map((item, index) => {
                    return(
                        <li key={index}>
                            <Route label={item.label} route={item.route} />
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Footer