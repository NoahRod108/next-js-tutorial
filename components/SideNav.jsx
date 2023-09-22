'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { motion } from 'framer-motion'
import { fadeIn } from "../utils/motion"

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();


  const sideBarLinks = [
    {link: "/", icon: "/assets/icons/home.svg", linkName: "Home"},
    {link: "/profile", icon: "/assets/icons/profile.svg", linkName: "Profile"},
  ]

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
                <div className="flex flex-col sidebar_hidden">
                  <p className="satoshi font-semibold">{session?.user.name}</p>
                  <p className="font-inter text-sm text-gray-500">{session?.user.email}</p>
                </div>
              </div>
            </div>
            
          ):(
            <Link href="/" className='flex gap-2 flex-center'>
              <Image src="/assets/images/myPost2.PNG" alt="MyPost Logo" width={60} height={60} className='object-contain' />
              <p className="logo_text">MyPost</p>
            </Link>
          )}
        </motion.div>

        <div className="sidebar_list">
          {session?.user ? (
            <motion.ul
              className="flex justify-center flex-col gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{once: true}}
              variants={fadeIn('up', 'spring', 0, 1)}
            >
              {sideBarLinks.map((item) =>(
                <li key={item.linkName}>
                  <Link href={item.link} className="sidebar_link">
                    <span className="mr-2"><Image src={item.icon} width={30} height={30}></Image></span><span className="sidebar_hidden">{item.linkName}</span>
                  </Link>
                </li>
              ))}
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
              <Link
                className="black_btn"
                href="/login"
              >
                Sign In
              </Link>
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
                  <button type='button' onClick={signOut} className='outline_btn w-full'>
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