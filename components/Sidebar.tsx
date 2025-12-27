
import React from 'react';
import { LayoutDashboard, Zap, Map, Settings, Car, Bell, Sparkles, ShieldCheck, Moon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'zenith', icon: Sparkles, label: 'Zenith AI' },
    { id: 'noor', icon: Moon, label: 'Noor AI' },
    { id: 'guardian', icon: ShieldCheck, label: 'Guardian' },
    { id: 'efficiency', icon: Zap, label: 'Energy' },
    { id: 'maps', icon: Map, label: 'Charging' },
    { id: 'controls', icon: Car, label: 'Controls' },
  ];

  return (
    <div className="w-64 h-screen bg-[#0f1115] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 tesla-gradient rounded-lg flex items-center justify-center font-bold text-white text-xl">
          T
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">TeslaMind<span className="text-red-500">Pro</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className={
              item.id === 'zenith' ? 'text-blue-400 animate-pulse' : 
              item.id === 'noor' ? 'text-emerald-400' : 
              item.id === 'guardian' ? 'text-green-400' : ''
            } />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold border border-white/10">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">John Doe</p>
            <p className="text-xs text-emerald-500 truncate">Noor AI Synced</p>
          </div>
          <Bell size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
