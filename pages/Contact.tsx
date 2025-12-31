import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you. We will be in touch shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-gray-800 pb-12"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4">GET IN TOUCH</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-xl focus:border-white focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-xl focus:border-white focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Message</label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-gray-700 py-3 text-xl focus:border-white focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            
            <button 
              type="submit" 
              className="px-10 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Send Message
            </button>
          </motion.form>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12 lg:pl-12 lg:border-l border-gray-900"
          >
             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Contact Details</h3>
               <p className="text-2xl mb-1">hello@narrativearch.com</p>
               <p className="text-2xl">+1 (555) 012-3456</p>
             </div>

             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Office</h3>
               <p className="text-xl text-gray-300">
                 123 Design Avenue,<br/>
                 SoHo, New York,<br/>
                 NY 10012
               </p>
             </div>

             <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Socials</h3>
               <div className="flex gap-6 text-sm font-bold uppercase underline underline-offset-4">
                 <a href="#" className="hover:text-gray-400">Instagram</a>
                 <a href="#" className="hover:text-gray-400">LinkedIn</a>
                 <a href="#" className="hover:text-gray-400">Behance</a>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;