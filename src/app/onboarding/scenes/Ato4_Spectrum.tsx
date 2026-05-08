'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sun, Moon, Monitor } from 'lucide-react';

export function Spectrum({ data, update, onNext, onBack }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[480px] p-6">
      <div className="space-y-2 mb-10">
        <span className="text-[12px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Ato 4 — Spectrum</span>
        <h2 className="text-[32px] font-[600] tracking-tight">Shape the visual DNA.</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <ThemeBtn icon={<Moon size={20}/>} label="Dark" active={data.theme === 'dark'} onClick={() => update({...data, theme: 'dark'})} />
        <ThemeBtn icon={<Sun size={20}/>} label="Light" active={data.theme === 'light'} onClick={() => update({...data, theme: 'light'})} />
        <ThemeBtn icon={<Monitor size={20}/>} label="System" active={data.theme === 'system'} onClick={() => update({...data, theme: 'system'})} />
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-[14px] text-[var(--text-secondary)] flex items-center gap-2"><ArrowLeft size={16} /> Back</button>
        <button onClick={onNext} className="flex items-center gap-2 h-[44px] px-6 bg-[var(--text-primary)] text-[var(--bg)] rounded-[12px] font-[600]">
          Inject Theme <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function ThemeBtn({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-[16px] border transition-all ${active ? 'border-[var(--text-primary)] shadow-[var(--shadow-sm)]' : 'border-[var(--border)] hover:bg-[var(--surface)]'}`}>
      <div className={`mb-3 ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>{icon}</div>
      <span className="text-[12px] font-[600] uppercase tracking-wider">{label}</span>
    </div>
  );
}