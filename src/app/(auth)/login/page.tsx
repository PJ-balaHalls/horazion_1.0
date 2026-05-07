'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { AuthFooter } from '@/components/layout/auth-footer';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [keepConnected, setKeepConnected] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] p-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8"
      >
        <Link href="/" className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--hz-black)] group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-[400px] flex-1 flex flex-col justify-center py-12"
      >
        <div className="text-center mb-10">
          <img src="/isologo.svg" alt="Horazion" className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-[32px] font-[600] text-[var(--text-primary)] tracking-tight">Bem-vindo</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Acesse sua infraestrutura de UI</p>
        </div>

        {/* Campos de Input seguindo design.md (44px altura) */}
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]" />
          <input type="password" placeholder="Senha" className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]" />
          
          <div className="flex items-center justify-between">
            {/* Checkbox Animado Customizado */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setKeepConnected(!keepConnected)}>
              <div className={`w-5 h-5 rounded-[6px] border transition-all flex items-center justify-center ${keepConnected ? 'bg-[var(--hz-black)] border-[var(--hz-black)]' : 'border-[var(--border)] group-hover:border-[var(--hz-gray)]'}`}>
                {keepConnected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
              <span className="text-[14px] text-[var(--text-secondary)] select-none">Manter conectado</span>
            </div>
            <Link href="/forgot-password" className="text-[12px] text-[var(--text-secondary)] hover:text-[var(--hz-black)] font-medium">Esqueceu a senha?</Link>
          </div>

          <button className="w-full h-[44px] bg-[var(--hz-black)] text-white rounded-[12px] font-[600] mt-6">Entrar</button>
        </form>

        <p className="text-center text-[14px] text-[var(--text-secondary)] mt-8">
          Não tem conta? <Link href="/register" className="text-[var(--hz-black)] font-bold">Criar agora</Link>
        </p>
      </motion.div>

      <AuthFooter />
    </div>
  );
}