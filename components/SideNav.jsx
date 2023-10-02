'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { motion } from 'framer-motion'
import { fadeIn } from "../utils/motion"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();

  const toggleDarkMode = (e) => {
    e.preventDefault();

    if(dark) setDark(false);
    if(!dark) setDark(true);

    console.log(dark)
  }

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
                    src={!session.user.image ? '/assets/images/userImg.svg' : session?.user.image}
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
              <p className="logo_text sidebar_hidden">MyPost</p>
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
          className='flex flex-col gap-3 md:gap-5'
        >
          {session?.user && (
              <div>
                  <button type='button' onClick={signOut} className='outline_btn w-full'>
                      Sign Out
                  </button>
              </div>
          )}

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Settings
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        id="toggleDark"
                        onClick={toggleDarkMode}
                        className=""
                      >
                        In Development
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </motion.div>
      </aside>
    </div>
  )
}

export default SideNav