
import { useState } from 'react';

export default function SendMessage() {
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Hello!' },
    { sender: 'ai', text: 'Hi there! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // Simulate AI response (replace this logic with your actual AI response handler)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: 'This is a sample AI response.' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatgpt-page">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user' : 'ai'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <style jsx>{`
        .chatgpt-page {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f8f9fa;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .chat-window {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
          overflow-y: auto;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .message {
          max-width: 60%;
          padding: 10px 15px;
          margin: 10px 0;
          border-radius: 15px;
          font-size: 14px;
        }

        .user {
          background-color: #dcf8c6; /* Light green for user */
          align-self: flex-end;
          text-align: right;
        }

        .ai {
          background-color: #ebebeb; /* Light grey for AI */
          align-self: flex-start;
          text-align: left;
        }

        .input-area {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .input-area input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 14px;
        }

        .input-area button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }

        .input-area button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
