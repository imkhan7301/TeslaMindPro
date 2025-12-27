
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Trash2 } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await gemini.chat(input, history);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'Sorry, I couldn\'t process that.',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] card-glass rounded-[2.5rem] overflow-hidden m-8 border border-white/10 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#1a1d23] to-transparent pointer-events-none z-10" />
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 tesla-gradient rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">TeslaMind AI</h3>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Operational
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth z-0"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto">
            <Bot size={48} className="text-red-500/30 mb-4" />
            <h4 className="text-white font-bold text-lg mb-2">How can I assist you?</h4>
            <p className="text-gray-500 text-sm">Ask about your car's range, battery health, or latest updates.</p>
            <div className="grid grid-cols-1 gap-2 mt-8 w-full">
              {["How's my battery health?", "Optimize my next trip", "Latest software features"].map((q) => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all text-left"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${m.role === 'user' ? 'bg-red-500' : 'bg-gray-800'}`}>
                {m.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-red-500 text-white rounded-tr-none' 
                  : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-gray-800 shrink-0">
              <Bot size={18} className="text-white" />
            </div>
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-[#1a1d23]/50">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask TeslaMind AI..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 tesla-gradient rounded-xl text-white transition-all shadow-lg shadow-red-500/20 active:scale-95 ${(!input.trim() || isLoading) ? 'opacity-50' : 'hover:scale-105'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
