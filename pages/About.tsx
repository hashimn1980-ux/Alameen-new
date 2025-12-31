import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const team = [
    { name: 'Alex Doe', role: 'Founder & CD', img: 'https://picsum.photos/400/500?random=20' },
    { name: 'Maria Smith', role: 'Lead Developer', img: 'https://picsum.photos/400/500?random=21' },
    { name: 'John Brown', role: 'Art Director', img: 'https://picsum.photos/400/500?random=22' },
  ];

  return (
    <div className="w-full pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">ABOUT US</h1>
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
          We are a collective of digital architects, designers, and strategists. We believe that every pixel serves a purpose, and every interaction tells a story. Our methodology combines rigorous structural thinking with fluid, dynamic creativity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        <div className="relative aspect-[3/4]">
          <img src="https://picsum.photos/800/1000?grayscale" alt="Studio" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col justify-center space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
            <p className="text-gray-400 leading-relaxed">
              Design is not just about aesthetics; it's about problem-solving. We approach every project with a "form follows function" mindset, ensuring that the visual language enhances the user's journey rather than distracting from it.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Process</h3>
            <p className="text-gray-400 leading-relaxed">
              Our process is iterative and collaborative. We start with deep discovery, move into rapid prototyping, and refine through continuous testing. This ensures the final product is robust, scalable, and impactful.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-24">
         <div className="flex items-center justify-between mb-12 border-b border-gray-800 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest">The Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="mb-6 overflow-hidden aspect-[3/4]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h4 className="text-lg font-bold">{member.name}</h4>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;