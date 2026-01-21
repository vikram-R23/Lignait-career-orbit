import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // 1. DYNAMIC MESSAGE STATE
  const [messages, setMessages] = useState([]);

  // 2. INITIALIZE DATA & WELCOME MESSAGE
  useEffect(() => {
    let name = 'there';
    try {
      const step1Data = localStorage.getItem('onboarding_step1');
      if (step1Data) {
        const parsedData = JSON.parse(step1Data);
        name = parsedData.name ? parsedData.name.split(' ')[0] : 'there';
      }
    } catch (e) {
      console.error(e);
    }
    setUserName(name);

    // Initial AI Welcome Sequence
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: `👋 Hello ${name}! Your onboarding is complete. Welcome to Career Orbit.`
      },
      {
        id: 2,
        sender: 'ai',
        text: 'I’m here to guide you through your career journey — from building skills to preparing for interviews.'
      },
      {
        id: 3,
        sender: 'ai',
        text: 'Based on your inputs, I’ve set up your profile. How would you like to start?',
        isActionList: true // Custom flag to render the list view
      }
    ]);
  }, []);

  // 3. AUTO-SCROLL TO BOTTOM
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // ==========================================
  // DUMMY BACKEND / LLM LOGIC
  // ==========================================
  const mockLlmResponse = async (userText) => {
    // 1. Simulate Network Latency (1.5 - 2.5 seconds)
    const delay = Math.floor(Math.random() * 1000) + 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    const lowerInput = userText.toLowerCase();

    // 2. Dummy "Context Awareness" Logic
    if (lowerInput.includes('roadmap')) {
      return "I've generated a personalized roadmap for you based on your goal to become a Software Engineer. It starts with Advanced Data Structures. Would you like to view the first module?";
    }
    if (lowerInput.includes('interview')) {
      return "Great idea. Let's do a mock interview. Here is your first question: 'Tell me about a challenging project you worked on and how you overcame a technical blocker.'";
    }
    if (lowerInput.includes('coding') || lowerInput.includes('practice')) {
      return "I've queued up a 'Medium' difficulty LeetCode-style problem for you: 'Reverse a Linked List'. Shall we solve it together?";
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return `Hey again, ${userName}! Ready to accelerate your career?`;
    }
    
    // Default Fallback Response
    return "That sounds like a solid plan. I've updated your dashboard with relevant resources. Is there anything specific about that you'd like to explore?";
  };

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleSendMessage = async (e, overrideText = null) => {
    if (e) e.preventDefault();
    
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const newUserMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 2. Fetch AI Response (Simulated)
      const aiResponseText = await mockLlmResponse(textToSend);
      
      // 3. Add AI Message
      const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      console.error("LLM Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-[#06457F] text-white min-h-screen flex flex-col items-center font-display relative overflow-hidden">
      
      {/* LOGO - Fixed Top Left */}
      <div className="absolute top-6 left-8 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      {/* INJECTED STYLES */}
      <style>{`
        /* AI Bubble */
        .message-bubble-ai {
          background-color: rgba(4, 116, 196, 0.25);
          box-shadow: 0 0 10px rgba(4, 116, 196, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.2);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          position: relative;
          color: white;
        }
        .message-bubble-ai::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* User Bubble */
        .message-bubble-user {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #E2E8F0;
        }

        /* Scrollbar */
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        .chat-container::-webkit-scrollbar {
          width: 6px;
        }
        .chat-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        /* Animations */
        .suggestion-chip {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .suggestion-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(4, 116, 196, 0.4);
          border-color: rgba(255, 255, 255, 0.6);
        }
        .send-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
        
        /* Typing Dot Animation */
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
        .typing-dot { animation: blink 1.4s infinite both; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full flex flex-col items-center justify-center py-12 px-4 overflow-hidden relative z-10">
        
        <div className="mb-6 text-center">
          <h2 className="text-white/40 text-sm font-bold tracking-[0.3em] uppercase">Career Orbit</h2>
        </div>

        {/* Chat Interface Card */}
        <div className="w-full max-w-[800px] flex flex-col h-[85vh] bg-[#06457F]/50 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl">
          
          {/* Chat Header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-white/10 flex-shrink-0">
            <h1 className="text-white tracking-tight text-[32px] lg:text-[36px] font-bold leading-tight">Career Assistant</h1>
            <p className="text-[#D1D5DB] text-lg font-normal mt-2">Let’s plan your next steps.</p>
            <p className="text-[#8eb3cc] text-xs font-medium uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </p>
          </div>

          {/* Chat History */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto chat-container p-8 space-y-6">
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-4 max-w-[95%] sm:max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`
                  p-2.5 rounded-full shrink-0 flex items-center justify-center shadow-lg w-10 h-10
                  ${msg.sender === 'ai' ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-white/10'}
                `}>
                  <span className="material-symbols-outlined text-white text-[20px]">
                    {msg.sender === 'ai' ? 'auto_awesome' : 'person'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-1.5 items-start max-w-full">
                  <p className={`text-[12px] font-semibold ml-1 ${msg.sender === 'user' ? 'text-right w-full text-white/50' : 'text-[#8eb3cc]'}`}>
                    {msg.sender === 'ai' ? 'Assistant' : 'You'}
                  </p>
                  
                  <div className={`
                    text-[16px] font-normal leading-relaxed px-6 py-4
                    ${msg.sender === 'ai' ? 'message-bubble-ai rounded-2xl rounded-tl-none' : 'message-bubble-user rounded-2xl rounded-tr-none'}
                  `}>
                    {msg.text}
                    
                    {/* Render Action List Only for Specific AI Messages */}
                    {msg.isActionList && (
                      <div className="mt-4 flex flex-col gap-2">
                        <span className="flex items-center gap-2"><span className="text-lg">🧭</span> Explore your career roadmap</span>
                        <span className="flex items-center gap-2"><span className="text-lg">🎤</span> Try a mock interview</span>
                        <span className="flex items-center gap-2"><span className="text-lg">💻</span> Practice coding problems</span>
                        <span className="flex items-center gap-2"><span className="text-lg">📘</span> Start a recommended course</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-4 max-w-[88%]">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2.5 rounded-full shrink-0 flex items-center justify-center shadow-lg w-10 h-10">
                  <span className="material-symbols-outlined text-white text-[20px]">auto_awesome</span>
                </div>
                <div className="message-bubble-ai rounded-2xl rounded-tl-none px-6 py-4 flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
                  <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
                  <span className="w-2 h-2 bg-white rounded-full typing-dot"></span>
                </div>
              </div>
            )}

            {/* Suggestion Chips (Only show at bottom if last message was AI) */}
            {!isTyping && messages[messages.length - 1]?.sender === 'ai' && (
              <div className="flex flex-wrap gap-3 pt-2 px-2 sm:px-14">
                <button 
                  onClick={(e) => handleSendMessage(e, 'Show me my Career Roadmap')}
                  className="suggestion-chip px-5 py-2.5 bg-[#0474C4]/10 border border-[#0474C4]/40 rounded-full text-sm font-medium text-white"
                >
                   View My Roadmap
                </button>
                <button 
                  onClick={(e) => handleSendMessage(e, 'Start a mock interview')}
                  className="suggestion-chip px-5 py-2.5 bg-[#0474C4]/10 border border-[#0474C4]/40 rounded-full text-sm font-medium text-white"
                >
                   Start Mock Interview
                </button>
                <button 
                  onClick={(e) => handleSendMessage(e, 'I want to practice coding')}
                  className="suggestion-chip px-5 py-2.5 bg-[#0474C4]/10 border border-[#0474C4]/40 rounded-full text-sm font-medium text-white"
                >
                   Practice Coding
                </button>
                {/* NAVIGATION BUTTON UPDATED */}
                <button 
                  onClick={() => navigate('/dashboard/welcome')}
                  className="suggestion-chip px-6 py-2.5 bg-[#0474C4] text-white border border-[#0474C4]/40 rounded-full text-sm font-bold shadow-lg hover:bg-[#0474C4]/90"
                >
                   Go to Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-white/10 bg-[#06457F]/90 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-[#8eb3cc]/50 focus:outline-none focus:ring-2 focus:ring-[#0474C4]/50 focus:border-white/20 transition-all pr-16 shadow-inner" 
                placeholder="Ask me what to do next..." 
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="send-button absolute right-4 w-10 h-10 flex items-center justify-center bg-white text-[#121212] rounded-xl transition-all duration-200 disabled:opacity-50 disabled:scale-100"
              >
                <span className="material-symbols-outlined text-2xl font-bold">send</span>
              </button>
            </form>
            <p className="text-center text-[10px] text-[#8eb3cc]/40 mt-5 uppercase tracking-[0.3em] font-medium">
               Powered by Career Orbit AI
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 px-10 flex justify-center opacity-40">
        <p className="text-sm font-normal text-[#D1D5DB]">© 2026 Career Orbit Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatbotPage;