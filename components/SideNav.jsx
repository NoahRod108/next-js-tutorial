'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { motion } from 'framer-motion'
import { fadeIn } from "../utils/motion"

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
      const setUpProviders = async () => {
          const res = await getProviders();

          setProviders(res);
      }

      setUpProviders();
  }, [])
  
  return (
    <div className="sidebar_wrapper">
      <button 
        className="sidebar_btn"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <Image src="/assets/icons/left-arrow.svg" alt="left-arrow" width={20} height={20} className='object-contain' />
      </button>

      <aside 
        className="sidebar min-h-screen" 
        data-collapse={collapsed}
      >
        <motion.div 
          className="sidebar_top"
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          variants={fadeIn('up', 'spring', 0, 1)}
        >
          {session?.user ? (
            <Link href="/profile">
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          ):(
            <Link href="/" className='flex gap-2 flex-center'>
              <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className='object-contain' />
              <p className="logo_text">Postopia</p>
            </Link>
          )}
        </motion.div>

        <div className="sidebar_list">
          {session?.user ? (
            <motion.ul
              className="flex flex-col gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{once: true}}
              variants={fadeIn('up', 'spring', 0, 1)}
            >
              <li>
                <Link
                  href="/"
                  className="sidebar_link"
                >
                  <span className="sidebar_name">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="sidebar_link"
                >
                  <span className="sidebar_name">Profile</span>
                </Link>
              </li>
            </motion.ul>
          ):(
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button 
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                  >
                      Sign In
                  </button>
                ))
              }
            </>
          )}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          variants={fadeIn('up', 'spring', 0, 1)}
        >
          {session?.user && (
              <div className='flex gap-3 md:gap-5'>
                  <button type='button' onClick={signOut} className='outline_btn'>
                      Sign Out
                  </button>
              </div>
          )}
        </motion.div>
      </aside>
    </div>
  )
}

export default SideNav