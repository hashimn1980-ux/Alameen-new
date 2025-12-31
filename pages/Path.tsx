import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, TrendingUp, CheckCircle2, Lock, FileText, ChevronRight, BarChart3, Play, Mail, Download, Calendar, Linkedin, Share2, X } from 'lucide-react';

const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.8, ease: "circOut" });
    return () => controls.stop();
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const VideoModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-20"
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-[#C5A059] transition-colors">
      <X size={40} />
    </button>
    <motion.div 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="w-full max-w-5xl aspect-video bg-black border border-white/10 shadow-[0_0_50px_rgba(197,160,89,0.1)] relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
        {/* Simulated Video Player */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Play className="fill-[#C5A059] text-[#C5A059]" size={32} />
                </div>
                <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">Playing Case Study Analysis</p>
            </div>
            {/* Overlay for cinematic effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>
    </motion.div>
  </motion.div>
);

const ExplainerVideo = ({ type, onClick }: { type: string, onClick: () => void }) => {
  const videoContent = {
    enterprises: {
      title: "Operational Scaling",
      subtitle: "Capital Edge Case Study",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    capital: {
      title: "Due Diligence Framework",
      subtitle: "Institutional Standard",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    developers: {
      title: "Tokenization Roadmap",
      subtitle: "The 90-Day Liquidity Sprint",
      image: "https://images.unsplash.com/photo-1590668468552-d8731034f55f?q=80&w=2070&auto=format&fit=crop"
    }
  };

  const content = videoContent[type as keyof typeof videoContent] || videoContent.enterprises;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      onClick={onClick}
      className="mt-12 relative aspect-video bg-black/50 border border-white/10 rounded-lg overflow-hidden group cursor-pointer hover:border-[#C5A059] transition-colors duration-300"
    >
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 backdrop-blur-sm flex items-center justify-center border border-[#C5A059] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
           <Play className="fill-[#C5A059] text-[#C5A059] ml-1" size={24} />
        </div>
      </div>
      <img src={content.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale" alt="Explainer" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent z-10">
         <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-1">{content.subtitle}</div>
         <div className="text-sm text-white font-medium">{content.title}</div>
      </div>
    </motion.div>
  );
};

const Path: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  // Enterprise State
  const [calculatorInput, setCalculatorInput] = useState({ agents: 50, dealValue: 2000000 });
  
  // Capital State (Quadrant)
  const constraintsRef = useRef(null);
  const [quadrantItems, setQuadrantItems] = useState([
    { id: 1, label: 'Comm. Tower', type: 'asset' },
    { id: 2, label: 'Mixed Use', type: 'asset' },
    { id: 3, label: 'Land Bank', type: 'asset' },
  ]);
  const [draggedItems, setDraggedItems] = useState<number[]>([]);
  const [frameworkUnlocked, setFrameworkUnlocked] = useState(false);

  // Developers State (Quiz)
  const [quizStep, setQuizStep] = useState(0); // 0: Intro, 1: Stage, 2: Capital, 3: Result
  const [quizData, setQuizData] = useState({ stage: 'Series A', amount: 5000000 });
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Gating & Modal State
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reset state on path change
  useEffect(() => {
    setShowEmailGate(false);
    setFormSubmitted(false);
    setEmail('');
    setFrameworkUnlocked(false);
    setDraggedItems([]);
    setQuizStep(0);
    setShowQuizResult(false);
    setIsVideoOpen(false);
  }, [type]);

  // Content Config
  const content = {
    enterprises: {
      title: "FOR ENTERPRISES",
      headline: "Your Profit is Hiding in Your Process.",
      description: "Scale is not about adding more people. It is about removing friction. Our Multi-Agent Systems architecture recovers the margins lost to administrative drag.",
      icon: <TrendingUp className="w-12 h-12 text-[#C5A059]" />,
      cta: "Book a Strategic Audit",
      interactive: "calculator"
    },
    capital: {
      title: "FOR CAPITAL",
      headline: "De-Risking the Future of Ownership.",
      description: "Traditional investment is slow and opaque. We tokenize assets to create velocity, liquidity, and programmable governance.",
      icon: <ShieldCheck className="w-12 h-12 text-[#C5A059]" />,
      cta: "Access the Deal Flow",
      interactive: "quadrant"
    },
    developers: {
      title: "FOR DEVELOPERS",
      headline: "From Concept to Cash Flow in 90 Days.",
      description: "Speed is the only currency that matters. We compress the timeline from acquisition to monetization through digital acceleration.",
      icon: <Zap className="w-12 h-12 text-[#C5A059]" />,
      cta: "Unlock Liquidity",
      interactive: "quiz"
    }
  };

  const current = content[type as keyof typeof content] || content.enterprises;

  // Actions
  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  const handleBook = () => {
    window.open('https://calendly.com/', '_blank');
  };

  // Simulator Logic
  const calculateRecovery = () => {
    // 30% efficiency gain on 2% margin leakage
    return (calculatorInput.agents * 0.3) * (calculatorInput.dealValue * 0.02);
  };

  // Quadrant Logic
  const handleDragEnd = (id: number, info: any) => {
    if (info.offset.x > 50 && info.offset.y < -50) {
        if (!draggedItems.includes(id)) {
            const newDragged = [...draggedItems, id];
            setDraggedItems(newDragged);
            if (newDragged.length >= 1) setFrameworkUnlocked(true);
        }
    }
  };
  
  // Developer Quiz Logic
  const handleQuizNext = () => {
    if (quizStep < 3) {
        if (quizStep === 2) {
            setTimeout(() => {
                setShowQuizResult(true);
            }, 800);
        } else {
            setQuizStep(prev => prev + 1);
        }
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Narrative
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Left Column: Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">{current.icon}</div>
          <h1 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-4">{current.title}</h1>
          <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">{current.headline}</h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">{current.description}</p>
          <button onClick={handleBook} className="px-8 py-4 border border-[#C5A059] text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-300">
            {current.cta}
          </button>
          
          {/* Dynamic Video */}
          <ExplainerVideo type={type || 'enterprises'} onClick={() => setIsVideoOpen(true)} />
        </motion.div>

        {/* Right Column: Interactive Module */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0A192F]/30 border border-white/5 p-8 md:p-12 relative overflow-hidden flex flex-col min-h-[600px]"
        >
             {/* Background Grid */}
          <div className="absolute inset-0 z-0 opacity-10" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center">
            
            {/* EMAIL GATING OVERLAY */}
            <AnimatePresence>
              {showEmailGate && !formSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 z-50 bg-[#050505]/80 flex flex-col items-center justify-center p-8 text-center"
                >
                  <Lock className="text-[#C5A059] mb-4 w-10 h-10" />
                  <h3 className="text-2xl font-bold mb-2">Unlock Your Strategic Asset</h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                    Enter your email to receive the full PDF report and detailed analysis immediately.
                  </p>
                  <form onSubmit={handleGateSubmit} className="w-full max-w-sm space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="business@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A192F] border border-gray-700 p-4 text-white focus:border-[#C5A059] focus:outline-none text-center"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-[#C5A059] text-black font-bold uppercase p-4 hover:bg-white transition-colors tracking-widest text-xs"
                    >
                      Unlock Access
                    </button>
                  </form>
                  <button onClick={() => setShowEmailGate(false)} className="mt-4 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ENTERPRISE: MARGIN RECOVERY SIMULATOR */}
            {current.interactive === 'calculator' && (
               <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Margin Recovery Simulator</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Calculate your MAS efficiency potential</p>
                  </div>
                  
                  <div className="space-y-8">
                     <div>
                        <div className="flex justify-between text-xs uppercase font-bold tracking-widest mb-4 text-gray-400">
                           <span>Agents</span>
                           <span className="text-[#C5A059]"><Counter value={calculatorInput.agents} /></span>
                        </div>
                        <input 
                           type="range" min="10" max="500" step="10"
                           value={calculatorInput.agents}
                           onChange={(e) => setCalculatorInput({...calculatorInput, agents: parseInt(e.target.value)})}
                           className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between text-xs uppercase font-bold tracking-widest mb-4 text-gray-400">
                           <span>Avg Deal Value (AED)</span>
                           <span className="text-[#C5A059]"><Counter value={calculatorInput.dealValue} /></span>
                        </div>
                        <input 
                           type="range" min="1000000" max="50000000" step="1000000"
                           value={calculatorInput.dealValue}
                           onChange={(e) => setCalculatorInput({...calculatorInput, dealValue: parseInt(e.target.value)})}
                           className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                        />
                     </div>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                           <CheckCircle2 size={14} /> Recoverable Margin
                        </span>
                        <span className="text-xs text-gray-500">90-Day Projection</span>
                     </div>
                     
                     {/* Efficiency Delta Bar */}
                     <div className="relative h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1 }}
                           className="absolute inset-y-0 left-0 bg-red-900/30 w-full" 
                        />
                        <motion.div 
                           className="absolute inset-y-0 left-0 bg-emerald-500"
                           initial={{ width: "0%" }}
                           animate={{ width: `${Math.min((calculateRecovery() / 1000000) * 10, 100)}%` }} // Arbitrary scale for visual
                        />
                     </div>

                     <div className="text-4xl md:text-5xl font-bold text-white font-mono flex items-baseline gap-2">
                        AED <Counter value={calculateRecovery()} />
                     </div>
                  </div>

                  {!formSubmitted ? (
                    <button 
                      onClick={() => setShowEmailGate(true)}
                      className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                    >
                       Discover Your Custom Margin Recovery Plan
                    </button>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 className="text-emerald-400" />
                              <div className="text-sm font-bold text-white">Plan Sent to {email}</div>
                           </div>
                           <button className="text-xs uppercase font-bold text-emerald-400 hover:text-white flex items-center gap-2">
                              Download PDF <Download size={14} />
                           </button>
                        </div>
                        {/* Phase 3: Direct Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleBook}
                                className="py-3 border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                            >
                                <Calendar size={14} /> Book Strategy
                            </button>
                            <button 
                                onClick={handleShare}
                                className="py-3 border border-white/20 hover:bg-[#0077b5] hover:border-[#0077b5] transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                            >
                                <Linkedin size={14} /> Share Analysis
                            </button>
                        </div>
                    </div>
                  )}
               </div>
            )}

            {/* CAPITAL: RISK QUADRANT */}
            {current.interactive === 'quadrant' && (
               <div className="h-full flex flex-col" ref={constraintsRef}>
                  <div className="mb-6 flex justify-between items-end">
                     <div>
                        <h3 className="text-2xl font-bold">Decision Matrix</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Drag assets to map Risk vs. Confidence</p>
                     </div>
                     {!frameworkUnlocked && <div className="text-[10px] animate-pulse text-[#C5A059]">Waiting for input...</div>}
                  </div>

                  <div className="relative aspect-square border-l border-b border-gray-600 bg-black/40 mb-6 overflow-hidden">
                     {/* Labels */}
                     <div className="absolute top-2 left-2 text-[8px] uppercase tracking-widest text-gray-500">Regulatory Risk (High)</div>
                     <div className="absolute bottom-2 right-2 text-[8px] uppercase tracking-widest text-gray-500">Track Record (High)</div>

                     {/* Gold Zone */}
                     <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#C5A059]/10 border-l border-b border-[#C5A059]/30 flex items-center justify-center">
                        <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest opacity-50">Gold Zone</span>
                     </div>

                     {/* Draggables */}
                     <AnimatePresence>
                     {quadrantItems.map((item, i) => (
                        !draggedItems.includes(item.id) && (
                           <motion.div
                              key={item.id}
                              drag
                              dragConstraints={constraintsRef}
                              dragElastic={0.1}
                              onDragEnd={(e, info) => handleDragEnd(item.id, info)}
                              className="absolute cursor-grab active:cursor-grabbing z-20"
                              style={{ bottom: 20, left: 20 + (i * 80) }}
                              whileHover={{ scale: 1.1 }}
                           >
                              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold uppercase shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center p-2">
                                 {item.label}
                              </div>
                           </motion.div>
                        )
                     ))}
                     </AnimatePresence>

                     {/* Success State in Quadrant */}
                     {frameworkUnlocked && (
                        <motion.div 
                           initial={{ scale: 0 }} 
                           animate={{ scale: 1 }}
                           className="absolute top-[20%] right-[20%] w-20 h-20 rounded-full bg-[#C5A059] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.6)] z-10"
                        >
                           <CheckCircle2 className="text-black w-8 h-8" />
                        </motion.div>
                     )}
                  </div>

                  {frameworkUnlocked ? (
                     !formSubmitted ? (
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="p-4 border border-[#C5A059] bg-[#C5A059]/10 flex items-center justify-between"
                        >
                           <div className="flex items-center gap-3">
                              <Lock className="text-[#C5A059]" size={16} />
                              <span className="text-xs font-bold uppercase tracking-widest text-white">Framework Unlocked</span>
                           </div>
                           <button 
                              onClick={() => setShowEmailGate(true)}
                              className="text-xs bg-[#C5A059] text-black px-4 py-2 font-bold uppercase hover:bg-white transition-colors"
                           >
                              Access Institutional Capital Due Diligence Framework
                           </button>
                        </motion.div>
                     ) : (
                        <motion.div className="space-y-4">
                           <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <CheckCircle2 className="text-emerald-400" size={16} />
                                 <span className="text-xs font-bold uppercase tracking-widest text-white">Access Granted</span>
                              </div>
                              <button className="text-xs text-emerald-400 underline uppercase font-bold">
                                 Download Framework
                              </button>
                           </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={handleBook}
                                    className="py-3 border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                                >
                                    <Calendar size={14} /> Consult
                                </button>
                                <button 
                                    onClick={handleShare}
                                    className="py-3 border border-white/20 hover:bg-[#0077b5] hover:border-[#0077b5] transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                                >
                                    <Linkedin size={14} /> Share
                                </button>
                            </div>
                        </motion.div>
                     )
                  ) : (
                     <div className="p-4 border border-white/10 bg-white/5 text-center text-xs text-gray-500 uppercase tracking-widest">
                        Map assets to unlock framework
                     </div>
                  )}
               </div>
            )}

            {/* DEVELOPERS: LIQUIDITY BLOCK FINDER (QUIZ) */}
            {current.interactive === 'quiz' && (
               <div className="h-full flex flex-col justify-center">
                  {!showQuizResult ? (
                     <div className="space-y-8">
                        {/* Progress */}
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-2xl font-bold">Liquidity Block Finder</h3>
                           <div className="text-xs text-[#C5A059] font-mono">STEP 0{quizStep + 1}/03</div>
                        </div>
                        
                        <div className="w-full bg-gray-800 h-1 mb-8">
                           <motion.div 
                              className="h-full bg-[#C5A059]"
                              initial={{ width: 0 }}
                              animate={{ width: `${((quizStep + 1) / 3) * 100}%` }}
                           />
                        </div>

                        {/* Question Content */}
                        <div className="min-h-[200px]">
                           {quizStep === 0 && (
                              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                 <h4 className="text-lg font-light mb-6">What is your current growth stage?</h4>
                                 <div className="space-y-3">
                                    {['Seed Stage', 'Series A', 'Series B+'].map((opt) => (
                                       <button 
                                          key={opt}
                                          onClick={() => { setQuizData({...quizData, stage: opt}); handleQuizNext(); }}
                                          className="w-full text-left p-4 border border-white/10 hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all text-sm uppercase tracking-widest flex justify-between group"
                                       >
                                          {opt} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" size={16} />
                                       </button>
                                    ))}
                                 </div>
                              </motion.div>
                           )}

                           {quizStep === 1 && (
                              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                 <h4 className="text-lg font-light mb-6">Capital Requirement (AED)</h4>
                                 <div className="mb-8">
                                    <div className="text-3xl font-mono text-[#C5A059] mb-4">
                                       AED <Counter value={quizData.amount} />
                                    </div>
                                    <input 
                                       type="range" min="1000000" max="50000000" step="1000000"
                                       value={quizData.amount}
                                       onChange={(e) => setQuizData({...quizData, amount: parseInt(e.target.value)})}
                                       className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                                    />
                                 </div>
                                 <button 
                                    onClick={handleQuizNext}
                                    className="px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#C5A059] transition-colors"
                                 >
                                    Next Step
                                 </button>
                              </motion.div>
                           )}

                           {quizStep === 2 && (
                              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                 <h4 className="text-lg font-light mb-6">Primary Bottleneck?</h4>
                                 <div className="space-y-3">
                                    {['Valuation Clarity', 'Speed of Capital', 'Governance Structure'].map((opt) => (
                                       <button 
                                          key={opt}
                                          onClick={() => { handleQuizNext(); }} 
                                          className="w-full text-left p-4 border border-white/10 hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all text-sm uppercase tracking-widest flex justify-between group"
                                       >
                                          {opt} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" size={16} />
                                       </button>
                                    ))}
                                 </div>
                              </motion.div>
                           )}
                        </div>
                     </div>
                  ) : (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-center"
                     >
                        <div className="inline-block p-4 rounded-full bg-emerald-500/20 text-emerald-500 mb-6">
                           <BarChart3 size={32} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Readiness: High</h3>
                        <p className="text-gray-400 mb-8">You are 60 days from a liquidity event.</p>
                        
                        <div className="bg-white/5 p-6 mb-8 text-left border-l-2 border-[#C5A059]">
                           <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Next Strategic Step</div>
                           <div className="font-bold text-lg">Structure SPV & Smart Contract Audit</div>
                        </div>

                        {!formSubmitted ? (
                           <button 
                              onClick={() => setShowEmailGate(true)}
                              className="w-full py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                           >
                              Get Your Tokenization Readiness Assessment
                           </button>
                        ) : (
                           <div className="space-y-4">
                               <button className="w-full py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                  Download Roadmap <Download size={16} />
                               </button>
                               <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={handleBook}
                                        className="py-3 border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                                    >
                                        <Calendar size={14} /> Book Strategy
                                    </button>
                                    <button 
                                        onClick={handleShare}
                                        className="py-3 border border-white/20 hover:bg-[#0077b5] hover:border-[#0077b5] transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                                    >
                                        <Linkedin size={14} /> Share Result
                                    </button>
                                </div>
                           </div>
                        )}
                     </motion.div>
                  )}
               </div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Path;