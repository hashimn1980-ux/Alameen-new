import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';
import Path from './pages/Path';
import AIChat from './components/AIChat';

const Header = ({ onOpenNav }: { onOpenNav: () => void }) => {
  const location = useLocation();
  const isTransparent = true;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 md:p-10 mix-blend-difference text-white transition-all duration-500`}>
      <Link to="/" className="text-sm font-bold tracking-[0.2em] uppercase">
        AL AMEEN AL MAJALI
      </Link>
      
      <div className="flex items-center gap-6">
        <span className="text-[10px] font-mono hidden md:block opacity-70 tracking-widest text-[#C5A059]">
          EST. 2024
        </span>
        <button onClick={onOpenNav} className="group flex items-center gap-2 hover:text-[#C5A059] transition-colors">
          <span className="text-[10px] font-bold uppercase hidden md:block tracking-widest">Index</span>
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059] selection:text-black font-light">
        <Header onOpenNav={() => setIsNavOpen(true)} />
        <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work/:id" element={<CaseStudy />} />
            <Route path="/path/:type" element={<Path />} />
          </Routes>
        </main>

        <AIChat />
      </div>
    </Router>
  );
};

export default App;