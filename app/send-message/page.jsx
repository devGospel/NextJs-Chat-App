'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import styles from '../../styles/Chats.module.css'; // Import the CSS module

 const ChatGPTPage = () => {
 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');



  // Fetch messages for the particular user
  useEffect(() => {
    const fetchMessages = async () => {
      if (userId) {
        const res = await fetch(`/api/messages?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        }
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId,
        text: input,
      };

      // Optimistically update the UI
      setMessages([...messages, { ...newMessage, sender: 'user' }]);
      setInput('');

      const res = await fetch(`/api/messages/${id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
        
      });

      if (!res.ok) {
        console.error('Failed to send message');
      }

      // Simulate AI response (you can replace this with actual AI logic)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: 'This is a sample AI response.', receiverId: userId },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={styles.chatgptPage}>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.ai}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatGPTPage