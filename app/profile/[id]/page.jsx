'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);
    const userName = searchParams.get("name")

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();

            setPosts(data);
        }

        const fetchFollows = async () => {
            const res = await fetch(`/api/users/${params?.id}/profile`);
            const data = await res.json();

            setFollows(data);
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
    />
  )
}

export default UserProfile