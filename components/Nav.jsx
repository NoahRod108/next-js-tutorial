'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const res = await getProviders();

            setProviders(res);
        }

        setUpProviders();
    }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-6">
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src="/assets/images/myPost2.PNG" alt="MyPost Logo" width={90} height={90} className='object-contain' />
            <p className="logo_text">MyPost</p>
        </Link>

        {/* Desktop nav */}
        <div className="md:flex hidden">
          {session?.user && (
              <div className='flex gap-3 md:gap-5'>
                  <Link href="/create-prompt" className='black_btn'>
                      Create Post
                  </Link>
              </div>
          )}
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full cursor-pointer'
                        alt='profile'
                        onClick={() => setToggleDropdown((prev) => !prev)} //Never good to directly change state. Use previous in another callback function
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link 
                                href="/profile"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link 
                                href="/create-prompt"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ): (
                <>
                  <Link
                    className="black_btn"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav