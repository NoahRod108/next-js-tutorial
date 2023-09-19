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
  const [follows, setFollows] = useState([]);

  const fetchFollows = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/profile`);
    const data = await res.json();

    setFollows(data.following);
  }

  const handleFollowingClick = () => {
    // Route to see your following
    if(data[0].creator._id === session?.user.id) return router.push(`/following/${session?.user.id}`);

    // Route to view other users following
    return router.push(`/following/${data[0].creator._id}`);
}

  useEffect(() => {
      const setUpProviders = async () => {
          const res = await getProviders();

          setProviders(res);
      }

      if(session?.user.id) fetchFollows();

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
            <div>
              <div className="flex justify-center items-center gap-4">            
                <Link href="/profile">
                  <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt='profile'
                  />
                </Link>
                <p className="satoshi font-semibold sidebar_hidden">{session?.user.name}</p>
              </div>

              <div className="flex mt-4 sidebar_hidden">
                <p className="text-gray-500 cursor-pointer hover:text-primary-purple">
                    <span onClick={handleFollowingClick}>
                        {follows?.length} Following
                    </span>
                </p>
              </div>
            </div>
            
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
                <Link href="/profile" className="sidebar_link">
                  <span className="sidebar_hidden">Profile</span>
                </Link>
              </li>
              <li>
                {/* Make a drop down -- TODO -- */}
                <Link
                  href="/"
                  className="sidebar_link"
                >
                  <span className="sidebar_hidden">Settings</span> 
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