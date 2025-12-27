
import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, Activity, ShieldAlert, Cpu, Database, ChevronRight } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { MOCK_VEHICLE_STATS } from '../constants';

const ZenithAI: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(s => s === 1 ? 1.05 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    const result = await gemini.runZenithScan(MOCK_VEHICLE_STATS);
    setScanResult(result);
    setIsScanning(false);
  };

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Hero Visualizer */}
      <div className="relative h-[400px] card-glass rounded-[3rem] flex flex-col items-center justify-center overflow-hidden border border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        
        {/* Animated Neural Pulse */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className="w-48 h-48 rounded-full flex items-center justify-center transition-all duration-[2000ms] ease-in-out relative"
            style={{ 
              transform: `scale(${pulseScale})`,
              background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' 
            }}
          >
            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-20" />
            <div className="absolute inset-2 rounded-full border border-blue-400/50 animate-pulse opacity-40" />
            <div className="w-32 h-32 tesla-gradient rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(227,25,55,0.4)]">
              <Sparkles size={48} className="text-white animate-pulse" />
            </div>
          </div>
          
          <h2 className="mt-8 text-4xl font-black text-white tracking-tighter uppercase italic">
            Zenith <span className="text-blue-400">Digital Twin</span>
          </h2>
          <p className="text-blue-300/60 font-medium tracking-widest text-xs uppercase mt-2">
            Neural Synchronicity: {isScanning ? 'Synchronizing...' : (scanResult ? 'Operational' : 'Ready')}
          </p>
        </div>

        {!scanResult && !isScanning && (
          <button 
            onClick={startScan}
            className="mt-10 px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 z-20"
          >
            <Cpu size={20} />
            Initialize Neural Deep Scan
          </button>
        )}

        {isScanning && (
          <div className="mt-10 flex items-center gap-4 text-blue-400 z-20">
            <Activity className="animate-spin" />
            <span className="font-bold tracking-widest text-sm">ANALYZING ACOUSTIC HARMONICS...</span>
          </div>
        )}
      </div>

      {scanResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Zenith Score */}
          <div className="card-glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center border-t-4 border-blue-500">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Zenith Readiness Score</p>
            <div className="text-7xl font-black text-white mb-2">{scanResult.zenithScore}</div>
            <div className="text-sm font-bold text-blue-400 uppercase">Optimal Sync</div>
            <div className="w-full mt-8 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Hardware Integrity</span>
                <span className="text-white">98%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '98%' }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Contextual Safety</span>
                <span className="text-white">94%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
          </div>

          {/* Acoustic Analysis */}
          <div className="card-glass p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Radio size={120} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Radio className="text-blue-400" />
              <h3 className="text-xl font-bold text-white">Acoustic Fingerprint</h3>
            </div>
            <p className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-tighter">Status: {scanResult.acousticHealth.status}</p>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {scanResult.acousticHealth.analysis}
            </p>
            <div className="space-y-2">
              {scanResult.acousticHealth.anomalies.map((a: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                  <Activity size={12} className="text-blue-500" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Intelligence */}
          <div className="card-glass p-8 rounded-[2.5rem] border-t-4 border-red-500">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-red-500" />
              <h3 className="text-xl font-bold text-white">Contextual Intelligence</h3>
            </div>
            <div className="space-y-4">
              {scanResult.contextualInsights.map((insight: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-red-500/20 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{insight.category}</span>
                    <ChevronRight size={14} className="text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{insight.insight}</p>
                  <p className="text-xs text-gray-400">{insight.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZenithAI;
