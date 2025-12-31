import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CaseStudy: React.FC = () => {
  const { id } = useParams();
  // Using global window scroll for smoother hero parallax
  const { scrollY } = useScroll();

  // Enhanced Parallax Configuration
  // Map scroll distance to Y movement (more pronounced: 50% of scroll speed)
  const rawY = useTransform(scrollY, [0, 1000], [0, 500]);
  // Add subtle scaling for cinematic effect
  const rawScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  
  // Apply physics for "weight" and responsiveness
  const heroY = useSpring(rawY, { stiffness: 150, damping: 20 });
  const heroScale = useSpring(rawScale, { stiffness: 150, damping: 20 });
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Updated Mock Data for Real Estate Context
  const projectData = {
    '1': {
      title: 'Capital Edge',
      subtitle: 'Operational Scaling',
      client: 'Capital Edge Realty',
      service: 'Multi-Agent Systems',
      year: '2024',
      role: 'Strategic Architect',
      image1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      image2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      desc: 'We audited the operational workflow of a mid-sized agency. By identifying "dead zones" in communication and implementing a MAS architecture, we automated 60% of admin tasks, resulting in 167% year-over-year growth.'
    },
    '2': {
      title: 'Address Jumeirah',
      subtitle: 'Asset Monetization',
      client: 'Emaar (Unofficial)',
      service: 'Liquidity Strategy',
      year: '2023',
      role: 'Consultant',
      image1: 'https://images.unsplash.com/photo-1512453979798-5ea904ac6686?q=80&w=2070&auto=format&fit=crop',
      image2: 'https://images.unsplash.com/photo-1590668468552-d8731034f55f?q=80&w=2070&auto=format&fit=crop',
      desc: 'The challenge was to accelerate the sales cycle for high-ticket units. We restructured the offering using a digital-first governance model, clearing $545M in inventory within 6 months.'
    },
    '3': {
      title: 'Tokenization',
      subtitle: 'Fractional Ownership',
      client: 'Confidential',
      service: 'Blockchain Architecture',
      year: '2024',
      role: 'Lead Architect',
      image1: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop',
      image2: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1932&auto=format&fit=crop',
      desc: 'Creating liquidity in illiquid markets. We built the legal and technical framework to tokenize a commercial tower, allowing for a 90-day capital raise cycle compared to the industry standard of 18 months.'
    }
  };

  const data = projectData[id as keyof typeof projectData] || projectData['1'];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white pb-20 overflow-hidden font-light">
      
      {/* Back Button */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors bg-black/50 backdrop-blur-sm px-4 py-2 rounded-none border border-white/10">
          <ArrowLeft size={14} /> Narrative
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          <img 
            src={data.image1} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-xs font-mono text-[#C5A059] mb-4 tracking-widest uppercase">CASE STUDY 0{id}</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">
              {data.title.toUpperCase()}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8"
          >
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Client</h3>
              <p className="text-lg">{data.client}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Services</h3>
              <p className="text-lg">{data.service}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Year</h3>
              <p className="text-lg">{data.year}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Role</h3>
              <p className="text-lg">{data.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction / Challenge */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 bg-[#050505]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
             className="lg:sticky lg:top-32"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">THE CHALLENGE</h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
              {data.desc}
            </p>
          </motion.div>
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="space-y-8"
          >
             <div className="aspect-[4/5] w-full overflow-hidden border border-white/10">
                <img src={data.image2} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Detail" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Results / Conclusion */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A192F] border-t border-[#C5A059]/30 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
            >
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] mb-8">The Result</h2>
              <p className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                "Velocity is not just speed; it is speed with direction."
              </p>
            </motion.div>
         </div>
      </section>

      {/* Next Project Navigation */}
      <Link to={`/work/${Number(id) >= 3 ? 1 : Number(id) + 1}`} className="block group relative h-[50vh] overflow-hidden z-10">
         <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
         <img 
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale" 
            alt="Next Project" 
         />
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70 group-hover:opacity-100 transition-opacity text-[#C5A059]">Next Strategic Move</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter group-hover:scale-110 transition-transform duration-500">
               CONTINUE <ArrowRight className="inline ml-4 w-12 h-12 md:w-20 md:h-20" />
            </h2>
         </div>
      </Link>

    </div>
  );
};

export default CaseStudy;