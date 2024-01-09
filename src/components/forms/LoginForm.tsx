'use client';

import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import isValidEmail from '@/util/isValidEmail';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Divider, Input } from 'antd';

const LoginForm: React.FC = () => {
  const {  status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/')
    }
  }, [status]);

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
      <div className='flex flex-col justify-center items-center gap-2 border bg-white dark:bg-dark dark:border-0 p-8 rounded-lg w-[500px]'>
        <div className='flex gap-4 flex-col justify-center items-center w-full '>
          <h3 className='font-bold text-2xl dark:text-white'>Sign in</h3>
          <small className='dark:text-white text-black'>
            Sign in to your account
          </small>
          <div className='w-full flex justify-center items-center flex-col gap-2'>
            <button
              onClick={() => {
                signIn('google');
              }}
              className='p-2 border rounded-[20px] w-[80%] flex items-center gap-2 justify-center '>
              <FcGoogle />{' '}
              <span className='text-primary'>Sign in with Google</span>
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
            <small className='dark:text-white text-black'>
              Or sign in with email
            </small>
          </Divider>
        </div>
        <div className='w-full p-4'>
          <form
            onSubmit={handleSubmit}
            className='flex items-center justify-center flex-col gap-2'>
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
              {loading ? 'loading' : 'Sign up'}
            </button>
          </form>
          <div className='text-end mt-3 text-primary'>
            <Link href='#'>Forget password?</Link>
          </div>
          <p className='text-center text-primary'>
            Dont have account?
            <Link
              className='text-link'
              href={'/register'}>
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
