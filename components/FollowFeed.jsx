'use client'

import { useState, useEffect } from "react";
import UserCard from './UserCard';

const FollowingList = ({ follows }) => {
    return (
        <div className="mt-16 prompt_layout">
            {follows.map((follower) => (
                <UserCard
                    user={follower}
                />
            ))}
        </div>
    )
}

const FollowFeed = ({ user }) => {
    const [follows, setFollows] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const fetchFollows = async () => {
        const res = await fetch(`/api/users/${user}/profile`);
        const data = await res.json();

        setFollows(data.following);
        setUserInfo(data);
    }


    useEffect(() => {
        fetchFollows();
    }, []);

  return (
    <section className="feed">
        <FollowingList
            follows={follows}
        />
    </section>
  )
}

export default FollowFeed