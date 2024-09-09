'use client'

import {useState, useEffect} from 'react'
import Prompt from '../models/prompt'
import {connectToDB} from '../utils/db'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
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

const Feed = async() => {

  const prompt = await Prompt.find()
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = ([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
       
      setPosts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section clasName='feed'>
      <form className="relative w-full flex-center">
        <input
          type='text'
          placeholder='Search for a tag or a username...'
          value={searchText}
          onChange={handleSearchChange}
        />
        
      </form>
      
      <PrompCardList
        data={posts}
        handleTagClick={() => {}}
       />
      
    </section>
  )
}

export default Feed