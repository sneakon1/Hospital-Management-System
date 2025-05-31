import React, { useState } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import siri from '../../public/siri.gif';

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

  const sendMessage = async (message = null) => {
    if (!message && !input.trim()) return;

    const userInput = message ?? input;
    const lowerInput = userInput.toLowerCase().trim();

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Check predefined responses
    if (chatbotResponses[lowerInput]) {
      const botMessage = { sender: 'bot', text: chatbotResponses[lowerInput] };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    // Fallback to ML model
    const thinkingMessage = { sender: 'bot', text: 'Let me think...' };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5050/suggest_doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: userInput }),
      });

      const data = await response.json();

      const updatedMessages = messages.filter(msg => msg.text !== thinkingMessage.text);
      const botMessage = {
        sender: 'bot',
        text: `Based on your symptoms, you should consult a ${data.suggested_specialist}.`,
      };
      setMessages([...updatedMessages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: "Sorry, I couldn't connect to the suggestion engine.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error:", error);
    }
  };

  const toggleChat = () => setChatOpen(!chatOpen);

  return (
    <div>
      <img className='chatbot-toggle' src={siri} onClick={toggleChat} />

      {chatOpen && (
        <div className="chatbot">
          <div className="chat-window">
            {Object.keys(chatbotResponses).map((key, index) => (
              <div key={index} className='bot-response' onClick={() => sendMessage(key)}>
                {key}
              </div>
            ))}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
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
