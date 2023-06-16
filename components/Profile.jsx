import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEditProfile, handleEdit, handleDelete }) => {

  return (
    <section className="w-full">
        <h1 className="head_text text-left">
            <span className="blue_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left">{desc}</p>
        {handleEditProfile && (
            <div className='w-full mt-6'>
                <p className="outline_btn w-32 cursor-pointer text-left" onClick={handleEditProfile}>Edit Profile</p>
            </div>
        )}

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