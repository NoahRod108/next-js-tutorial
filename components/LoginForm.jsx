import { signIn } from 'next-auth/react'
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast'

const LoginForm = ({ handleSubmit, user, setUser }) => {
  return (
    <section className="feed">
      <h1 className="head_text text-left"><span className="blue_gradient">Login</span></h1>
      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
        <div className="font-inter text-sm text-gray-500">
          <h3 className="mb-2">Guest Account:</h3>
          <p>Email: user1@gmail.com</p>
          <p>Password: P@ssw0rd</p>
        </div>
        <input 
          type="text"
          placeholder='email' 
          required className="form_input"
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})}
        />
        <input 
          type="text"
          placeholder='password'
          required className="form_input"
          value={user.password} 
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <button className="black_btn my-4">Login</button>
        <Toaster />
      </form>

      <div className='flex justify-between w-full max-w-2xl mt-4'>
        <button className='hover:text-primary-purple' onClick={() => signIn("google")}>Login with Google</button>
        <Link className='hover:text-primary-purple' href="/register">Register A New Account</Link>
      </div>
    </section>
  )
}

export default LoginForm