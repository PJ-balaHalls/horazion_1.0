'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface ListSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function ListSelector({ label, options, value, onChange, placeholder }: ListSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] flex items-center justify-between hover:bg-[var(--surface)] transition-all outline-none focus:border-[var(--hz-black)]"
      >
        <span className={value ? "text-[14px] text-[var(--text-primary)]" : "text-[14px] text-[var(--text-tertiary)]"}>
          {value || placeholder || "Selecionar..."}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-[16px] shadow-[var(--shadow-lg)] overflow-hidden"
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2.5 text-[14px] cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <span className={value === opt ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-secondary)]"}>
                  {opt}
                </span>
                {value === opt && <Check size={14} className="text-[var(--hz-black)]" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}