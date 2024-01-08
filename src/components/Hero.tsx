import Image from 'next/image';
import React from 'react';
import heroImg from '../../public/hero.jpg';
import { Dot } from 'lucide-react';
import BlogCardHero from './BlogCardHero';

const Hero = () => {
  return (
    <div className='bg-[#F9FAFB] dark:bg-slate-600 rounded-b-[80px]  p-10'>
      <section className='p-2 bg-white dark:bg-black rounded-lg flex gap-4 shadow-sm'>
        <Image
          src={heroImg}
          alt='hero.img'
          width={570}
          height={340}
          className='rounded-xl min-h-[400px] object-center'
        />
        <div className='p-10 flex gap-4 flex-col'>
          <p className='text-primary'>New</p>
          <h2 className='h2'>
            Begin here to obtain a brief summary encompassing all the essential
          </h2>
          <desc className='text-muted'>
            In a world filled with constant noise and distractions, the allure
            of a simpler lifestyle beckons like a soothing whisper. As we
            navigate the complexities of modern living, there's an increasing
            desire to strip away the unnecessary and embrace a life of
            authenticity, intention, and balance.
          </desc>
          <div className='flex gap-4'>
            <img
              className='w-[24px] h-[24px] rounded-full object-cover'
              src='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            />
            <p className='text-muted'>Ryna Kenter</p>
            <Dot
              className='text-muted'
              color='#5c6a78'
            />
            <p className='text-muted'>Aug 24 2023</p>
          </div>
        </div>
      </section>

      <section className='mt-5 flex gap-5 '>
        <div className='flex gap-11'>
          <BlogCardHero />
          <BlogCardHero />
        </div>
      </section>
    </div>
  );
};

export default Hero;
