
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Trophy, Target, Zap, Headphones, MapPin, Star, AlertCircle } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { GuardianStats } from '../types';

const GuardianMode: React.FC = () => {
  const [stats, setStats] = useState<GuardianStats>({
    safetyScore: 92,
    currentXP: 2450,
    nextLevelXP: 3000,
    level: 14,
    focusMinutes: 120,
    badges: ['Smooth Operator', 'Night Owl Safe', 'Eco Warrior']
  });
  const [coaching, setCoaching] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const refreshCoaching = async () => {
    setLoading(true);
    const report = await gemini.getGuardianCoaching(stats);
    setCoaching(report);
    setLoading(false);
  };

  useEffect(() => {
    refreshCoaching();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-700">
      {/* Gamification Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-glass p-8 rounded-[2.5rem] flex flex-col justify-between border-l-8 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Level {stats.level} <span className="text-green-400 font-normal">Guardian Driver</span></h2>
              <p className="text-gray-500 mt-1 font-medium">You are in the top 5% of teen drivers this week! 🔥</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-white">{stats.currentXP} / {stats.nextLevelXP} XP</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">To Next Level</span>
            </div>
          </div>
          <div className="mt-8 w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-1000"
              style={{ width: `${(stats.currentXP / stats.nextLevelXP) * 100}%` }}
            />
          </div>
          <div className="mt-6 flex gap-4">
            {stats.badges.map(badge => (
              <div key={badge} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-24 h-24 rounded-full border-4 border-green-500/20 flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin duration-[3s]" />
            <span className="text-4xl font-black text-white">{stats.safetyScore}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Guardian Score</h3>
          <p className="text-xs text-gray-500">Based on last 500 miles</p>
          <button className="mt-6 text-xs font-bold text-green-400 hover:text-green-300 transition-colors uppercase tracking-widest flex items-center gap-1">
            View My Progress <Trophy size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Coaching */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-glass p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/20 rounded-2xl">
                  <Target className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Zenith Mentor Feed</h3>
                  <p className="text-sm text-gray-500">Live AI coaching generated for your style</p>
                </div>
              </div>
              <button 
                onClick={refreshCoaching}
                disabled={loading}
                className="p-2 hover:bg-white/5 rounded-xl transition-all"
              >
                <Zap size={20} className={loading ? 'animate-pulse text-yellow-500' : 'text-gray-500'} />
              </button>
            </div>

            {coaching ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative">
                   <div className="absolute -top-3 left-6 px-3 py-1 bg-green-500 text-black text-[10px] font-black rounded-full uppercase italic">Verdict</div>
                   <p className="text-lg font-medium text-white italic">"{coaching.safetyVerdict}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <p className="text-[10px] font-bold text-blue-400 uppercase mb-2 tracking-widest">Growth Tip</p>
                    <p className="text-sm text-gray-200">{coaching.coachingTip}</p>
                  </div>
                  <div className="p-5 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                    <p className="text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Next Challenge</p>
                    <p className="text-sm text-gray-200">{coaching.nextChallenge}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-500">
                Initializing Mentor Data...
              </div>
            )}
          </div>

          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass p-6 rounded-3xl flex items-center gap-4 hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="p-4 bg-blue-500/20 rounded-2xl">
                <Headphones className="text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">Acoustic Focus</h4>
                <p className="text-xs text-gray-500">Cabin noise optimized for driving</p>
              </div>
            </div>
            <div className="card-glass p-6 rounded-3xl flex items-center gap-4 hover:border-red-500/30 transition-all cursor-pointer">
              <div className="p-4 bg-red-500/20 rounded-2xl">
                <MapPin className="text-red-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">Guardian Routes</h4>
                <p className="text-xs text-gray-500">Avoiding high-accident junctions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="card-glass p-8 rounded-[2.5rem] border-t-4 border-yellow-500">
           <div className="flex items-center gap-3 mb-6">
             <AlertCircle className="text-yellow-500" />
             <h3 className="text-xl font-bold text-white">Live Hazard Scan</h3>
           </div>
           <div className="space-y-4">
             <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 animate-pulse">
               <p className="text-[10px] font-bold text-yellow-500 uppercase mb-1">Caution Zone</p>
               <p className="text-sm font-semibold text-white">Heavy traffic near School St.</p>
               <p className="text-xs text-gray-400 mt-1">Slowing autopilot threshold to 25mph.</p>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
               <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Schedule Sync</p>
               <p className="text-sm font-semibold text-white">Curfew Check: 10:00 PM</p>
               <p className="text-xs text-gray-400 mt-1">Suggesting return route by 9:35 PM.</p>
             </div>
           </div>
           <div className="mt-12 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl text-center border border-white/10">
              <ShieldCheck size={32} className="text-green-500 mx-auto mb-3" />
              <p className="text-xs font-bold text-white uppercase tracking-widest">Parental Sync Active</p>
              <p className="text-[10px] text-gray-500 mt-1 italic">Connected to: Sarah's iPhone</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianMode;
