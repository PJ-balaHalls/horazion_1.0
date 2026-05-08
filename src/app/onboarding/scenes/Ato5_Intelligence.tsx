'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Sparkles, ShieldCheck, Zap, 
  ArrowRight, ArrowLeft, Code2, 
  FileText, LayoutTemplate, Clock
} from 'lucide-react';

export function Intelligence({ data, update, onNext, onBack }: any) {
  const [activeTab, setActiveTab] = useState<'agency' | 'focus' | 'privacy'>('agency');

  const updatePref = (key: string, value: any) => {
    update({ ...data, [key]: value });
  };

  const focusAreas = data.focusAreas || ['code_quality'];

  const toggleFocus = (id: string) => {
    const newFocus = focusAreas.includes(id) 
      ? focusAreas.filter((f: string) => f !== id) 
      : [...focusAreas, id];
    updatePref('focusAreas', newFocus);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="w-full grid grid-cols-12 gap-10 items-start h-[65vh] min-h-[550px] mt-10"
    >
      
      {/* COLUNA ESQUERDA: Navegação e Propósito */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full pt-4">
        <div className="space-y-3 mb-8">
          <h2 className="text-[36px] font-bold tracking-tighter leading-tight">Configuração de<br/>Inteligência.</h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
            Defina como a tecnologia deve auxiliar o seu fluxo. Escolha o nível de autonomia e as áreas de aprendizado.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <TabBtn 
            active={activeTab === 'agency'} onClick={() => setActiveTab('agency')} 
            icon={<Brain size={18}/>} label="Nível de Agência" subtitle="Autonomia e proatividade" 
          />
          <TabBtn 
            active={activeTab === 'focus'} onClick={() => setActiveTab('focus')} 
            icon={<Zap size={18}/>} label="Foco de Auxílio" subtitle="Onde a IA deve atuar" 
          />
          <TabBtn 
            active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} 
            icon={<ShieldCheck size={18}/>} label="Privacidade" subtitle="Segurança de dados" 
          />
        </div>

        <div className="mt-auto pt-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-[13px] font-bold opacity-40 hover:opacity-100 transition-all">
            <ArrowLeft size={16}/> Voltar
          </button>
          <button onClick={onNext} className="btn-accent px-10">
            Sincronizar <ArrowRight size={18}/>
          </button>
        </div>
      </div>

      {/* COLUNA DIREITA: Configurações Detalhadas */}
      <div className="col-span-12 lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-[32px] h-full shadow-[var(--shadow-sm)] flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto no-scrollbar p-10">
          <AnimatePresence mode="wait">
            
            {/* 1. NÍVEL DE AGÊNCIA */}
            {activeTab === 'agency' && (
              <motion.div key="agency" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <header className="mb-6">
                  <h3 className="text-[18px] font-bold">Autonomia do Sistema</h3>
                  <p className="text-[13px] text-[var(--text-secondary)]">O quão presente você deseja que a inteligência seja?</p>
                </header>

                <div className="grid grid-cols-1 gap-4">
                  <AgencyCard 
                    title="Observador Passivo" 
                    desc="A inteligência apenas observa e aprende com seus padrões. Ela não sugere nada a menos que você solicite explicitamente."
                    active={data.agency === 'monitor'} onClick={() => updatePref('agency', 'monitor')}
                  />
                  <AgencyCard 
                    title="Assistente de Fluxo" 
                    desc="Sugere correções de código, melhorias de design e organiza seus prazos. É o equilíbrio ideal para a maioria dos profissionais."
                    active={data.agency === 'assistant' || !data.agency} onClick={() => updatePref('agency', 'assistant')}
                    featured
                  />
                  <AgencyCard 
                    title="Piloto Automático" 
                    desc="Antecipa tarefas repetitivas, gera documentação automaticamente e sincroniza componentes entre design e código por conta própria."
                    active={data.agency === 'pilot'} onClick={() => updatePref('agency', 'pilot')}
                  />
                </div>
              </motion.div>
            )}

            {/* 2. FOCO DE AUXÍLIO E VIÉS CRIATIVO */}
            {activeTab === 'focus' && (
              <motion.div key="focus" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <header>
                  <h3 className="text-[18px] font-bold">Áreas de Especialização</h3>
                  <p className="text-[13px] text-[var(--text-secondary)]">Em quais frentes a inteligência deve priorizar o aprendizado?</p>
                </header>

                <div className="grid grid-cols-2 gap-4">
                  <FocusCard 
                    icon={<Code2/>} title="Qualidade de Código" 
                    active={focusAreas.includes('code_quality')} onClick={() => toggleFocus('code_quality')} 
                  />
                  <FocusCard 
                    icon={<FileText/>} title="Documentação" 
                    active={focusAreas.includes('docs')} onClick={() => toggleFocus('docs')} 
                  />
                  <FocusCard 
                    icon={<LayoutTemplate/>} title="Design System" 
                    active={focusAreas.includes('design')} onClick={() => toggleFocus('design')} 
                  />
                  <FocusCard 
                    icon={<Clock/>} title="Gestão de Prazos" 
                    active={focusAreas.includes('tasks')} onClick={() => toggleFocus('tasks')} 
                  />
                </div>

                {/* SLIDER DE VIÉS CRIATIVO PREMIUM */}
                <div className="pt-8 border-t border-[var(--border)] relative">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-[14px] font-bold">Viés Criativo</h4>
                    <span className="text-[12px] font-mono font-bold bg-[var(--bg-subtle)] px-2.5 py-1 rounded-md border border-[var(--border)] text-accent shadow-sm">
                      {data.creativity || 50}%
                    </span>
                  </div>
                  
                  <div className="relative h-2.5 bg-[var(--bg-subtle)] rounded-full border border-[var(--border)] shadow-inner">
                    {/* Linha preenchida */}
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-accent rounded-full pointer-events-none"
                      style={{ width: `${data.creativity || 50}%` }}
                    />
                    
                    {/* Input invisível funcional */}
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={data.creativity || 50}
                      onChange={(e) => updatePref('creativity', parseInt(e.target.value))}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {/* Botão (Thumb) Visual Magnético */}
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-accent rounded-full shadow-md pointer-events-none flex items-center justify-center"
                      style={{ left: `calc(${data.creativity || 50}% - 12px)` }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full opacity-50" />
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-[var(--text-tertiary)] tracking-widest">
                    <span>Lógico (Padrões)</span>
                    <span>Criativo (Inovação)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. PRIVACIDADE */}
            {activeTab === 'privacy' && (
              <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <div className="bg-accent-soft p-8 rounded-[28px] border-2 border-accent/20 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-[var(--hz-accent-fg)] flex items-center justify-center shadow-md">
                      <ShieldCheck size={24}/>
                    </div>
                    <h3 className="text-[20px] font-bold text-accent">Protocolo de Segurança</h3>
                    <p className="text-[14px] leading-relaxed opacity-90 text-accent">
                      Os seus dados de equipa e ficheiros de código são processados numa camada isolada. 
                      A inteligência utiliza criptografia ponta-a-ponta para garantir que o aprendizado seja restrito ao seu ambiente de trabalho.
                    </p>
                 </div>

                 <div className="space-y-3">
                    <PrivacyOption 
                      title="Processamento Local (Strict)" 
                      desc="Prioriza o uso de recursos da sua máquina para tarefas sensíveis."
                      active={data.privacy === 'strict'} onClick={() => updatePref('privacy', 'strict')}
                    />
                    <PrivacyOption 
                      title="Nuvem Otimizada (Performance)" 
                      desc="Utiliza os nossos clusters para máxima velocidade e potência de análise."
                      active={data.privacy === 'performance'} onClick={() => updatePref('privacy', 'performance')}
                    />
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// COMPONENTES AUXILIARES ESTILIZADOS
// ==========================================

function TabBtn({ active, onClick, icon, label, subtitle }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`text-left w-full p-4 rounded-[20px] border-2 transition-all flex items-center gap-4 group ${
        active 
        ? 'bg-accent-soft border-accent text-accent' 
        : 'border-transparent opacity-60 hover:opacity-100 hover:bg-[var(--surface)]'
      }`}
    >
      <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-colors ${active ? 'bg-accent text-[var(--hz-accent-fg)] shadow-sm' : 'bg-[var(--bg)] border border-[var(--border)]'}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-[14px] font-bold">{label}</h4>
        <p className={`text-[11px] ${active ? 'opacity-80' : 'text-[var(--text-tertiary)]'}`}>{subtitle}</p>
      </div>
    </button>
  );
}

function AgencyCard({ title, desc, active, onClick, featured }: any) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-[24px] border-2 transition-all relative overflow-hidden ${
        active 
        ? 'border-accent bg-accent-soft' 
        : 'border-[var(--border)] bg-[var(--bg)] opacity-70 hover:opacity-100'
      }`}
    >
      {featured && !active && (
        <div className="absolute top-0 right-0 bg-[var(--border)] text-[9px] font-bold uppercase px-3 py-1 rounded-bl-xl opacity-60">
          Recomendado
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <h4 className={`text-[16px] font-bold ${active ? 'text-accent' : 'text-[var(--text-primary)]'}`}>{title}</h4>
        {active && <Sparkles size={18} className="text-accent"/>}
      </div>
      <p className={`text-[13px] leading-relaxed ${active ? 'text-accent opacity-80' : 'text-[var(--text-secondary)]'}`}>
        {desc}
      </p>
    </div>
  );
}

function FocusCard({ icon, title, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-4 p-6 rounded-[24px] border-2 transition-all ${
        active 
        ? 'border-accent bg-accent-soft text-accent shadow-sm' 
        : 'border-[var(--border)] bg-[var(--bg)] opacity-60 hover:opacity-100'
      }`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-accent text-[var(--hz-accent-fg)]' : 'bg-[var(--surface)] text-[var(--text-tertiary)]'}`}>
        {icon}
      </div>
      <span className="text-[13px] font-bold">{title}</span>
    </button>
  );
}

function PrivacyOption({ title, desc, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-5 rounded-[20px] border-2 flex items-center justify-between transition-all ${
        active 
        ? 'border-accent bg-accent-soft' 
        : 'border-[var(--border)] bg-[var(--bg)] opacity-60 hover:opacity-100'
      }`}
    >
      <div className="flex-1 pr-4">
        <h4 className={`text-[14px] font-bold ${active ? 'text-accent' : 'text-[var(--text-primary)]'}`}>{title}</h4>
        <p className={`text-[12px] mt-1 ${active ? 'text-accent opacity-80' : 'text-[var(--text-secondary)]'}`}>{desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-accent' : 'border-[var(--border)]'}`}>
        {active && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
      </div>
    </div>
  );
}