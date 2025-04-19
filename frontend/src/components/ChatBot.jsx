import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const ChatBot = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestedResponse, setShowSuggestedResponse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  // Initialize Socket.IO only once
  useEffect(() => {
    console.log('Initializing Socket.IO with backendUrl:', backendUrl);
    socketRef.current = io(backendUrl, {
      query: { token },
      reconnection: true,
      reconnectionAttempts: 3,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO connected');
    });

    socketRef.current.on('chatResponse', ({ question, answer, timestamp }) => {
      console.log('Received chatResponse:', { question, answer, timestamp });
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: question, timestamp },
        { type: 'bot', content: answer, timestamp },
      ]);
      setIsLoading(false);
      setShowSuggestedResponse(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      toast.error('Chatbot connection failed');
    });

    return () => {
      socketRef.current.off('chatResponse');
      socketRef.current.off('connect');
      socketRef.current.off('connect_error');
      socketRef.current.disconnect();
    };
  }, [backendUrl, token]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  // Join user room
  useEffect(() => {
    if (token && userData?._id && socketRef.current) {
      console.log('Joining room for user:', userData._id);
      socketRef.current.emit('joinRoom', userData._id);
    }
  }, [token, userData]);

  // Toggle chatbot
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle suggested response click
  const handleSuggestedResponse = (response) => {
    console.log('Sending suggested response:', response);
    setUserInput(response);
    sendMessage(response);
    setShowSuggestedResponse(false);
  };

  // Send message
  const sendMessage = async (messageToSend = userInput) => {
    if (messageToSend.trim() === '' || !token) {
      if (!token) toast.error('Please log in to use the chatbot');
      return;
    }

    console.log('Sending message:', messageToSend);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          userId: userData._id,
          message: messageToSend,
          history: messages.map((msg) => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetch response:', data);
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
      setIsLoading(false);
      setShowSuggestedResponse(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div key="chatbot" className="fixed right-4 bottom-4 z-50 flex flex-col items-center">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 transition-all duration-300 ease-in-out">
          <div className="bg-purple-600 p-3 text-white flex justify-between items-center">
            <h3 className="font-semibold text-base">Healthcare Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto max-h-80 bg-gray-100 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {showSuggestedResponse && messages.length === 1 && !isLoading && (
              <div className="flex justify-start space-x-2">
                <button
                  onClick={() => handleSuggestedResponse('Hello')}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition text-sm"
                >
                  Hello
                </button>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <span className="flex items-center">
                    <span className="animate-bounce h-2 w-2 bg-gray-600 rounded-full mr-1"></span>
                    <span className="animate-bounce h-2 w-2 bg-gray-600 rounded-full mr-1" style={{ animationDelay: '0.2s' }}></span>
                    <span className="animate-bounce h-2 w-2 bg-gray-600 rounded-full" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-gray-200 p-2 bg-white">
            <div className="flex items-center space-x-2">
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 resize-none transition-all"
                rows="1"
              />
              <button
                onClick={() => sendMessage()}
                disabled={userInput.trim() === '' || isLoading}
                className={`p-2 rounded-full ${
                  userInput.trim() === '' || isLoading ? 'bg-gray-300 text-gray-500' : 'bg-purple-600 text-white hover:bg-purple-700'
                } transition-all`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`mb-2 transition-transform duration-300 ${isHovering ? 'scale-110' : ''}`}>
        <svg width="130" height="30" viewBox="0 0 130 30">
          <path id="curve" d="M10,25 Q65,5 120,25" fill="transparent" />
          <text>
            <textPath
              xlinkHref="#curve"
              className={`text-base font-bold font-comic-sans transition-colors duration-300 ${isHovering ? 'fill-cyan-300' : 'fill-cyan-400'}`}
              startOffset="50%"
              textAnchor="middle"
            >
              We Are Here!
            </textPath>
          </text>
        </svg>
      </div>
      <button
        onClick={toggleChat}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`bg-purple-600 rounded-full w-14 h-14 flex items-center justify-center transition duration-300 ${
          isHovering ? 'bg-purple-700 shadow-lg scale-110 rotate-12' : 'shadow-md'
        } focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none`}
      >
        <svg
          className={`w-7 h-7 text-white transition-transform duration-300 ${isHovering ? 'scale-110' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatBot;