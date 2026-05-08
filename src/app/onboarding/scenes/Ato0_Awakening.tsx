'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function Awakening({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 4000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6"
    >
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 1, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-2 h-2 bg-[var(--text-primary)] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      />
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[var(--text-secondary)]">
          System Awakening
        </span>
        <span className="text-[12px] font-mono text-[var(--text-tertiary)]">
          Detecting new operator presence...
        </span>
      </div>
    </motion.div>
  );
}