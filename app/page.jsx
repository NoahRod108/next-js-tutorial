import Feed from '@components/Feed';

const page = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Post Your Thoughts
            <br />
            <span className='orange_gradient text-center'>User Created Posts</span>
        </h1>
        <p className='desc text-center'>
            Simple post website to practice Next.js, React, and Tailwind. This project was built from JavaScript Mastery's YouTube video. I repurposed and added new features to that starting project.
        </p>
        
        <Feed />
    </section>
  )
}

export default page