import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const navigate = useNavigate();

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Need to reschedule a session or check your upcoming bookings?' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        console.log("System Ready: API initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchAvailability();
  }, []);

  // Auto-scroll Chat
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setTimeout(() => {
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I can help with that. Let me check the schedule..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <div className="bg-[#A8C4EC] text-[#0F172A] font-['Space_Grotesk'] overflow-hidden antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #A8C4EC; }
        ::-webkit-scrollbar-thumb { background: #06457F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #04325e; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        .booking-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .booking-card:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(4, 116, 196, 0.3); }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="relative flex h-screen w-full flex-row overflow-hidden">
        
        {/* --- SIDEBAR (Synced with Mentor Module) --- */}
        <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20">
          {/* UPDATED LOGO */}
          <div className="p-6 flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0F172A]">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
            </span>
          </div>

          <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button onClick={() => navigate('/dashboard/roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">map</span>
              <span className="font-medium">Career Roadmap</span>
            </button>

            <button onClick={() => navigate('/mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">groups</span>
              <span className="font-medium">Mentorship</span>
            </button>
            
            <button onClick={() => navigate('/resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">description</span>
              <span className="font-medium">Resume</span>
            </button>

            <button onClick={() => navigate('/mock-interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">videocam</span>
              <span className="font-medium">Mock Interview</span>
            </button>

            {/* Active state logic for My Bookings */}
            <button onClick={() => navigate('/my-bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
              <span className="material-symbols-outlined fill">calendar_month</span>
              <span className="font-medium">My Booking</span>
            </button>

            <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">book</span>
              <span className="font-medium">LMS Courses</span>
            </button>

            <button onClick={() => navigate('/practice-ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">code</span>
              <span className="font-medium">Practice Ground</span>
            </button>

            <button onClick={() => navigate('/settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-300">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="size-10 rounded-full bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-slate-900 truncate">Baskar Manager</span>
                <span className="text-xs text-slate-600 truncate">Pro Member</span>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#06457F]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,116,196,0.1),transparent)] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-8 py-12">
            <div className="mb-10">
              <h2 className="text-white text-4xl font-bold mb-2 tracking-tight">My Bookings</h2>
              <p className="text-[#D1D5DB] text-lg">Keep track of your scheduled mentor interviews and sessions.</p>
            </div>

            <div className="flex items-center gap-8 border-b border-white/10 mb-10">
              <button className="pb-4 text-white font-semibold border-b-2 border-[#0474C4] relative">Upcoming</button>
              <button className="pb-4 text-[#D1D5DB] hover:text-white transition-colors font-medium border-b-2 border-transparent">Past</button>
              <button className="pb-4 text-[#D1D5DB] hover:text-white transition-colors font-medium border-b-2 border-transparent">Cancelled</button>
            </div>

            <div className="space-y-6">
              {/* Booking Card 1 */}
              <div className="booking-card bg-[#262B40] rounded-2xl p-6 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-16">
                  <div className="flex flex-col w-56">
                    <h4 className="font-bold text-white text-lg">Yogesh Malhotra</h4>
                    <span className="text-xs text-[#0474C4] font-bold uppercase tracking-wider">Senior Mentor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-widest mb-1">Date & Time</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0474C4] text-lg">calendar_today</span>
                        <span className="font-medium text-white">Oct 24, 2026</span>
                        <span className="text-[#D1D5DB] mx-1">•</span>
                        <span className="font-medium text-white">11:30 AM IST</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-widest mb-1">Session Mode</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0474C4] text-lg">videocam</span>
                        <span className="font-medium text-white">Mentor Mock Interview</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="px-3 py-1 rounded-full border border-[#0474C4]/30 text-[#0474C4] text-xs font-bold uppercase tracking-widest bg-[#0474C4]/5">Scheduled</span>
                  <div className="flex items-center gap-6">
                    <button className="text-[#D1D5DB] hover:text-white text-sm font-medium transition-colors">Reschedule</button>
                    <button className="bg-[#0474C4] hover:bg-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#0474C4]/20 text-white">Join Session</button>
                  </div>
                </div>
              </div>

              {/* Booking Card 2 */}
              <div className="booking-card bg-[#262B40] rounded-2xl p-6 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-16">
                  <div className="flex flex-col w-56">
                    <h4 className="font-bold text-white text-lg">Sarah Jenkins</h4>
                    <span className="text-xs text-[#0474C4] font-bold uppercase tracking-wider">Career Coach</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-widest mb-1">Date & Time</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0474C4] text-lg">calendar_today</span>
                        <span className="font-medium text-white">Oct 28, 2026</span>
                        <span className="text-[#D1D5DB] mx-1">•</span>
                        <span className="font-medium text-white">04:00 PM IST</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-widest mb-1">Session Mode</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0474C4] text-lg">person</span>
                        <span className="font-medium text-white">Resume Strategy Review</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="px-3 py-1 rounded-full border border-[#0474C4]/30 text-[#0474C4] text-xs font-bold uppercase tracking-widest bg-[#0474C4]/5">Scheduled</span>
                  <div className="flex items-center gap-6">
                    <button className="text-[#D1D5DB] hover:text-white text-sm font-medium transition-colors">Reschedule</button>
                    <button className="bg-[#0474C4] hover:bg-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#0474C4]/20 text-white">Join Session</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
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

export default MyBookings;