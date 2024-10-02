'use client'

import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

let socket;

const Socket = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])

    useEffect(()=> {
        socketInitialize()

    }, [])


    async function socketInitialize() {
        await fetch('api/socket')
        socket = io();

        socket.on('receive-message', (data) => { 
        //  console.log(data)

         setAllMessages((pre) => [...pre, data])
        });
    }

    function handleSubmit(e) { 
        e.preventDefault()

        socket.emit('send-message', {
            username,
            message
        })
    }
  return (
    <div>
        <h1><b>CHATTER</b></h1>

        <p>Enter your username</p>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

    {allMessages.map(({username, message}) => {
        <p> {username}: {message}    </p>
    })}
      {!!username && (  <div>
            <form onSubmit={handleSubmit}>
                <input name='message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button className='black_btn'> Send</button>
            </form>
        </div>)}
    </div>
  )
}

export default Socket