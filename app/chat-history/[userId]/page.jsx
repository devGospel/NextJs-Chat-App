'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from '../../../styles/Chats.module.css';

const ChatHistory = () => {
  const router = useRouter();
  const params = useParams();
  const { userId } = params; // Get userId from the URL
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const id = '66e95829088edfead5e2c5f2'; // Receiver ID (can be dynamic)

  useEffect(() => {
    // Ensure userId is available before making the request
    if (userId) {
      // Fetch chat history for this user
      const fetchChatHistory = async () => {
        try {
          const response = await fetch(`/api/chat-history/${userId}/chats`);
          
          // Check if the response is OK and not empty
          if (!response.ok) {
            console.error("Failed to fetch chat history");
            return;
          }

          const data = await response.json();
          if (data) {
            setChatHistory(data); // Directly set parsed JSON data
          } else {
            console.warn("No chat history data found");
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [userId]); // Re-run effect when userId becomes available

  if (!userId) {
    // Render a loading state until the userId is available
    return <p>Loading...</p>;
  }

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId: id,
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
          { sender: 'ai', text: 'This is a sample AI response.', receiverId: userId },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={styles.chatgptPage}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Chat History with User {userId}</h1>
        <div className="chat-history-list">
          {chatHistory.length ? (
            chatHistory.map((chat, index) => (
              <div key={index}>{chat.message}</div>
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
