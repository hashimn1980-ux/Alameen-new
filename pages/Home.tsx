import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Building, Wallet, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnotVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
    <motion.path
      d="M20,100 C50,0 150,200 180,100 S50,200 20,100"
      stroke="#334155"
      strokeWidth="2"
      fill="none"
      animate={{ d: ["M20,100 C50,0 150,200 180,100 S50,200 20,100", "M20,100 C50,200 150,0 180,100 S50,0 20,100", "M20,100 C50,0 150,200 180,100 S50,200 20,100"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M100,20 C0,50 200,150 100,180 S200,50 100,20"
      stroke="#475569"
      strokeWidth="2"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ originX: "100px", originY: "100px" }}
    />
    <motion.circle cx="100" cy="100" r="40" stroke="#ef4444" strokeWidth="1" fill="none" 
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

const GridVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    {[40, 80, 120, 160].map((x, i) => (
       <motion.circle 
         key={i} 
         cx={x} 
         cy={100 + Math.sin(i)*40} 
         r="3" 
         fill="#C5A059"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ delay: i * 0.2 }}
       />
    ))}
    
    <motion.path
      d="M40,100 L80,135 L120,110 L160,80"
      stroke="#C5A059"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </svg>
);

const ProjectCard = ({ id, title, stat, subtitle }: { id: string, title: string, stat: string, subtitle: string }) => (
  <Link to={`/work/${id}`} className="group relative block bg-[#0A192F]/30 border border-white/5 p-8 overflow-hidden hover:border-[#C5A059] transition-colors duration-500">
    <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="text-[10px] text-[#C5A059] uppercase tracking-widest mb-4">Case Study 0{id}</div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
      <div className="text-4xl font-light text-white mb-1 group-hover:text-[#C5A059] transition-colors">{stat}</div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{subtitle}</p>
    </div>
  </Link>
);

const Home: React.FC = () => {
  const containerRef = useRef(null);

  // Text Animation
  const sentence = "Why are you running it with your feet in the mud?";
  const letters = sentence.split("");

  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden">
      
      {/* 00:00 - HERO */}
      <section className="h-screen relative flex flex-col justify-center px-6 md:px-12 max-w-[1600px] mx-auto z-10">
        {/* Abstract Video Placeholder */}
        <div className="absolute inset-0 z-[-1] opacity-20 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#050505] to-[#050505]"></div>
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }}
            animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
            The real estate market is a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">half-trillion dirham race.</span>
          </h1>
          
          <div className="text-xl md:text-2xl font-light text-[#ef4444] font-mono tracking-tight overflow-hidden whitespace-nowrap">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 1 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }} 
              className="inline-block w-2 h-6 bg-[#ef4444] ml-1 align-middle"
            />
          </div>
        </motion.div>
      </section>

      {/* SCROLL 1 - CONFLICT */}
      <section className="min-h-screen flex items-center px-6 md:px-12 border-t border-white/5 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">The Digital Mud</h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-none">The Invisible Expense.</h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              Your best people are trapped in the 'Digital Mud' of manual tasks. It's a system that runs on time and produces exhaustion. 
              <br/><br/>
              <span className="text-white border-b border-white pb-1">You are managing chaos instead of assets.</span>
            </p>
          </motion.div>
          <div className="h-[400px] md:h-[600px] w-full relative">
            <KnotVisual />
          </div>
        </div>
      </section>

      {/* SCROLL 2 - PIVOT */}
      <section className="min-h-screen flex items-center px-6 md:px-12 bg-[#0A192F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0A192F] via-[#C5A059] to-[#0A192F] opacity-50" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1600px] mx-auto w-full z-10">
          <div className="order-2 lg:order-1 h-[400px] md:h-[600px] w-full">
            <GridVisual />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-[10px] text-[#C5A059] uppercase tracking-[0.2em] mb-4">Digital Architecture</h2>
            <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-none">Stop managing chaos. <span className="font-light block">Start architecting.</span></h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              We implement Multi-Agent Systems (MAS) to linearize workflow. Chaos is replaced by a clean hierarchy of automated agents, freeing your human capital for high-stakes strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SCROLL 3 - PROOF */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-20">
          <h2 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">The Result</h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-none max-w-3xl">
            Operational Drag Replaced by <span className="text-[#C5A059]">Strategic Velocity.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCard 
            id="1" 
            title="Capital Edge" 
            stat="167% Growth" 
            subtitle="Via Multi-Agent Systems"
          />
          <ProjectCard 
            id="2" 
            title="Address Jumeirah" 
            stat="$545M" 
            subtitle="Monetized in 6 months"
          />
          <ProjectCard 
            id="3" 
            title="Tokenization" 
            stat="90 Days" 
            subtitle="Capital Raise Velocity"
          />
        </div>
      </section>

      {/* SCROLL 4 - PATHWAYS */}
      <section className="py-32 px-6 md:px-12 border-t border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-800 border-b border-gray-800">
          {[
            { path: '/path/enterprises', title: 'For Enterprises', icon: <Building className="mb-8 w-12 h-12 text-[#C5A059]" />, desc: 'Recover lost margins through process architecture.' },
            { path: '/path/capital', title: 'For Capital', icon: <Wallet className="mb-8 w-12 h-12 text-[#C5A059]" />, desc: 'De-risk ownership with programmable governance.' },
            { path: '/path/developers', title: 'For Developers', icon: <Zap className="mb-8 w-12 h-12 text-[#C5A059]" />, desc: 'Accelerate liquidity events from years to months.' }
          ].map((item, i) => (
            <Link to={item.path} key={i} className="group block p-12 hover:bg-[#111] transition-colors duration-500">
              {item.icon}
              <h3 className="text-3xl font-bold mb-4 group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-white transition-colors">{item.desc}</p>
              <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-[#C5A059]">
                Explore <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center text-gray-600 text-xs uppercase tracking-widest">
        <p>Al Ameen Al Majali &copy; 2025. Built on Narrative Architecture.</p>
      </footer>

    </div>
  );
};

export default Home;