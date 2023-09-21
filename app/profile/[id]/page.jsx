'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const userName = searchParams.get("name");

    const handleFollow = async (e) =>{
        e.preventDefault();

        if(!params.id) return alert("User ID not found");

        // Call API and pass option param that conatins our post obj.
        try {
            const res = await fetch(`/api/users/${params?.id}/follows`, {
                method: 'PATCH',
                body: JSON.stringify({
                    following: session?.user.id,
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();

            setPosts(data);
        }

        if(params?.id) fetchPosts();
    }, []);

  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s profile.`}
        data={posts}
        handleFollow={handleFollow}
    />
  )
}

export default UserProfile