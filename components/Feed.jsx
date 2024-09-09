'use client'

import {useState, useEffect} from 'react'
import Prompt from '../models/prompt'
import {connectToDB} from '../utils/db'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      
    </div>
  )
} 

const Feed = async() => {

  const prompt = await Prompt.find()
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (e) => {

  }

  useEffect(() => {

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
       />
      
    </section>
  )
}

export default Feed