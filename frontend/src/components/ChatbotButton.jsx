import React from 'react';

const ChatbotButton = () => {
  const handleChatClick = () => {
    console.log("Chat button clicked!");
    // Add your chatbot opening logic here
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center">
      {/* Curved "We Are Here!" text using SVG path - positioned closer to the purple circle */}
      <div className="mb-0">
        <svg width="130" height="30" viewBox="0 0 130 30">
          <path
            id="curve"
            d="M10,25 Q65,5 120,25"
            fill="transparent"
          />
          <text>
            <textPath
              xlinkHref="#curve"
              className="text-lg font-bold"
              startOffset="50%"
              textAnchor="middle"
              style={{
                fill: '#22d3ee',
                fontFamily: "'Comic Sans MS', cursive",
              }}
            >
              We Are Here!
            </textPath>
          </text>
        </svg>
      </div>
      {/* Clickable purple circle with message icon */}
      <button
        onClick={handleChatClick}
        className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center focus:outline-none hover:bg-purple-700 transition-colors mt-0"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatbotButton;