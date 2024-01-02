import React from 'react'
import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'
const LoginPage = () => {

  return (
    <>
       <div className='flex justify-start'><Link href={'/'}>Back</Link></div>
   
    <div className='flex justify-center items-center p-10'>
      <LoginForm/>
      </div>
    </>
  )
}

export default LoginPage