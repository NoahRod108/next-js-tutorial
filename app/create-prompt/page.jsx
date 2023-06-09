'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession(); //data: session is renaming data to session

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: "", tag: ""});

    const createPrompt = async (e) =>{
        e.preventDefault();

        setSubmitting(true);

        // Call API and pass option param that conatins our post obj.
        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id, // session? checks if user exists
                    tag: post.tag
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
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt