
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ZenithAI from './components/ZenithAI';
import GuardianMode from './components/GuardianMode';
import NoorAI from './components/NoorAI';
import AIChat from './components/AIChat';
import { Bot, Zap, Maximize2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex bg-[#0f1115] min-h-screen text-gray-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-[60]">
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors duration-500 ${
              activeTab === 'noor' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
              activeTab === 'guardian' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
              'bg-red-500/10 text-red-500 border-red-500/20'
            }`}>
              {activeTab === 'noor' ? 'Noor AI Guidance Active' : 
               activeTab === 'guardian' ? 'Zenith Guardian Online' : 
               'Neural Connectivity Active'}
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="text-xs text-gray-500 font-medium">Model S Plaid • Zenith & Noor v2.5</div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                showChat 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Bot size={18} />
              AI Assistant
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="relative z-10">
          {showChat ? <AIChat /> : (
            <>
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'zenith' && <ZenithAI />}
              {activeTab === 'guardian' && <GuardianMode />}
              {activeTab === 'noor' && <NoorAI />}
              {activeTab === 'efficiency' && (
                <div className="p-8 flex items-center justify-center h-[calc(100vh-100px)] flex-col text-center">
                  <Zap size={64} className="text-red-500/20 mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-2">Energy Analytics</h2>
                  <p className="text-gray-500 max-w-md">Detailed energy breakdown and charging history coming soon in the v2.0 update.</p>
                </div>
              )}
              {activeTab === 'maps' && (
                <div className="p-8 flex items-center justify-center h-[calc(100vh-100px)] flex-col text-center">
                  <Maximize2 size={64} className="text-blue-500/20 mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-2">Supercharger Network</h2>
                  <p className="text-gray-500 max-w-md">Real-time stall availability and route planning is being optimized.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Ambient background glow */}
        <div className={`fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-50 z-0 transition-colors duration-1000 ${
          activeTab === 'noor' ? 'bg-emerald-900/10' : 'bg-red-900/10'
        }`} />
        <div className={`fixed top-1/4 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-30 z-0 transition-colors duration-1000 ${
          activeTab === 'noor' ? 'bg-emerald-900/5' : 'bg-blue-900/5'
        }`} />
      </main>
    </div>
  );
};

export default App;
