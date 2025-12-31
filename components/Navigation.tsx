import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { path: '/', label: 'NARRATIVE' },
  { path: '/path/enterprises', label: 'FOR ENTERPRISES' },
  { path: '/path/capital', label: 'FOR CAPITAL' },
  { path: '/path/developers', label: 'FOR DEVELOPERS' },
  { path: '/contact', label: 'CONTACT' },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0A192F] via-[#C5A059] to-[#0A192F]" />
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2 hover:text-[#C5A059] transition-colors"
          >
            <X size={32} />
          </button>

          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className={`text-3xl md:text-5xl font-light tracking-tight hover:text-[#C5A059] transition-colors ${
                    location.pathname === link.path ? 'text-[#C5A059]' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 text-xs text-[#C5A059] uppercase tracking-[0.2em]"
          >
            Al Ameen Al Majali &copy; 2025
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;