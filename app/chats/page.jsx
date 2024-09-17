'use client'

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const Chats = () => {

    const {data: session} = useSession()
    const [users, setUsers] = useState([])
    const router = useRouter()

useEffect(() => {
    const fetchUsers = async () => {
        const response = await fetch(`/api/chat`);
        const data = await response.json();
    
        setUsers(data);
      }

      if(session?.user.id) fetchUsers();
}, [])

  return (
<div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6">Chats</h1>
  <div className="users-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.length > 0 ? (
      users.map((user) => (
        <div key={user._id} className="user-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold">{user.username}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">No Chats available</p>
    )}
  </div>
</div>

  )
}

export default Chats