import React, { useState } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

const chatbotResponses = {
  "hello": "Hi there! How can I help you today?",
  "how to book an appointment": "Go to the 'Book Appointment' section and choose your doctor and time.",
  "clinic hours": "Our clinic operates from 9 AM to 5 PM, Monday to Saturday.",
  "emergency": "In case of emergency, please call our helpline: 123-456-7890.",
  "bye": "Goodbye! Take care.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botReplyText =
      chatbotResponses[input.toLowerCase()] || "I'm sorry, I didn't understand that.";
    const botMessage = { sender: 'bot', text: botReplyText };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div>
      <button className="chatbot-toggle" onClick={toggleChat}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </button>

      {chatOpen && (
        <div className="chatbot">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Ask me something..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
