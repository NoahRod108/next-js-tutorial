'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);
    const userName = searchParams.get("name");

    const handleFollow = async () =>{
        // try {
        //     const res = await fetch('/api/prompt/new', {
        //         method: 'PATCH',
        //         body: JSON.stringify({
        //             follows: post.prompt,
        //         })
        //     })

        //     if(res.ok){
        //         router.push('/')
        //     }
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setSubmitting(false);
        // }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();

            setPosts(data);
        }

        const fetchFollows = async () => {
            const res = await fetch(`/api/users/${params?.id}/profile`);
            const data = await res.json();

            setFollows(data.follows);
        }

        if(params?.id) fetchPosts();
        if(params?.id) fetchFollows();
    }, []);

  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s profile.`}
        data={posts}
        follows={follows}
        handleFollow={handleFollow}
    />
  )
}

export default UserProfile