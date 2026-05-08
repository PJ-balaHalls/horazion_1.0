'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Drawer({ isOpen, onClose, title, children }: any) {
  // Previne o scroll do body quando o drawer está aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full z-[101] flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-[800px] bg-[var(--bg)] border border-[var(--border)] rounded-t-[32px] shadow-2xl pointer-events-auto h-[75vh] flex flex-col">
              <div className="flex justify-center p-4">
                <div className="w-12 h-1.5 bg-[var(--border)] rounded-full" />
              </div>
              <div className="flex items-center justify-between px-8 pb-4 border-b border-[var(--border)]">
                <h2 className="text-[20px] font-bold">{title}</h2>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  <X size={16} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto no-scrollbar flex-1">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}