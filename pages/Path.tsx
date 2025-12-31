import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.8, ease: "circOut" });
    return () => controls.stop();
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const Path: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [calculatorInput, setCalculatorInput] = useState({ agents: 10, dealValue: 2000000 });
  const [showCalcResult, setShowCalcResult] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  // Content configuration based on route
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
      interactive: "timeline"
    }
  };

  const current = content[type as keyof typeof content] || content.enterprises;

  // Simulator Logic (Raw Number Calculation)
  const calculateLossValue = () => {
    // Logic: (Agents * 30% inefficiency) * (Avg Deal Value * 2% commission opportunity cost)
    return (calculatorInput.agents * 0.3) * (calculatorInput.dealValue * 0.02);
  };

  const timelineSteps = [
    { 
      day: 'Day 1', 
      title: 'Strategic Audit & Asset Digitization', 
      desc: 'We deploy our legal and technical architects to map your asset ecosystem. We structure the SPV and initiate the digitizing of title deeds.' 
    },
    { 
      day: 'Day 30', 
      title: 'Capital Structure & Governance Setup', 
      desc: 'The Multi-Agent System is configured. Smart contracts are deployed to handle dividends, voting rights, and automated compliance checks.' 
    },
    { 
      day: 'Day 60', 
      title: 'Market Activation & Token Issuance', 
      desc: 'Private placement begins. Accredited investors access the deal room. The initial offering is broadcasted to our liquidity network.' 
    },
    { 
      day: 'Day 90', 
      title: 'Liquidity Event', 
      desc: 'Secondary market trading opens. Capital is unlocked. You move from "Asset Rich, Cash Poor" to "Liquid and Agile".' 
    },
  ];

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
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">{current.description}</p>
          <button className="px-8 py-4 border border-[#C5A059] text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-300">
            {current.cta}
          </button>
        </motion.div>

        {/* Right Column: Interactive Module */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0A192F]/30 border border-white/5 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 z-0 opacity-10" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="relative z-10 h-full">
            {current.interactive === 'calculator' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-4">Margin Recovery Simulator</h3>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Number of Agents</label>
                  <input 
                    type="range" min="5" max="500" 
                    value={calculatorInput.agents}
                    onChange={(e) => { setCalculatorInput({...calculatorInput, agents: parseInt(e.target.value)}); setShowCalcResult(false); }}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                  />
                  <div className="text-right text-[#C5A059] font-mono mt-2 flex justify-end items-center gap-1">
                    <Counter value={calculatorInput.agents} /> Agents
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Avg. Deal Value (AED)</label>
                  <input 
                    type="range" min="1000000" max="50000000" step="500000"
                    value={calculatorInput.dealValue}
                    onChange={(e) => { setCalculatorInput({...calculatorInput, dealValue: parseInt(e.target.value)}); setShowCalcResult(false); }}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                  />
                  <div className="text-right text-[#C5A059] font-mono mt-2 flex justify-end items-center gap-1">
                     <Counter value={calculatorInput.dealValue} /> AED
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="text-sm text-gray-400 mb-2">Potential Annual Loss</div>
                  <div className="text-4xl md:text-5xl font-bold text-red-500 font-mono flex items-baseline gap-2">
                     AED <Counter value={calculateLossValue()} />
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider">Based on 30% admin drag efficiency</div>
                </div>
              </div>
            )}

            {current.interactive === 'quadrant' && (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8">Risk vs. Velocity</h3>
                <div className="relative aspect-square border-l-2 border-b-2 border-gray-600">
                  <div className="absolute bottom-4 left-4 text-[10px] uppercase text-gray-500">Traditional</div>
                  <div className="absolute top-4 right-4 text-[10px] uppercase text-[#C5A059] font-bold">Tokenized</div>
                  
                  {/* Quadrant Lines */}
                  <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-gray-700"></div>
                  <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-700"></div>

                  {/* Data Points */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-gray-500 rounded-full opacity-50"
                  />
                   <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute top-1/4 right-1/4 w-8 h-8 bg-[#C5A059] rounded-full shadow-[0_0_20px_rgba(197,160,89,0.5)]"
                  >
                    <div className="absolute -top-6 -right-6 text-[#C5A059] text-xs whitespace-nowrap">Your Opportunity</div>
                  </motion.div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest text-gray-400">
                   <span>Low Velocity</span>
                   <span>High Velocity</span>
                </div>
              </div>
            )}

            {current.interactive === 'timeline' && (
              <div className="h-full">
                 <h3 className="text-2xl font-bold mb-8">The 90-Day Sprint</h3>
                 <div className="relative">
                    <div className="space-y-0">
                    {timelineSteps.map((item, i) => (
                      <motion.div 
                        key={i} 
                        layout
                        className="group relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className="flex gap-6 pb-6 last:pb-0">
                           {/* Timeline Graphic Column */}
                           <div className="flex flex-col items-center flex-shrink-0 relative z-10">
                              <motion.button 
                                layout="position"
                                onClick={() => setActiveTimelineStep(i)}
                                className={`w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center transition-all duration-300 bg-[#0A192F] cursor-pointer relative z-20 ${
                                  i <= activeTimelineStep ? 'border-[#C5A059] text-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'text-gray-600 hover:border-gray-500'
                                }`}
                              >
                                 <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i <= activeTimelineStep ? 'bg-[#C5A059]' : 'bg-gray-600'}`} />
                              </motion.button>
                              
                              {/* Connector Line to next item */}
                              {i < timelineSteps.length - 1 && (
                                <motion.div 
                                  layout
                                  className={`w-[1px] flex-grow mt-2 mb-2 transition-colors duration-500 ${i < activeTimelineStep ? 'bg-[#C5A059]' : 'bg-gray-800'}`} 
                                  style={{ minHeight: '40px' }}
                                />
                              )}
                           </div>

                           {/* Content Column */}
                           <div className="pt-1 flex-1 cursor-pointer" onClick={() => setActiveTimelineStep(i)}>
                              <div className="flex items-center gap-4 mb-1">
                                <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${i === activeTimelineStep ? 'text-[#C5A059]' : 'text-gray-500'}`}>{item.day}</span>
                              </div>
                              <h4 className={`text-lg transition-colors duration-300 ${i === activeTimelineStep ? 'text-white font-bold' : 'text-gray-400'}`}>{item.title}</h4>
                              
                              <AnimatePresence>
                                {i === activeTimelineStep && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-[#C5A059] pl-4 py-2 bg-white/5 pr-4 rounded-r-lg">
                                      {item.desc}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                    </div>
                 </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Path;