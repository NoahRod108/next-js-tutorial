'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();

            setPosts(data);
        }

        const fetchFollows = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/profile`);
            const data = await res.json();

            setFollows(data.follows);
        }

        if(session?.user.id) fetchPosts();
        if(session?.user.id) fetchFollows();
    }, [session]);

    const handleEdit = (post) =>{
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleEditProfile = () =>{
        router.push(`/update-profile?id=${session?.user.id}`);
    }

    const handleDelete = async (post) =>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });
                
                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <Profile 
        name="My"
        desc="Welcome to your profile page."
        data={posts}
        follows={follows}
        handleEdit={handleEdit}
        handleEditProfile={handleEditProfile}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile