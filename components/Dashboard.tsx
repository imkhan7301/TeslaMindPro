
import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  Navigation, 
  Lock, 
  Unlock, 
  Thermometer, 
  CloudRain, 
  Zap, 
  Activity, 
  TrendingUp,
  Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_VEHICLE_STATS, MOCK_ENERGY_HISTORY } from '../constants.tsx';
import { gemini } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(MOCK_VEHICLE_STATS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const insights = await gemini.analyzeEfficiency(MOCK_ENERGY_HISTORY);
    setAiInsights(insights);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Vehicle Status</h2>
          <p className="text-gray-400">Everything is looking optimal today.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
            <Lock size={18} className="text-red-500" />
            <span className="font-medium">Lock Doors</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
            <Navigation size={18} className="text-blue-400" />
            <span className="font-medium">Send Address</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-glass p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Battery size={64} className="text-green-500" />
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">State of Charge</p>
          <h3 className="text-4xl font-bold text-white mb-4">{stats.batteryLevel}%</h3>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
              style={{ width: `${stats.batteryLevel}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-gray-500 flex items-center gap-1">
            <TrendingUp size={12} className="text-green-500" />
            +2.4% from yesterday
          </p>
        </div>

        <div className="card-glass p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Activity size={64} className="text-blue-500" />
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Est. Range</p>
          <h3 className="text-4xl font-bold text-white mb-2">{stats.estimatedRange} <span className="text-xl font-normal text-gray-500">mi</span></h3>
          <p className="text-xs text-blue-400 font-medium">Ideal: 312 mi</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-500">Efficiency</span>
            <span className="text-xs font-bold text-white">94%</span>
          </div>
        </div>

        <div className="card-glass p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Thermometer size={64} className="text-orange-500" />
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Cabin Temp</p>
          <h3 className="text-4xl font-bold text-white mb-4">{stats.temperature}°C</h3>
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 bg-red-500/20 text-red-500 rounded-lg text-xs font-bold border border-red-500/30 hover:bg-red-500/30 transition-all">Heat</button>
            <button className="flex-1 py-1.5 bg-blue-500/20 text-blue-500 rounded-lg text-xs font-bold border border-blue-500/30 hover:bg-blue-500/30 transition-all">Cool</button>
          </div>
        </div>

        <div className="card-glass p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <CloudRain size={64} className="text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Odometer</p>
          <h3 className="text-4xl font-bold text-white mb-2">{stats.odometer.toLocaleString()} <span className="text-xl font-normal text-gray-500">mi</span></h3>
          <p className="text-xs text-gray-500">Last trip: 14.2 mi</p>
          <div className="mt-6">
            <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 card-glass p-8 rounded-[2.5rem] relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-white">Energy Consumption</h4>
              <p className="text-sm text-gray-500">Average Wh/mi over last 24 hours</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ENERGY_HISTORY}>
                <defs>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e31937" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e31937" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4a5568" fontSize={12} tickLine={false} axisLine={false} unit=" Wh" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1d23', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="consumption" stroke="#e31937" strokeWidth={3} fillOpacity={1} fill="url(#colorCons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="card-glass p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 tesla-gradient rounded-xl shadow-lg shadow-red-500/20">
              <Brain size={24} className="text-white" />
            </div>
            <h4 className="text-xl font-bold text-white">Gemini Insights</h4>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{insight.title}</p>
                    <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{insight.impact}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{insight.description}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-sm text-gray-500 mb-6">Let Gemini analyze your driving behavior to unlock hidden performance gains.</p>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full py-3 tesla-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'shadow-xl shadow-red-500/20'}`}
                >
                  {isAnalyzing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap size={18} />
                      Run AI Analysis
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
