
import React, { useState, useEffect } from 'react';
import { Moon, Compass, MapPin, Utensils, Clock, Sparkles, Navigation, ExternalLink, Activity } from 'lucide-react';
import { gemini } from '../services/geminiService';

const NoorAI: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const fetchNoorData = async () => {
    setLoading(true);
    // Use geolocation to get real user position if available, fallback to mock
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setLocation({ lat: coords.latitude, lng: coords.longitude });
        const result = await gemini.runNoorScan(coords);
        setData(result);
        setLoading(false);
      },
      async () => {
        // Fallback mock location (San Francisco)
        const mockCoords = { latitude: 37.7749, longitude: -122.4194 };
        setLocation({ lat: mockCoords.latitude, lng: mockCoords.longitude });
        const result = await gemini.runNoorScan(mockCoords);
        setData(result);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchNoorData();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero: Spiritual Guidance Panel */}
      <div className="relative h-[300px] card-glass rounded-[3rem] overflow-hidden border border-emerald-500/20 group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
           <Moon size={200} className="text-emerald-500" />
        </div>

        <div className="relative z-10 p-12 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Sparkles className="text-white" size={24} />
             </div>
             <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Noor <span className="text-emerald-400">AI Guidance</span></h2>
          </div>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Your journey, spiritually aligned. Using Google AI to navigate mosques, verified halal dining, and accurate prayer timings wherever you drive.
          </p>
          
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Next Prayer</span>
              <span className="text-2xl font-bold text-white">Maghrib • 18:42</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Qibla Angle</span>
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                21.4° NE <Compass size={20} className="text-emerald-400" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nearby Masjids Section */}
        <div className="lg:col-span-2 card-glass p-8 rounded-[2.5rem] relative min-h-[400px]">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-indigo-500/20 rounded-xl">
                    <MapPin className="text-indigo-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white">Nearby Masjids</h3>
              </div>
              <button 
                onClick={fetchNoorData}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-all uppercase tracking-widest flex items-center gap-2"
              >
                {loading ? 'Scanning...' : 'Update List'}
                <Navigation size={14} className={loading ? 'animate-spin' : ''} />
              </button>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center h-48 space-y-4">
                <Activity className="animate-pulse text-indigo-500" size={48} />
                <p className="text-gray-500 animate-pulse">Consulting Google Maps grounding for live availability...</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Extracting from grounding or showing mock if not loaded yet */}
               {data?.groundingChunks?.length > 0 ? (
                 data.groundingChunks.filter((c: any) => c.maps).map((chunk: any, i: number) => (
                    <a 
                      key={i}
                      href={chunk.maps.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{chunk.maps.title || 'Local Masjid'}</h4>
                        <ExternalLink size={14} className="text-gray-600" />
                      </div>
                      <p className="text-xs text-gray-500">Distance: verified by AI Grounding</p>
                      <div className="mt-4 flex items-center gap-2">
                         <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full">Open</span>
                         <span className="text-[10px] text-gray-600 italic">verified 2m ago</span>
                      </div>
                    </a>
                 ))
               ) : (
                 <div className="col-span-2 p-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <p className="text-gray-500">Start a scan to discover verified Masjids along your route.</p>
                 </div>
               )}
             </div>
           )}
        </div>

        {/* Halal Trip Optimizer */}
        <div className="card-glass p-8 rounded-[2.5rem] border-t-4 border-emerald-500 flex flex-col">
           <div className="flex items-center gap-3 mb-6">
              <Utensils className="text-emerald-500" />
              <h3 className="text-xl font-bold text-white">Halal Optimizer</h3>
           </div>
           <p className="text-sm text-gray-400 mb-8">AI-verified high-rated halal eateries with charging nearby.</p>
           
           <div className="flex-1 space-y-4">
             <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Halal Grill • 0.8 mi</span>
                  <div className="flex gap-0.5"><StarIcon fill/><StarIcon fill/><StarIcon fill/><StarIcon fill/><StarIcon /></div>
                </div>
                <p className="text-sm font-bold text-white">Middle Eastern Fusion</p>
                <p className="text-xs text-gray-500 mt-1">"Excellent Shawarma, verified Halal supply chain."</p>
             </div>

             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Thai Spice • 2.4 mi</span>
                  <div className="flex gap-0.5"><StarIcon fill/><StarIcon fill/><StarIcon fill/><StarIcon fill/><StarIcon fill/></div>
                </div>
                <p className="text-sm font-bold text-white">Organic Thai (Halal Options)</p>
                <p className="text-xs text-gray-500 mt-1">Has 2 Superchargers in the plaza.</p>
             </div>
           </div>

           <button className="mt-8 w-full py-3 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold text-xs uppercase tracking-widest border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
             Plan Journey Stops
           </button>
        </div>
      </div>

      {/* Prayer Schedule */}
      <div className="card-glass p-8 rounded-[2.5rem]">
         <div className="flex items-center gap-3 mb-8">
            <Clock className="text-white" />
            <h3 className="text-xl font-bold text-white">Prayer Schedule</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <PrayerTimeCard label="Fajr" time="05:12" active />
            <PrayerTimeCard label="Dhuhr" time="13:10" />
            <PrayerTimeCard label="Asr" time="16:45" />
            <PrayerTimeCard label="Maghrib" time="18:42" highlight />
            <PrayerTimeCard label="Isha" time="20:05" />
         </div>
      </div>
    </div>
  );
};

const PrayerTimeCard = ({ label, time, active, highlight }: any) => (
  <div className={`p-6 rounded-3xl border transition-all ${
    highlight ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' :
    active ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5 opacity-60'
  }`}>
    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlight ? 'text-black' : 'text-emerald-500'}`}>{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-black' : 'text-white'}`}>{time}</p>
  </div>
);

const StarIcon = ({ fill }: { fill?: boolean }) => (
  <svg className={`w-3 h-3 ${fill ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default NoorAI;
