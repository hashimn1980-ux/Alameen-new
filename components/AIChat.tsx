import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BrainCircuit, Building2 } from 'lucide-react';
import { generateDesignAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome. I am the Strategy Architect. I can calculate your operational drag or discuss liquidity structures. What is your current challenge?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateDesignAdvice(
        `Context: You are the AI assistant for Al Ameen Al Majali's personal brand website. 
         Tone: High-stakes real estate strategy, precise, architectural, authoritative.
         Topics: Tokenization, Multi-Agent Systems (MAS), Margin Recovery, Real Estate Development in Dubai.
         User Query: ${userMessage.text}`
      );
      setMessages(prev => [
        ...prev, 
        { role: 'model', text: responseText }
      ]);
    } catch (error) {
       setMessages(prev => [
        ...prev, 
        { role: 'model', text: "Connection to the strategic core interrupted. Please retry." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 p-4 bg-[#C5A059] text-black rounded-none shadow-lg hover:bg-white transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.05 }}
      >
        <Building2 size={24} />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-full max-w-md h-[600px] bg-[#0A192F] border border-[#1e293b] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1e293b] flex justify-between items-center bg-[#050b14]">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-[#C5A059]" size={20} />
                <span className="font-bold text-white tracking-widest text-xs uppercase">Strategic Core</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#C5A059] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050505]/90">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'bg-[#0A192F] text-[#d1d5db] border border-[#C5A059]/30'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0A192F] border border-[#C5A059]/30 p-4 flex items-center gap-2">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <BrainCircuit size={16} className="text-[#C5A059]" />
                    </motion.div>
                    <span className="text-xs text-[#C5A059] animate-pulse uppercase tracking-wider">Calculating...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#1e293b] bg-[#050b14] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about margin recovery..."
                className="flex-1 bg-[#0A192F] border border-[#1e293b] text-white px-4 py-3 focus:outline-none focus:border-[#C5A059] text-xs uppercase tracking-wide transition-colors placeholder-gray-600"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="p-3 bg-[#C5A059] text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;