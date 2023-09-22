'use client'

import RegisterForm from '@components/RegisterForm';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [registerUser, setRegisterUser] = useState({username: "", email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: registerUser.username,
          email: registerUser.email,
          password: registerUser.password
        })
      });

      if(res.ok){
        router.push('/login?success=Account has been created!')
      }else{
        console.log(res)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RegisterForm
      registerUser={registerUser}
      setRegisterUser={setRegisterUser}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  )
}

export default page