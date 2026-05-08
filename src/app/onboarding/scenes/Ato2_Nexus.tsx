'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react';

export function Nexus({ data, update, onNext, onBack }: any) {
  const isComplete = data.workspace.length > 2;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[480px] p-6 relative">
      <div className="absolute -inset-10 border border-dashed border-[var(--border)] opacity-20 rounded-[32px] pointer-events-none" />
      
      <div className="space-y-2 mb-10 relative">
        <span className="text-[12px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Ato 2 — Nexus</span>
        <h2 className="text-[32px] font-[600] tracking-tight">Every system needs<br/>structure.</h2>
      </div>

      <div className="space-y-4 relative">
        <div className="p-1 border border-[var(--border)] rounded-[16px] bg-[var(--surface)] shadow-[var(--shadow-xs)]">
          <div className="flex items-center gap-3 px-4 h-[44px]">
            <Building2 size={18} className="text-[var(--text-tertiary)]" />
            <input 
              autoFocus
              type="text" placeholder="Workspace Name" value={data.workspace} onChange={(e) => update({...data, workspace: e.target.value})}
              className="w-full bg-transparent text-[16px] outline-none placeholder:text-[var(--text-tertiary)]"
            />
          </div>
        </div>
        
        <input 
          type="text" placeholder="Organization (Optional)" value={data.org} onChange={(e) => update({...data, org: e.target.value})}
          className="w-full h-[44px] px-5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] text-[16px] outline-none focus:border-[var(--hz-black)] transition-all placeholder:text-[var(--text-tertiary)]"
        />
      </div>

      <div className="mt-10 flex justify-between items-center relative">
        <button onClick={onBack} className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button disabled={!isComplete} onClick={onNext} className="flex items-center gap-2 h-[44px] px-6 bg-[var(--text-primary)] text-[var(--bg)] rounded-[12px] font-[600] disabled:opacity-20 transition-all hover:scale-[1.02]">
          Build Structure <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}