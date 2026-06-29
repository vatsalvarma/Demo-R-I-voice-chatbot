import React, { useEffect } from 'react';
import { Chatbot } from './components/Chatbot/Chatbot';
import { Building2, Search, Map, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-brand-dark backdrop-blur-md z-40 border-b border-white/10 shadow-lg"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-brand-gold rounded flex items-center justify-center">
              <span className="text-brand-gold font-bold text-xl">RI</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider">RISHEE INFRA</h1>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-gray-200">
            <a href="#" className="hover:text-brand-gold transition">Home</a>
            <a href="#" className="hover:text-brand-gold transition">About Us</a>
            <a href="#" className="hover:text-brand-gold transition">Projects</a>
            <a href="#" className="hover:text-brand-gold transition">NRI Corner</a>
            <a href="#" className="hover:text-brand-gold transition">Blogs</a>
          </nav>
          <button className="bg-brand-gold text-brand-dark font-bold px-6 py-2 rounded-full hover:bg-yellow-400 transition">
            Contact Us
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-brand-dark leading-tight mb-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                hidden: {},
              }}
            >
              {"A Symphony of Life,".split(" ").map((word, i) => (
                <motion.span key={i} className="inline-block mr-4" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  {word}
                </motion.span>
              ))}
              <br/>
              {"Masterfully Conducted".split(" ").map((word, i) => (
                <motion.span key={i} className="inline-block mr-4 text-brand-gold" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl mb-4 text-slate-700"
            >
              The pioneer of quality construction in Hyderabad.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-lg text-slate-600 mb-10 flex gap-4"
            >
              <span>1 Million Sft</span> | <span>10,000+ Happy Families</span> | <span>2 Decades of Expertise</span>
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex gap-4"
            >
              <button className="bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1a2b4c] transition shadow-lg flex items-center gap-2">
                <Search size={20} /> Explore Projects
              </button>
              <button className="bg-white text-brand-dark border-2 border-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-lg flex items-center gap-2">
                <Phone size={20} /> Request Callback
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Embedded Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
