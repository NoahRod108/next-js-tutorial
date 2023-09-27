'use client'

import { useState } from 'react';
import LoginForm from '@components/LoginForm';
import { signIn, useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
const router = useRouter();
const { data: session } = useSession();
const [loginUser, setLoginUser] = useState({email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginCredentials = {
      email: loginUser.email,
      password: loginUser.password,
      redirect: false
    }

    const login = await signIn("credentials", loginCredentials)

    if(login.error){
      toast('Login failed. Please check your email or password.')
    }
  }

  if(session?.user) router.push('/');

  return (
    <LoginForm
      user={loginUser}
      setUser={setLoginUser}
      handleSubmit={handleSubmit}
    />
  )
}

export default Login