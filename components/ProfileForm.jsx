import React from 'react'
import Link from 'next/link'

const ProfileForm = ({ type, user, setUser, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
            <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Username</span>

                    <input 
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="username"
                        required
                        className="form_input"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500" text-sm>
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
    </section>
  )
}

export default ProfileForm