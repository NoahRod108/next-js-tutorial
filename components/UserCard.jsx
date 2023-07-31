'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserCard = ({ user }) => {
    const router = useRouter();
    const [follower, setFollower] = useState([]);

    const fetchFollower = async () => {
        const res = await fetch(`/api/users/${user}/profile`);
        const data = await res.json();

        setFollower(data);
    }

    useEffect(() => {
        fetchFollower();
    }, []);

    const handleProfileClick = () => {
        router.push(`/profile/${follower._id}?name=${follower.username}`);
    }

  return (
    <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
                <Image 
                    src={follower.image}
                    alt="user_image"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />

                <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-900">{follower.username}</h3>
                    <p className="font-inter text-sm text-gray-500">{follower.email}</p>
                </div>
            </div>          
        </div>
    </div>
  )
}

export default UserCard