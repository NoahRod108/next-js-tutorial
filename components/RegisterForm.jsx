import Link from "next/link"

const RegisterForm = ({ handleSubmit, registerUser, setRegisterUser, submitting }) => {
  return (
    <section className="feed">
      <h1 className="head_text text-left"><span className="blue_gradient">Register</span></h1>
      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
        <input
          type="text" 
          placeholder='username'
          required className="form_input"
          value={registerUser.username} 
          onChange={(e) => setRegisterUser({...registerUser, username: e.target.value})}
         />
        <input 
          type="text" 
          placeholder='email' 
          required className="form_input"
          value={registerUser.email} 
          onChange={(e) => setRegisterUser({...registerUser, email: e.target.value})}
        />
        <input 
          type="text"
          placeholder='password'
          required className="form_input"
          value={registerUser.password} 
          onChange={(e) => setRegisterUser({...registerUser, password: e.target.value})}
        />

        <button className="black_btn my-4">Register</button>
      </form>

      <Link href="/login" className="mt-4 hover:text-primary-purple">Login with an existing account</Link>
    </section>
  )
}

export default RegisterForm