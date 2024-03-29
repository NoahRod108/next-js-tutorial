'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="flex flex-col mt-16 gap-4 lg:w-1/2 w-full">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await fetch('/api/prompt');
        const data = await res.json();

        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    
    // Search
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchResults(searchResult);
            }, 500)
        );
    }

    // Filter prompts
    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i");

        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        )
    }

    // Click tag
    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchResults(searchResult);
    }

  return (
    <section className="feed">
        <form className="relative w-full flex-center">
          <input 
              type="text"
              placeholder="Search for a tag or username"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="search_input peer"
          />
        </form>

        {searchText ? (
            <PromptCardList
                data={searchResults}
                handleTagClick={handleTagClick}
            />
        ) :
        (
            <PromptCardList
                data={posts}
                handleTagClick={handleTagClick}
            />
        )}
    </section>
  )
}

export default Feed