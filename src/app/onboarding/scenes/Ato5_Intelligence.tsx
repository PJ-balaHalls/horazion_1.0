'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function Intelligence({ data, update, onNext, onBack }: any) {
  const options = ['Creator', 'Developer', 'Studio', 'Startup', 'Enterprise'];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[480px] p-6">
      <div className="space-y-2 mb-10">
        <span className="text-[12px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Ato 5 — Intelligence</span>
        <h2 className="text-[32px] font-[600] tracking-tight leading-tight">Teach the system<br/>how you work.</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {options.map(opt => (
          <button 
            key={opt} onClick={() => update({...data, focus: opt})}
            className={`h-[44px] px-5 rounded-full text-[14px] font-[500] border transition-all ${data.focus === opt ? 'bg-[var(--text-primary)] text-[var(--bg)] border-transparent' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-[14px] text-[var(--text-secondary)] flex items-center gap-2"><ArrowLeft size={16} /> Back</button>
        <button disabled={!data.focus} onClick={onNext} className="flex items-center gap-2 h-[44px] px-6 bg-[var(--text-primary)] text-[var(--bg)] rounded-[12px] font-[600] disabled:opacity-20 transition-all">
          Compile System <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}