'use client';

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { AuthFooter } from '@/components/layout/auth-footer';

const AUTH_ERRORS: Record<string, string> = {
  'user_already_exists': 'Este e-mail já possui um DNA digital registrado.',
  'weak_password': 'A senha fornecida não atinge os critérios mínimos de segurança.',
  'invalid_email': 'O formato do e-mail fornecido é inválido.',
  'rate_limit': 'Muitas tentativas. Aguarde um momento para nova sincronização.',
  'default': 'Ocorreu uma anomalia na sincronização. Tente novamente.'
};

const EMAIL_DOMAINS = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'horazion.io'];

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);

  const emailPrefix = email.split('@')[0];
  const emailDomain = email.split('@')[1] || '';
  
  const suggestedDomains = useMemo(() => {
    if (!email.includes('@')) return [];
    return EMAIL_DOMAINS.filter(domain => domain.startsWith(emailDomain) && domain !== emailDomain);
  }, [email, emailDomain]);

  const handleDomainSelect = (domain: string) => {
    setEmail(`${emailPrefix}@${domain}`);
    setShowEmailSuggestions(false);
  };

  const passwordCriteria = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  
  const strengthScore = Object.values(passwordCriteria).filter(Boolean).length;
  const isPasswordValid = strengthScore === 5;
  const isFormValid = name.length > 2 && email.includes('@') && isPasswordValid;

  const handleSocialSignUp = async (provider: 'google' | 'github' | 'azure') => {
    // Redirecionamento via Bridge Sync para o callback
    await supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setLoading(true);
    setErrorMsg(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        // Antecipa o caminho para o onboarding após confirmação
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) {
      setErrorMsg(AUTH_ERRORS[error.code || ''] || AUTH_ERRORS['default']);
      setLoading(false);
    } else {
      // Redireciona para aviso de verificação antes do onboarding
      window.location.href = '/verify-email';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] p-6 relative">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--hz-black)] group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[400px] flex-1 flex flex-col justify-center py-12">
        <div className="text-center mb-8">
          <img src="/isologo/horazion.svg" alt="Horazion" className="w-14 h-14 mx-auto mb-6" />
          <h1 className="text-[32px] font-[600] text-[var(--text-primary)] tracking-tight">Criar DNA Digital</h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">Orquestração de UI em tempo real.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <SocialButton onClick={() => handleSocialSignUp('google')} icon={<GoogleIcon />} />
          <SocialButton onClick={() => handleSocialSignUp('github')} icon={<GithubIcon />} />
          <SocialButton onClick={() => handleSocialSignUp('azure')} icon={<MicrosoftIcon />} />
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[var(--border)]" /></div>
          <div className="relative flex justify-center text-[12px] uppercase font-medium"><span className="bg-[var(--bg)] px-2 text-[var(--text-tertiary)]">Ou via e-mail</span></div>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <input 
            type="text" placeholder="Nome completo" required value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] outline-none focus:border-[var(--hz-black)]"
          />
          
          <div className="relative">
            <input 
              type="email" placeholder="E-mail profissional" required value={email}
              onChange={(e) => { setEmail(e.target.value); setShowEmailSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
              className="w-full h-[44px] px-4 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]"
            />
            <AnimatePresence>
              {showEmailSuggestions && suggestedDomains.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-10 w-full mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--shadow-md)]">
                  {suggestedDomains.map(domain => (
                    <div key={domain} onClick={() => handleDomainSelect(domain)} className="px-4 py-2 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] cursor-pointer">
                      {emailPrefix}@<strong>{domain}</strong>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} placeholder="Senha segura" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[44px] pl-4 pr-10 rounded-[12px] border border-[var(--border)] bg-[var(--surface)]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {password.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex gap-1 h-1 w-full">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className={`flex-1 rounded-full ${strengthScore >= level ? (strengthScore === 5 ? 'bg-green-500' : 'bg-[var(--hz-black)]') : 'bg-[var(--bg-subtle)]'}`} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-y-1 text-[11px] text-[var(--text-secondary)]">
                <Criteria met={passwordCriteria.length} label="8+ caracteres" />
                <Criteria met={passwordCriteria.upper} label="Maiúscula" />
                <Criteria met={passwordCriteria.lower} label="Minúscula" />
                <Criteria met={passwordCriteria.number} label="Número" />
                <Criteria met={passwordCriteria.special} label="Especial" />
              </div>
            </div>
          )}

          <AnimatePresence>
            {errorMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-3 rounded-[12px] bg-red-50 text-red-600 text-[12px]">
                <AlertCircle size={16} /> <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            disabled={loading || !isFormValid}
            className="w-full h-[44px] bg-[var(--hz-black)] text-white rounded-[12px] font-[600] mt-4 disabled:opacity-30"
          >
            {loading ? 'Sincronizando...' : 'Criar DNA Digital'}
          </button>
        </form>

        <p className="text-center text-[14px] text-[var(--text-secondary)] mt-8">
          Já possui um DNA? <Link href="/login" className="text-[var(--hz-black)] font-bold">Fazer Login</Link>
        </p>
      </motion.div>
      <AuthFooter />
    </div>
  );
}

function Criteria({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${met ? 'text-green-600' : 'text-[var(--text-tertiary)]'}`}>
      <Check size={12} className={met ? 'opacity-100' : 'opacity-20'} /> {label}
    </div>
  );
}

function SocialButton({ icon, onClick }: { icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center justify-center h-[44px] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] hover:bg-[var(--bg-subtle)] transition-all">
      {icon}
    </button>
  );
}

function GoogleIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>); }
function GithubIcon() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>); }
function MicrosoftIcon() { return (<svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>); }