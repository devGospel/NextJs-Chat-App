'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from '../../../styles/Chats.module.css';


const ChatHistory = () => {
  const router = useRouter();
  const params = useParams();
  const {data: session} = useSession()
  const { userId } = params; // Get userId from the URL
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const id = session?.user?.id


  useEffect(() => {
    // Ensure userId is available before making the request
    if (userId) {
      // Fetch chat history for this user
      const fetchMessages = async () => {
        const response = await fetch(`/api/chat-history/${id}/${userId}`);
        var data = await response.json();
    
        setMessages(data);
        
      };

      
    fetchMessages();
    }

  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        senderId: id,
        receiverId: userId,
        text: input,
      };

       // Optimistically update the UI
      setMessages([...messages, { ...newMessage, sender: 'user' }]);
      setInput('');
 
      try {
        const res = await fetch(`/api/messages/${userId}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!res.ok) {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Simulate AI response (you can replace this with actual AI logic)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: id, text: 'This is a sample AI response.', receiverId: userId },
        ]);
      }, 1000); 
    }
  };

  return (
    <div className={styles.chatgptPage}>
  
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Chat History with User {userId}</h1>
        <div className="chat-history-list">
          
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id}>{message.content} Hi</div>
            ))
          ) : (
            <p>No chat history available</p>
          )}

        </div>
      </div>


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
};

export default ChatHistory;
