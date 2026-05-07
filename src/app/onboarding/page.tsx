'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
  const [ato, setAto] = useState(0);

  // Simulação do despertar do sistema (Ato 0)
  useEffect(() => {
    if (ato === 0) {
      const timer = setTimeout(() => setAto(1), 3500);
      return () => clearTimeout(timer);
    }
  }, [ato]);

  return (
    <main className="min-h-screen bg-[#161616] text-white flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {ato === 0 && (
          <motion.div 
            key="awakening"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {/* O Ponto de Presença */}
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-gray-500 mb-2">
                System Awakening
              </span>
              <span className="text-[12px] font-mono text-gray-400">
                Detecting operator presence...
              </span>
            </div>
          </motion.div>
        )}

        {ato === 1 && (
          <motion.div 
            key="identity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px] px-6"
          >
            <div className="space-y-2 mb-12">
              <span className="text-[12px] font-mono text-gray-500 uppercase tracking-widest">Ato 1 — Identity</span>
              <h2 className="text-[32px] font-bold tracking-tight">Define who enters the system.</h2>
            </div>
            
            {/* Próximos Atos serão injetados aqui */}
            <div className="p-8 border border-dashed border-gray-800 rounded-[20px] text-center text-gray-600">
              Próxima cena: Coleta de Identity (Nome, Role, etc.)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}