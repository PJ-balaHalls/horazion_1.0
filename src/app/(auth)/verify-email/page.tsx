'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
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
        <div className="mb-8">
          <div className="w-16 h-16 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[20px] flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-[var(--hz-black)]" />
          </div>
          <h1 className="text-[32px] font-[600] text-[var(--text-primary)] tracking-tight">Verifique seu e-mail</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-3 leading-relaxed">
            Enviámos um link de ativação para o seu endereço. <br />
            Clique no link para orquestrar o seu DNA digital.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full h-[44px] bg-[var(--hz-black)] text-white rounded-[12px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-all">
            <RefreshCw size={18} /> Reenviar e-mail
          </button>
          
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--hz-black)] transition-colors"
          >
            <ArrowLeft size={16} /> Voltar ao login
          </Link>
        </div>
      </motion.div>

      <AuthFooter />
    </div>
  );
}