'use client'

import { useState } from 'react';
import LoginForm from '@components/LoginForm';
import { signIn, useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";

const Login = () => {
const router = useRouter();
const { data: session } = useSession();
const [loginUser, setLoginUser] = useState({email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn("credentials", { email: loginUser.email, password: loginUser.password })
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