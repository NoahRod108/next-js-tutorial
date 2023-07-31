'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PromptCard from "./PromptCard";
import Image from 'next/image';

const Profile = ({ name, desc, data, follows, handleEditProfile, handleEdit, handleDelete, handleFollow }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleFollowingClick = () => {
        // Route to see your following
        if(data[0].creator._id === session?.user.id) return router.push(`/following/${session?.user.id}`);

        // Route to view other users following
        return router.push(`/following/${data[0].creator._id}`);
    }

  return (
    <section className="w-full">
        <h1 className="head_text text-left">
            <span className="blue_gradient">
                {name} Profile
                {handleFollow &&
                    <Image src="/assets/icons/follow.svg" alt="Follow Button" width={30} height={30} className='object-contain mt-4 cursor-pointer hover:scale-110' onClick={handleFollow}/>
                }
            </span>
        </h1>
        <p className="desc text-left">{desc}</p>
        <div className='w-full mt-6 flex justify-between'>
            {handleEditProfile && (
                    <p className="outline_btn w-32 cursor-pointer text-left" onClick={handleEditProfile}>Edit Profile</p>
            )}
            <div className="flex">
                <p className="text-lg text-gray-600 sm:text-xl max-w-2xl cursor-pointer hover:underline">
                    <span onClick={handleFollowingClick}>
                        {follows?.length} Following
                    </span>
                </p>
            </div>
        </div>


        <div className="mt-10 prompt_layout">
            {data.length > 0 ? data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
            )) :
            (
                <div className="flex items-center justify-center h-screen">
                    <p className="font-inter ">No prompts listed.</p>
                </div>
            )}
        </div>
    </section>
  )
}

export default Profile