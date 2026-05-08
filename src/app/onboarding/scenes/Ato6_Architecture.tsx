'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, ArrowRight, PlayCircle, ShieldAlert, CheckCircle2 
} from 'lucide-react';
import { Drawer } from '@/components/ui/drawer';

export function Architecture({ data, onComplete }: any) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fallback de segurança (Evita o TypeError)
  const safeData = data || {};
  const { identity, nexus, stack } = safeData;

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full grid grid-cols-12 gap-12 items-center h-[65vh] min-h-[550px] mt-10">
        
        {/* COLUNA ESQUERDA: Ações e Termos */}
        <div className="col-span-12 lg:col-span-5 flex flex-col h-full pt-4">
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 font-bold text-[11px] uppercase tracking-widest">
              <CheckCircle2 size={14}/> Configuração Concluída
            </div>
            <h2 className="text-[40px] font-bold tracking-tighter leading-tight">
              Tudo pronto,<br/><span className="text-accent">@{identity?.username || 'usuario'}</span>.
            </h2>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              O seu ambiente de trabalho foi sincronizado. Os módulos de inteligência e as suas extensões estão prontos a operar.
            </p>
          </div>

          <div className="space-y-4 mt-auto mb-8">
            <div className="p-5 rounded-[20px] bg-[var(--surface)] border border-[var(--border)] flex items-start gap-4">
              <button 
                onClick={() => setTermsAccepted(!termsAccepted)}
                className={`w-6 h-6 shrink-0 rounded-md border-2 mt-0.5 flex items-center justify-center transition-all ${termsAccepted ? 'bg-accent border-accent text-[var(--hz-accent-fg)]' : 'border-[var(--text-tertiary)] bg-[var(--bg)]'}`}
              >
                {termsAccepted && <Check size={14} strokeWidth={3} />}
              </button>
              <div className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                Concordo com os <a href="#" className="font-bold text-accent hover:underline">Termos de Utilização</a> e aceito a <a href="#" className="font-bold text-accent hover:underline">Política de Privacidade</a> relativa ao processamento dos meus dados operacionais e de IA.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              disabled={!termsAccepted}
              onClick={onComplete} 
              className="btn-accent h-[56px] text-[16px] shadow-lg disabled:opacity-30 disabled:pointer-events-none"
            >
              Acessar Dashboard <ArrowRight size={20}/>
            </button>
            <button className="h-[56px] rounded-[16px] border border-[var(--border)] bg-[var(--bg)] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[var(--surface)] transition-colors">
              <PlayCircle size={18} className="text-[var(--text-secondary)]" /> Iniciar Tutorial Interativo
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA: Síntese da Conta (ID Card) */}
        <div className="col-span-12 lg:col-span-7 flex justify-center relative">
          
          {/* Brilho de Fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 blur-[100px] pointer-events-none" />

          <motion.div 
            initial={{ scale: 0.9, rotateY: 10 }} animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-[480px] bg-[var(--bg)] border border-[var(--border)] rounded-[32px] shadow-2xl p-8 relative overflow-hidden z-10"
          >
            {/* Padrão de Fundo do Cartão */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,var(--text-primary)_1px,transparent_0)] bg-[size:16px_16px]" />

            <div className="relative z-10 flex items-start justify-between mb-8">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-[20px] bg-[var(--bg-subtle)] border border-[var(--border)] overflow-hidden shadow-sm">
                  {identity?.avatarPreview ? <img src={identity.avatarPreview} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-[var(--hz-black)]" />}
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-[var(--text-primary)]">@{identity?.username || 'usuario'}</h3>
                  <p className="text-[13px] font-medium text-[var(--text-secondary)]">{nexus?.roleInOrg || 'Independente'}</p>
                </div>
              </div>

              {/* Selos Adquiridos (Atuais) */}
              <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-1.5 p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] hover:border-accent transition-colors">
                <GoogleIcon name="verified" className="text-blue-500" />
                <GoogleIcon name="new_releases" className="text-orange-500" />
              </button>
            </div>

            <div className="space-y-5">
              <SynthesisRow label="Ambiente" value={nexus?.workspace || 'Espaço Pessoal'} />
              <SynthesisRow label="Nível de IA" value="Assistente Ativo" />
              
              <div className="pt-4 border-t border-[var(--border)]">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Stack Tecnológica</span>
                <div className="flex flex-wrap gap-2">
                  {safeData?.stack?.stack?.slice(0, 4).map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[11px] font-bold capitalize">
                      {tech}
                    </span>
                  ))}
                  {(!safeData?.stack?.stack || safeData?.stack?.stack?.length === 0) && (
                    <span className="text-[12px] text-[var(--text-secondary)] italic">Sem stack definida...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Código de Barras Decorativo */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex justify-between items-end">
               <div>
                  <span className="block text-[10px] text-[var(--text-secondary)] mb-1">Membro desde</span>
                  <span className="text-[14px] font-mono font-bold">2026</span>
               </div>
               <div className="flex gap-1 h-8 opacity-20 grayscale">
                 {[1,0,1,1,0,1,0,1,1,1,0,1,0,0,1].map((n, i) => (
                   <div key={i} className={`h-full bg-[var(--text-primary)] ${n ? 'w-1.5' : 'w-0.5'}`} />
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* DRAWER DE SELOS (BADGES) */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Selos de Verificação">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BadgeInfo icon="verified" color="text-blue-500" title="Identity Verified" desc="Identidade real confirmada por KYC." />
          <BadgeInfo icon="storefront" color="text-emerald-500" title="Official Brand" desc="Marca oficial registada." />
          <BadgeInfo icon="corporate_fare" color="text-indigo-500" title="Organization" desc="Empresa ou corporação validada." />
          <BadgeInfo icon="record_voice_over" color="text-purple-500" title="Public Figure" desc="Figura pública de alta relevância." />
          <BadgeInfo icon="shield" color="text-green-600" title="Trusted Seller" desc="Vendedor com alto índice de confiança." />
          <BadgeInfo icon="workspace_premium" color="text-yellow-500" title="Premium" desc="Subscritor do plano Horazion Pro." />
          <BadgeInfo icon="engineering" color="text-zinc-600" title="Staff" desc="Membro interno da equipa Horazion." />
          <BadgeInfo icon="rocket_launch" color="text-orange-500" title="Early Adopter" desc="Membro fundador (Beta Tester)." />
          <BadgeInfo icon="local_fire_department" color="text-red-500" title="Top Contributor" desc="Reputação de topo na comunidade." />
        </div>
      </Drawer>
    </>
  );
}

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

function SynthesisRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[13px] font-bold text-[var(--text-secondary)]">{label}</span>
      <span className="text-[14px] font-bold text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

// Simulação de Google Material Icons via SVG nativo para evitar problemas de fontes externas
function GoogleIcon({ name, className }: { name: string, className?: string }) {
  // Mapeamento preciso de SVGs baseados no Google Material Symbols Outlined
  const icons: any = {
    "verified": <path d="m8.6 22.5-1.9-3.2-3.6-.8.35-3.7L1 12l2.45-2.8-.35-3.7 3.6-.8 1.9-3.2L12 2.95l3.4-1.45 1.9 3.2 3.6.8-.35 3.7L23 12l-2.45 2.8.35 3.7-3.6.8-1.9 3.2-3.4-1.45zm2.35-6.95L16.6 9.9l-1.4-1.45-4.25 4.25-2.15-2.1L7.4 12z"/>,
    "storefront": <path d="M4 21V10.15l-1.6 1.45-1.4-1.45L12 1l11 9.15-1.4 1.45L20 10.15V21h-6v-6h-4v6zm2-2h2v-6h8v6h2v-8.45l-6-5-6 5zm-3.5-9.5h15l-7.5-6.25z"/>,
    "corporate_fare": <path d="M12 21V3H2v18zm2 0V7h8v14zm-2-2H4v-2h8zm0-4H4v-2h8zm0-4H4v-2h8zm0-4H4V5h8zm8 12h-4v-2h4zm0-4h-4v-2h4zm0-4h-4V7h4z"/>,
    "record_voice_over": <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>,
    "shield": <path d="M12 22q-3.475-1.4-5.738-4.7T4 10.2V5l8-3 8 3v5.2q0 3.825-2.262 7.1T12 22Zm0-2.1q2.6-1.15 4.3-3.925T18 10.2V6.65l-6-2.25-6 2.25V10.2q0 3.825 1.7 6.6T12 19.9Zm0-7.9Z"/>,
    "workspace_premium": <path d="m14.3 21.75-2.3-1.65-2.3 1.65.65-2.75-2.15-1.9 2.8-.25L12 14.3l1.1 2.55 2.8.25-2.15 1.9zm-2.3-9.45q-1.95 0-3.325-1.375T7.3 7.6q0-1.95 1.375-3.325T12 2.9q1.95 0 3.325 1.375T16.7 7.6q0 1.95-1.375 3.325T12 12.3Z"/>,
    "engineering": <path d="m19.5 10 2.5 5h-11l2.5-5zm-5-3.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5zm.5 15.5h-2v-4h2zm-4.75-1.5h-1.5v-2.5h-2.5v1.5h-1.5v-1.5H3.5v-1.5h1.25V13H3.5v-1.5h1.25V9H3.5V7.5h1.25V6H3.5V4.5h2.5V2H7.5v2.5h2.5V2h1.5v4h-1.5V4.5H7.5V6h1.25v1.5H7.5V9h1.25v2.5H7.5v1.5h1.25v1.5H7.5v4h1.5V17h1.25z"/>,
    "rocket_launch": <path d="M14 20q-.425 0-.712-.288T13 19v-2.5l-3.5-3.5V14l-2 2v2H6v-1.5L4.5 15h-2L4 13.5v-1.5L2 10.5V9l1.5-1.5H5v-2l1.5-1.5h1.5L9 5.5v2L11 9h1l3.5 3.5H18q.425 0 .713.288T19 13.5v1l2 2-2 2h-2v2l-2 2z"/>,
    "local_fire_department": <path d="M12 23q-2.8 0-5.15-1.275T3.35 18.3q-1.15-2.15-1.15-4.8 0-3.3 1.875-6.25T8.7 2.1L9 1.6l1.2.6q1 4.55 3.65 7.175T19 12.7v.8q0 3.95-2.775 6.725T9.5 23h2.5Zm0-2q2.9 0 4.95-2.05T19 14v-.2q-3.6-.9-5.8-3.425T9.9 4.3q-1.9 2-2.9 4.35T6 13.5q0 2.5 1.75 4.25T12 21Zm-1-4.5q1.05 0 1.775-.725T13.5 14q0-.15-.025-.3t-.075-.3L12 11.5l-1.3 1.8q-.15.2-.175.35t-.025.35q0 1.05.725 1.775T12 16.5Z"/>
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
      {icons[name]}
    </svg>
  );
}

function BadgeInfo({ icon, color, title, desc }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-[20px] bg-[var(--bg-subtle)] border border-[var(--border)] hover:border-accent transition-colors">
      <div className={`w-12 h-12 rounded-[14px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center ${color} shadow-sm`}>
        <GoogleIcon name={icon} />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-[var(--text-primary)]">{title}</h4>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}