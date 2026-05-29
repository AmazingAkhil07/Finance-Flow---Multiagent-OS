"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };
  
  const child = {
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    hidden: { opacity: 0, y: 10, filter: "blur(5px)" }
  };
  
  return (
    <motion.h1 
      className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export const MotionWords = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const words = text.split(" ");
  
  return (
    <motion.p 
      className="font-inter text-slate-400 text-base md:text-lg max-w-2xl"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const ThreeDSticks = ({ theme = 'teal' }: { theme?: 'teal' | 'amber' | 'purple' }) => {
  const isTeal = theme === 'teal';
  const isAmber = theme === 'amber';
  
  const stickColor = isTeal ? "bg-teal-500 shadow-[0_0_25px_rgba(45,212,191,0.6)]" : isAmber ? "bg-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.6)]" : "bg-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]";
  const topColor = isTeal ? "bg-teal-300 border-teal-200/50" : isAmber ? "bg-amber-300 border-amber-200/50" : "bg-purple-300 border-purple-200/50";
  const rightColor = isTeal ? "bg-teal-700 border-teal-600/50" : isAmber ? "bg-amber-700 border-amber-600/50" : "bg-purple-700 border-purple-600/50";
  const glowColor = isTeal ? "bg-teal-500/20" : isAmber ? "bg-amber-500/20" : "bg-purple-500/20";

  return (
    <div style={{ perspective: '1200px' }} className="absolute right-0 md:right-10 top-0 w-64 h-64 opacity-40 pointer-events-none z-0 overflow-visible hidden md:block">
      <div 
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(65deg) rotateZ(35deg)' }}
        className="w-full h-full relative flex items-end justify-center gap-6"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`w-8 relative ${stickColor}`}
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ height: 30 + i * 15 }}
            animate={{ 
              height: [30 + i * 15, 120 + Math.random() * 100, 50 + Math.random() * 80] 
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          >
            {/* Top face */}
            <div 
              className={`absolute top-0 left-0 w-full h-8 border ${topColor}`}
              style={{ transformOrigin: 'top', transform: 'rotateX(-90deg) translateY(-100%)' }}
            />
            {/* Right face */}
            <div 
              className={`absolute top-0 right-0 h-full w-8 border-l ${rightColor}`}
              style={{ transformOrigin: 'right', transform: 'rotateY(90deg)' }}
            />
            {/* Glow effect at bottom */}
            <div className={`absolute -bottom-4 -left-4 w-16 h-16 blur-xl rounded-full ${glowColor}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
