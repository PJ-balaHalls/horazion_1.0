'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { AuthFooter } from '@/components/layout/auth-footer';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] flex-1 flex flex-col justify-center text-center"
      >
        <div className="mb-10">
          <div className="w-20 h-20 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-sm)]">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mail size={36} className="text-[var(--hz-black)]" />
            </motion.div>
          </div>
          <h1 className="text-[32px] font-[700] text-[var(--text-primary)] tracking-tight">Verifique seu e-mail</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-4 leading-relaxed">
            O sistema detectou um novo operador. <br />
            Um link de ativação foi enviado para o seu DNA digital.
          </p>
        </div>

        <div className="space-y-4">
          {/* Botão de Bypass para Desenvolvimento/Onboarding Antecipado */}
          <Link 
            href="/onboarding" 
            className="w-full h-[44px] bg-[var(--hz-black)] text-white rounded-[12px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[var(--shadow-sm)]"
          >
            Acessar Onboarding <ArrowRight size={18} />
          </Link>
          
          <button className="w-full h-[44px] border border-[var(--border)] text-[var(--text-secondary)] rounded-[12px] font-[600] flex items-center justify-center gap-2 hover:bg-[var(--bg-subtle)] transition-all">
            <RefreshCw size={16} /> Reenviar código
          </button>
        </div>
      </motion.div>

      <AuthFooter />
    </div>
  );
}