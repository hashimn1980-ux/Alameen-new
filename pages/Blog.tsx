import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: '1',
      title: 'Communication Between Studio Departments',
      category: 'Process',
      date: 'Oct 24, 2024',
      image: 'https://picsum.photos/800/600?random=30'
    },
    {
      id: '2',
      title: 'Designers Who Changed the Web With Webflow',
      category: 'Inspiration',
      date: 'Oct 20, 2024',
      image: 'https://picsum.photos/800/600?random=31'
    },
    {
      id: '3',
      title: 'Curating a Workplace That Inspires All of Us',
      category: 'Culture',
      date: 'Sep 15, 2024',
      image: 'https://picsum.photos/800/600?random=32'
    },
    {
      id: '4',
      title: 'Innovative Design Techniques for the Creative',
      category: 'Design',
      date: 'Sep 01, 2024',
      image: 'https://picsum.photos/800/600?random=33'
    }
  ];

  return (
    <div className="w-full pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">OUR BLOG</h1>
        <div className="h-px w-full bg-gray-800"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden mb-6 aspect-video relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest text-gray-500">
              <span className="bg-white/10 text-white px-2 py-1">{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">
              {post.title}
            </h2>
            <div className="mt-4 flex items-center text-sm font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              Read More <ArrowUpRight size={16} className="ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;