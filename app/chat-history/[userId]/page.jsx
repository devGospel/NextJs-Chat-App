'use client'

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SendMessage from '../../send-message/page'

const ChatHistory = () => {
  const router = useRouter();
  const params = useParams();
  const { userId } = params // Get userId from the URL
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Ensure userId is available before making the request
    if (userId) {
      // Fetch chat history for this user
      const fetchChatHistory = async () => {
        const response = await fetch(`/api/chat-history/${userId}/chats`);
        var data = await response.json();
        data = JSON.stringify(data)
        setChatHistory(data);
      };

      fetchChatHistory();
    }
  }, [userId]); // Re-run effect when userId becomes available

  if (!userId) {
    // Render a loading state until the userId is available
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Chat History with User {userId}</h1>
      <div className="chat-history-list">
       <SendMessage/>
      </div>
    </div>
  );
};

export default ChatHistory;
