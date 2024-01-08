import { Dot } from 'lucide-react'
import React from 'react'

const BlogCardHero = () => {
  return (
    <div className='flex gap-3 shadow-sm bg-white dark:bg-black p-2 rounded-xl'>
        <img
        className='w-[280px] h-[200px] rounded-lg object-cover'
        src='https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        <div className='flex gap-3 flex-col p-4 justify-center'>
            <p className='text-primary'>Health</p>
            <h3 className='h3'>
                Culinary Expeditions: Tasting the World's Flavors in the Heart of Local Culture
            </h3>
            <div className='flex gap-2'>
                <p className='text-muted'>By Ryna Kenter</p>
                <Dot color='#5c6a78'/>
                <p className='text-muted'>Aug 24 2023</p>
            </div>
        </div>
    </div>
  )
}

export default BlogCardHero