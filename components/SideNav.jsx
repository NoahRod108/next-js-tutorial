'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { motion } from 'framer-motion'
import { fadeIn } from "../utils/motion"

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="sidebar_wrapper">
      <button 
        className="sidebar_btn"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        click
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
          <Image 
            src="/assets/images/logo.svg"
            alt="sdfsf"
            width={40}
            height={40}
            className="sidebar_logo"
          />
        </motion.div>

        <motion.ul 
          className="sidebar_list"
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          variants={fadeIn('up', 'spring', 0, 1)}
        >
          <li className="sidebar_item">
            <Link
              href="/"
              className="sidebar_link"
            >
              <span className="sidebar_name">Profile</span>
            </Link>
          </li>
          <li className="sidebar_item">
            <Link
              href="/"
              className="sidebar_link"
            >
              <span className="sidebar_name">Profile</span>
            </Link>
          </li>
        </motion.ul>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{once: true}}
          variants={fadeIn('up', 'spring', 0, 1)}
        >
          <button>sign out</button>
        </motion.div>
      </aside>
    </div>
  )
}

export default SideNav