'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileForm from "@components/ProfileForm";

const UpdateProfile = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState({username: ""});

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await fetch(`/api/users/${userId}/profile`);
            const data = await res.json();
            setUsername({
                username: data.username,
            })
            
            console.log(data);
        }

        if(userId) getUserDetails();
    },[userId])

    const updateUser = async (e) =>{
        e.preventDefault();
        setSubmitting(true);

        if(!userId) return alert("User ID not found");

        // Call API and pass option param that conatins our post obj.
        try {
            const res = await fetch(`/api/users/${userId}/profile`, {
                method: 'PATCH',
                body: JSON.stringify({
                    username: username.username,
                })
            })

            if(res.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <ProfileForm 
        type="Edit"
        user={username}
        setUser={setUsername}
        submitting={submitting}
        handleSubmit={updateUser}
    />
  )
}

export default UpdateProfile