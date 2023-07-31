import FollowFeed from '@components/FollowFeed';

const myFollowingPage = ({ params }) => {
  return (
    <section className='w-full flex-center flex-col'>
        <FollowFeed 
            user={params?.id}
        />
    </section>
  )
}

export default myFollowingPage