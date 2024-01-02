'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import isValidEmail from '@/util/isValidEmail';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {Divider,Input} from 'antd'

const LoginForm: React.FC = () => {


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
    const email = e.target[0].value;
    const password = e.target[1].value;

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

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      json: true,
      body: JSON.stringify({ email, password }),
    });

    if (!res) {
      setError('Invalid email or password');
    } else {
      setError('');
      router.replace('/');
    }
    setLoading(false);
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-2 border bg-white p-8 rounded-lg w-[500px]'>
        <div className='flex gap-4 flex-col justify-center items-center w-full'>
          <h3 className='font-bold text-2xl'>Sign in</h3>
          <small className='text-secondary'>Sign in to your account</small>
          <div className='w-full flex justify-center items-center flex-col gap-1'>
            <button
              onClick={() => {
                signIn('google');
              }}
              className='px-2 py-1 border rounded-[20px] w-[80%] flex items-center gap-1 justify-center'>
              <FcGoogle /> <span>Sign in with Google</span>
            </button>
            <button
              onClick={() => {
                signIn('github');
              }}
              className='px-2 py-1 border rounded-[20px] w-[80%]  flex items-center gap-1 justify-center'>
              <FaGithub />
              <span>Sign in with Github</span>
            </button>
          </div>
          <Divider>
            <small className='text-secondary'>Or sign in with email</small>
          </Divider>
        </div>
        <div className='w-full p-4'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 w-full'>
              <label>Email</label>
              <Input
                required
                size='large'
                className='w-3/2'
                type='email'
                placeholder='username@gmail.com'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <Input.Password
                required
                size='large'
                className='w-3/2'
                type='password'
                placeholder='*********'
              />
            </div>
            <p className='text-red-600 text-[16px] mb-4'>{error && error}</p>
            <button
              disabled={loading}
              type='submit'
              className='btn-dark w-full mt-2 transition'>
              {loading ? 'loading' : 'Sign up'}
            </button>
          </form>
          <div className='text-end mt-3'>
            <Link href='#'>Forget password?</Link>
          </div>
          <p className='text-center text-primary text-base'>
            Dont have account?
            <Link
              className='font-bold'
              href={'/signup'}>
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};



export default LoginForm;
