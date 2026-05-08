'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function Architecture({ onComplete }: { onComplete: () => void }) {
  const lines = [
    "Compiling Visual DNA...",
    "Injecting Theme Variables...",
    "Establishing Nexus Workspace...",
    "Syncing Bridge Connections...",
    "System Architecture Ready."
  ];
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < lines.length) {
      const timer = setTimeout(() => setCurrent(c => c + 1), 700);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(onComplete, 1200);
      return () => clearTimeout(finishTimer);
    }
  }, [current, onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[500px] p-6 font-mono">
      <div className="flex flex-col gap-4">
        {lines.slice(0, current + 1).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 text-[13px]">
            <span className="text-[var(--text-tertiary)]">[{String(i).padStart(2, '0')}]</span>
            <span className={i === lines.length - 1 ? "text-green-500 font-bold" : "text-[var(--text-secondary)]"}>
              {line}
            </span>
            {i === current && i < lines.length - 1 && <Loader2 size={12} className="animate-spin text-[var(--text-tertiary)] ml-auto" />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}