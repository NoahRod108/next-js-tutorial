'use client'

import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import LoginForm from '@components/LoginForm';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [loginUser, setLoginUser] = useState({email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn("credentials", { email: loginUser.email, password: loginUser.password })
  }

  return (
    <LoginForm
      user={loginUser}
      setUser={setLoginUser}
      handleSubmit={handleSubmit}
    />
  )
}

export default Login