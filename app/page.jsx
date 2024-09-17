import React from 'react'
import Feed from '../components/Feed'


const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'> Connect & Chat
            <br className='max-md:hidden' />
            <span className='orange_gradient
            text-center'> Connect to the world
            </span>
        </h1>
        <p className='desc text-center'>
            This web chatter connects you to the world
            of your choice, family, loved ones & friends
        </p>

        <Feed/>
    </section>
  )
}

export default Home