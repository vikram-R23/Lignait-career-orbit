import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardMain = () => {
  const navigate = useNavigate();

  // --------------------------------
  // DASHBOARD STATE
  // --------------------------------
  const [userName, setUserName] = useState("Baskar");
  const [currentPhase, setCurrentPhase] = useState("Phase 2 – Foundations");
  const [phaseProgress, setPhaseProgress] = useState(35);
  const [aiInsight, setAiInsight] = useState("Completing 2 more tasks this week will keep you on track for your monthly goal. Consistency is key!");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! I am your AI Career Assistant. Need help with your roadmap or a quick mock interview?' }
  ]);
  const chatEndRef = useRef(null);

  // Placeholder for data fetching
  const fetchDashboardData = async () => {
    // Logic for backend/LLM connectivity goes here
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto-scroll Chat to bottom
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  // --------------------------------
  // NAVIGATION & HANDLERS
  // --------------------------------
  const handleContinuePhase = () => {
    navigate('/dashboard/roadmap');
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') {
      navigate('/dashboard/main'); 
    } else if (page === 'Resume') {
      navigate('/resume');
    } else if (page === 'Mentors') {
      navigate('/mentors');
    } else if (page === 'Mock Interview') {
      navigate('/mock-interview');
    } else if (page === 'LMS Courses') {
      navigate('/lms-courses');
    } else {
      navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add User Message
    const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");

    // Simulate AI Response
    setTimeout(() => {
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I'm analyzing your request regarding your career path..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    /* Main Wrapper */
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Space_Grotesk'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Internal Styles for Scrollbars & Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Dashboard Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #0A4F8F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* LEFT SIDEBAR */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20">
        
        {/* Sidebar Logo */}
        <div className="p-6 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">home</span>
            <span className="font-medium">Dashboard</span>
          </button>
          <button onClick={() => navigate('/dashboard/roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">map</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Career Roadmap</span>
          </button>
          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">groups</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Mentorship</span>
          </button>
          <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">description</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Resume</span>
          </button>
          <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">videocam</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Mock Interview</span>
          </button>
          <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">book</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">LMS Courses</span>
          </button>
          <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">code</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Practice Ground</span>
          </button>
          <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">settings</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Settings</span>
          </button>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-300">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="size-10 rounded-full bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">Baskar Manager</span>
              <span className="text-xs text-slate-600">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto relative z-10 bg-[#06457F]">
          {/* TOP HEADER */}
          <header className="h-20 flex items-center justify-between px-8 py-4 shrink-0 sticky top-0 bg-[#06457F]/95 backdrop-blur-sm z-30">
            <div className="w-full max-w-md">
              <label className="relative group block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D1D5DB] group-focus-within:text-[#0474C4] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#D1D5DB] focus:outline-none focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] transition-all shadow-sm" placeholder="Search roadmap, mentors, or tools..." type="text"/>
              </label>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-[#0474C4] rounded-full border border-[#06457F]"></span>
              </button>
            </div>
          </header>

          <div className="px-8 pb-12 flex flex-col gap-8">
            {/* GREETING */}
            <div className="mt-2">
              <h1 className="text-[32px] font-bold text-white mb-2 leading-tight tracking-tight">Good evening, {userName} 👋</h1>
              <p className="text-[#D1D5DB] text-lg font-normal">Here’s your current career progress</p>
            </div>

            {/* PHASE CARD */}
            <div className="bg-[#0A4F8F] rounded-xl p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#0474C4]/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-[#0474C4] text-white shadow-sm">Current Phase</span>
                    <span className="text-sm text-[#D1D5DB] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      On Track
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">{currentPhase}</h2>
                  <div className="w-full max-w-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#D1D5DB] font-medium">Phase Progress</span>
                      <span className="text-white font-bold">{phaseProgress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-[#0474C4] rounded-full shadow-[0_0_10px_rgba(4,116,196,0.5)] transition-all duration-500" style={{ width: `${phaseProgress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-2 p-3 rounded-lg bg-black/10 border border-white/5 max-w-xl backdrop-blur-sm">
                    <div className="bg-[#1E1E1E] p-2 rounded-lg border border-[#3A3A3A] shrink-0 text-[#0474C4] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">check_circle</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-wider font-semibold mb-0.5">Next Task</p>
                      <p className="text-white font-medium text-base">Update LinkedIn Headline & Summary</p>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 flex items-end">
                  <button onClick={handleContinuePhase} className="w-full sm:w-auto bg-[#0474C4] hover:bg-[#0360a3] text-white font-bold text-base px-8 py-3.5 rounded-lg shadow-lg shadow-[#0474C4]/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
                    <span>Continue Phase</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <section>
              <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-amber-400">bolt</span> Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* --- NEW BUTTON: View RoadMap --- */}
                {/* ------------------------------- */}

                <button onClick={() => navigate('/resume')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-violet-500/20 group-hover:bg-violet-500 group-hover:text-white text-violet-400 transition-colors duration-300 shadow-sm shadow-violet-500/10"><span className="material-symbols-outlined text-[28px]">edit_document</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-violet-200 transition-colors">Resume Builder</span><span className="text-sm text-violet-200/70 mt-1 block">Update your CV with AI</span></div>
                </button>
                <button onClick={() => navigate('/mentors')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white text-emerald-400 transition-colors duration-300 shadow-sm shadow-emerald-500/10"><span className="material-symbols-outlined text-[28px]">person_add</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-emerald-200 transition-colors">Book a Mentor</span><span className="text-sm text-emerald-200/70 mt-1 block">Get 1:1 guidance</span></div>
                </button>
                <button onClick={() => navigate('/mock-interview')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-orange-600/10 hover:bg-orange-600/20 border border-orange-500/20 hover:border-orange-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-orange-500/20 group-hover:bg-orange-500 group-hover:text-white text-orange-400 transition-colors duration-300 shadow-sm shadow-orange-500/10"><span className="material-symbols-outlined text-[28px]">video_camera_front</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-orange-200 transition-colors">Mock Interview</span><span className="text-sm text-orange-200/70 mt-1 block">Practice with AI</span></div>
                </button>
                <button onClick={() => navigate('/lms-courses')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 border border-pink-500/20 hover:border-pink-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-pink-500/20 group-hover:bg-pink-500 group-hover:text-white text-pink-400 transition-colors duration-300 shadow-sm shadow-pink-500/10"><span className="material-symbols-outlined text-[28px]">school</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-pink-200 transition-colors">Browse Courses</span><span className="text-sm text-pink-200/70 mt-1 block">Skill up today</span></div>
                </button>
                <button onClick={() => navigate('/dashboard/roadmap')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-blue-500/20 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-colors duration-300 shadow-sm shadow-blue-500/10"><span className="material-symbols-outlined text-[28px]">map</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-blue-200 transition-colors">View RoadMap</span><span className="text-sm text-blue-200/70 mt-1 block">Track your journey</span></div>
                </button>
              </div>
            </section>

            {/* RECENT ACTIVITY */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Recent Activity</h3>
              <div className="bg-[#0A4F8F]/30 rounded-xl border border-white/5 divide-y divide-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-full border border-cyan-500/30"><span className="material-symbols-outlined text-[20px]">check</span></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-cyan-100 group-hover:text-cyan-300 transition-colors">Completed "Self-Assessment Quiz"</p><p className="text-xs text-cyan-200/60 mt-0.5">Today, 10:23 AM</p></div>
                  <button className="text-[#D1D5DB] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="bg-amber-500/20 text-amber-400 p-2 rounded-full border border-amber-500/30"><span className="material-symbols-outlined text-[20px]">visibility</span></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-amber-100 group-hover:text-amber-300 transition-colors">Viewed "Backend Developer Roadmap"</p><p className="text-xs text-amber-200/60 mt-0.5">Yesterday</p></div>
                  <button className="text-[#D1D5DB] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="w-[360px] bg-[#A8C4EC] shrink-0 relative overflow-hidden hidden xl:flex flex-col border-l border-white/20">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 360 900" xmlns="http://www.w3.org/2000/svg">
              <path d="M-20,100 C100,250 200,-50 380,150" fill="none" opacity="0.4" stroke="#0474C4" strokeWidth="1.5"></path>
              <path d="M-20,300 C80,500 280,300 380,500" fill="none" opacity="0.3" stroke="#06457F" strokeWidth="1"></path>
              <circle cx="280" cy="120" fill="#0474C4" opacity="0.8" r="4"></circle>
            </svg>
          </div>
          <div className="relative z-10 p-8 flex flex-col h-full gap-8">
            <div className="flex items-center gap-2 text-[#06457F] mt-4">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Career Pulse</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><span className="material-symbols-outlined text-[48px] text-[#06457F]">psychology</span></div>
              <h4 className="text-[#06457F] font-bold text-xl mb-3 tracking-tight">AI Insight</h4>
              <p className="text-[#06457F] text-[15px] leading-relaxed font-medium opacity-90">"{aiInsight}"</p>
            </div>
            <div className="flex-1">
              <h5 className="text-[#06457F] font-bold text-xs uppercase tracking-widest mb-6 opacity-70">Upcoming Milestones</h5>
              <div className="relative pl-6 space-y-8 border-l-2 border-[#06457F]/10 ml-2">
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 size-4 bg-[#0474C4] rounded-full border-[3px] border-[#A8C4EC] shadow-sm"></div>
                  <p className="text-base font-bold text-[#06457F] tracking-tight">Mock Interview</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-[#06457F]/70 font-medium"><span className="material-symbols-outlined text-[16px]">calendar_month</span><span>Friday, 4:00 PM</span></div>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#06457F]/10 text-[#06457F] text-xs font-bold rounded">High Priority</span>
                </div>
                <div className="relative opacity-60">
                  <div className="absolute -left-[29px] top-1 size-4 bg-[#06457F] rounded-full border-[3px] border-[#A8C4EC]"></div>
                  <p className="text-base font-bold text-[#06457F] tracking-tight">Phase 2 Unlock</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-[#06457F]/70 font-medium"><span className="material-symbols-outlined text-[16px]">event</span><span>Est. Nov 12</span></div>
                </div>
              </div>
            </div>
            <div className="mt-auto mb-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#0474C4] to-[#06457F] text-white shadow-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] opacity-80 mt-0.5">format_quote</span>
                <p className="text-sm font-medium italic">"Success is not the key to happiness. Happiness is the key to success."</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ======================================================= */}
      {/* EXPANDABLE CHATBOT CART (EXACT MATCH) */}
      {/* ======================================================= */}
      <div 
        className={
            isExpanded 
            ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
            : "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-300"
        }
      >
        
        {/* Chat Interface Window */}
        {isChatOpen && (
            <div className={
                isExpanded
                ? "w-full max-w-5xl h-[85vh] bg-[#06457F] rounded-2xl border border-white/30 shadow-[0_0_50px_rgba(4,116,196,0.5)] flex flex-col overflow-hidden chat-animate"
                : "w-[380px] h-[550px] bg-[#06457F] rounded-2xl border border-white/20 ring-1 ring-cyan-500/40 shadow-2xl flex flex-col overflow-hidden chat-animate origin-bottom-right"
            }>
                {/* Header - Separate Color for 'Cart' feel */}
                <div className="p-4 bg-[#0B3D91] flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Professional Chatbot Icon in Header */}
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Career Assistant</h3>
                            <p className="text-white/60 text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* EXPAND/COLLAPSE BUTTON */}
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                            <span className="material-symbols-outlined text-[20px]">{isExpanded ? 'close_fullscreen' : 'open_in_full'}</span>
                        </button>
                        {/* CLOSE BUTTON */}
                        <button onClick={() => { setIsChatOpen(false); setIsExpanded(false); }} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 bg-[#06457F] overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-[#0474C4] text-white rounded-br-none' 
                                : 'bg-white/10 border border-white/10 text-white rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleChatSubmit} className="p-3 bg-[#0A4F8F] border-t border-white/10 flex gap-2 shrink-0">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything..." 
                        className="flex-1 bg-[#06457F] border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0474C4]"
                    />
                    <button type="submit" className="p-2 bg-[#0474C4] hover:bg-[#0360a3] text-white rounded-lg flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                </form>
            </div>
        )}

        {/* Toggle Button (FAB) - Hide when Expanded to avoid clutter */}
        {!isExpanded && (
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative z-50 ring-4 ring-cyan-500/20 border border-white/20"
            >
                {isChatOpen ? (
                    <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
                ) : (
                    <div className="relative">
                        {/* CUSTOM SVG ICON - Professional Robot Face */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                        </span>
                    </div>
                )}
            </button>
        )}
      </div>

    </div>
  );
};

export default DashboardMain;