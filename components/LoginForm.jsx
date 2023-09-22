import { signIn } from 'next-auth/react'

const LoginForm = ({ handleSubmit, user, setUser }) => {
  return (
    <section className="w-full flex-start flex-col ">
      <h1 className="head_text text-left"><span className="blue_gradient">Login</span></h1>
      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
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
      </form>

      <button onClick={() => signIn("google")}>Login with Google</button>
    </section>
  )
}

export default LoginForm