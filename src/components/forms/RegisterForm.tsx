'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import isValidEmail from '@/util/isValidEmail';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {Divider,Input} from 'antd'

const Register: React.FC = () => {


  const { status} = useSession();
  const router = useRouter()
  if(status === 'authenticated') 
  {
      router.replace('/')
  }
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

     if (!name) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError('This email is already registered');
        setLoading(false);
      }
      if (res.status === 200) {
        setError('');
        router.push('/login');
        setLoading(false);
      }
    } catch (error) {
      setError('Error, try again');
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-2 border bg-white dark:bg-dark dark:border-0 p-8 rounded-lg w-[500px]'>
        <div className='flex gap-4 flex-col justify-center items-center w-full '>
          <h3 className='font-bold text-2xl dark:text-white'>Sign in</h3>
          <small className='dark:text-white text-black'>Sign in to your account</small>
          <div className='w-full flex justify-center items-center flex-col gap-2'>
            <button
              onClick={() => {
                signIn('google');
              }}
              className='p-2 border rounded-[20px] w-[80%] flex items-center gap-2 justify-center '>
              <FcGoogle /> <span className='text-primary'>Sign in with Google</span>
            </button>
            <button
              onClick={() => {
                signIn('github');
              }}
              className='p-2 border rounded-[20px] w-[80%]  flex items-center gap-2 justify-center'>
              <FaGithub />
              <span className='text-primary'>Sign in with Github</span>
            </button>
          </div>
          <Divider>
            <small className='dark:text-white text-black'>Or sign in with email</small>
          </Divider>
        </div>
        <div className='w-full p-4'>
          <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-2'>
            <div className='flex flex-col gap-2 w-full '>
              <label className='text-primary'>Username</label>
              <Input
                required
                size='large'
                className='w-3/2 rounded-full'
                type='text'
                placeholder='username'
              />
            </div>
            <div className='flex flex-col gap-2 w-full '>
              <label className='text-primary'>Email</label>
              <Input
                required
                size='large'
                className='w-3/2 rounded-full'
                type='email'
                placeholder='username@gmail.com'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-primary'>Password</label>
              <Input.Password
                required
                size='large'
                className='w-3/2 rounded-full'
                type='password'
                placeholder='*********'
              />
            </div>
            <p className='text-red-600 text-[16px] mb-4'>{error && error}</p>
            <button
              disabled={loading}
              type='submit'
              className='btn-primary w-full mt-2 transition'>
              {loading ? 'loading' : 'Register'}
            </button>
          </form>         
          <p className='text-center text-primary'>
            Alrealy account?  
            <Link
              className='text-link'
              href={'/login'}>
              Sign in here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};



export default Register;
