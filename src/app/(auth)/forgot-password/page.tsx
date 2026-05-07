'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)]">
      <div className="w-full max-w-[400px] space-y-6">
        <h2 className="text-[24px] font-[600]">Recuperar conta</h2>
        {sent ? (
          <p className="text-green-600">Verifique seu e-mail para o link de redefinição.</p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input 
              type="email" placeholder="Seu e-mail cadastrado" 
              className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-transparent"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full h-[44px] bg-[var(--hz-black)] text-white rounded-[12px] font-[600]">
              Enviar link de recuperação
            </button>
          </form>
        )}
      </div>
    </div>
  );
}