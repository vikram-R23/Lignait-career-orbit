import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Career Orbit - Dashboard Welcome Page
 */
const DashboardWelcome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // --- FIXED CONFIGURATION ---
  const API_CONFIG = {
    apiBaseUrl: 'https://api.careerorbit.com/v1', 
    sessionId: 'temp-session-123',
    userId: 'user-default',
    llmProvider: 'gemini', 
  };

  const fetchUserCareerRoadmap = async () => {
    // Placeholder for future LLM API call
    console.log("Connecting to AI...");
    return new Promise((resolve) => setTimeout(resolve, 1500)); 
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await fetchUserCareerRoadmap();
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-display antialiased text-white">
      <div className="relative flex min-h-screen w-full flex-col bg-[#06457F] overflow-hidden justify-center items-center pb-32">
        
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0474C4] opacity-[0.25] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#A8C4EC] opacity-[0.1] blur-[100px] rounded-full"></div>
        </div>

        {/* --- TOP LEFT LOGO (ADDED) --- */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Orbit</span>
          </span>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="layout-container flex h-full w-full max-w-[640px] flex-col z-10 p-6 md:p-12">
          <div className="layout-content-container flex flex-col flex-1 justify-center items-center text-center">
            
            {/* CENTER LOGO & ORBIT ANIMATION */}
            <div className="mb-12 h-64 relative flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-[#A8C4EC]/20 absolute animate-[spin_20s_linear_infinite]"></div>
              <div className="w-48 h-48 rounded-full border border-[#A8C4EC]/40 absolute animate-[spin_15s_linear_infinite_reverse]" style={{ borderStyle: 'dashed' }}></div>
              
              <div className="w-32 h-32 rounded-full overflow-hidden relative border border-[#A8C4EC]/60 bg-white/10 flex items-center justify-center z-10 backdrop-blur-sm shadow-inner animate-logo-pulse">
                <span className="material-symbols-outlined text-white !text-[64px] drop-shadow-lg">
                  smart_toy
                </span>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <h1 className="text-white tracking-tight text-[32px] md:text-[48px] font-bold leading-[1.1] mb-4">
              Welcome to Career Orbit
            </h1>
            <p className="text-[#A8C4EC] text-lg md:text-xl font-normal leading-relaxed max-w-[480px] mb-12">
              Your AI-powered career guidance platform. We've analyzed your profile and calculated your trajectory.
            </p>

            {/* ACTION AREA */}
            <div className="w-full max-w-[320px]">
              <button 
                onClick={handleContinue}
                disabled={isLoading}
                className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-[#0474C4] text-white text-lg font-bold leading-normal tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,196,236,0.4)] hover:scale-[1.02] disabled:opacity-70"
              >
                <span className="truncate mr-2">
                  {isLoading ? 'Processing...' : 'Continue'}
                </span>
                {!isLoading && (
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[#A8C4EC]/70 text-sm">
                <span className="material-symbols-outlined !text-[16px]">lock</span>
                <span>Secure & Private Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(168, 196, 236, 0.1); 
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 45px rgba(168, 196, 236, 0.35); 
            transform: scale(1.03);
          }
        }
        .animate-logo-pulse {
          animation: pulse-glow 4s infinite ease-in-out;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}} />
    </div>
  );
};

export default DashboardWelcome;