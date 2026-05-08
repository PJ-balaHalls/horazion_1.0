'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Palette, Type, Settings2, Moon, Sun, Monitor, BrainCircuit, Bell, FileDown } from 'lucide-react';
import { ListSelector } from '@/components/ui/list-selector'; // O componente que criamos na etapa anterior

export function Spectrum({ data, update, onNext, onBack }: any) {
  const [activeTab, setActiveTab] = useState<'visual' | 'typography' | 'extras'>('visual');

  // Inicializa os dados com valores padrão caso estejam vazios
  const prefs = {
    theme: data.theme || 'dark',
    accent: data.accent || 'horizon',
    daltonism: data.daltonism || 'none',
    textSize: data.textSize || 'normal',
    dyslexia: data.dyslexia || false,
    allCaps: data.allCaps || false,
    communication: data.communication || 'Direta e Objetiva',
    exportFormat: data.exportFormat || 'PDF',
    notifications: data.notifications || 'Todas',
    aiRecs: data.aiRecs !== undefined ? data.aiRecs : true,
    ...data
  };

  const updatePref = (key: string, value: any) => {
    update({ ...prefs, [key]: value });
  };

  // EFEITO EM TEMPO REAL: Injeta os tokens diretamente no HTML
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', prefs.theme);
    root.setAttribute('data-accent', prefs.accent);
    root.setAttribute('data-textsize', prefs.textSize);
    root.setAttribute('data-dyslexia', prefs.dyslexia.toString());
    root.setAttribute('data-allcaps', prefs.allCaps.toString());
    
    // Opcional: Para daltonismo, você pode aplicar um filtro CSS global
    if (prefs.daltonism === 'protanopia') root.style.filter = 'url(#protanopia-filter)';
    else root.style.filter = 'none';

  }, [prefs]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="w-full grid grid-cols-12 gap-10 items-start h-[65vh] min-h-[500px]"
    >
      
      {/* COLUNA ESQUERDA: Navegação */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
        <div className="space-y-3 mb-8">
          <h2 className="text-[36px] font-bold tracking-tighter leading-tight">Molde o seu<br/>Ambiente.</h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
            Adapte a interface às suas necessidades. As alterações visuais refletem-se em tempo real.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <TabButton 
            active={activeTab === 'visual'} onClick={() => setActiveTab('visual')}
            icon={<Palette size={18} />} title="Visual & Cores" subtitle="Tema, paleta e filtros"
          />
          <TabButton 
            active={activeTab === 'typography'} onClick={() => setActiveTab('typography')}
            icon={<Type size={18} />} title="Tipografia" subtitle="Tamanho e acessibilidade"
          />
          <TabButton 
            active={activeTab === 'extras'} onClick={() => setActiveTab('extras')}
            icon={<Settings2 size={18} />} title="Comportamento" subtitle="Exportações, IA e Alertas"
          />
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between">
          <button onClick={onBack} className="text-[13px] font-bold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar
          </button>
          <button onClick={onNext} className="h-[48px] px-8 bg-[var(--hz-black)] text-white rounded-[16px] font-bold flex items-center gap-2 shadow-[var(--shadow-md)] hover:scale-[1.03] active:scale-[0.97] transition-all">
            Continuar <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* COLUNA DIREITA: Configurações (Com Scroll Interno) */}
      <div className="col-span-12 lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-[32px] h-full shadow-[var(--shadow-sm)] flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <AnimatePresence mode="wait">
            
            {/* ABA 1: VISUAL & CORES */}
            {activeTab === 'visual' && (
              <motion.div key="visual" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                
                {/* Tema Base */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold">Luz do Ambiente</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <ThemeCard icon={<Moon size={20}/>} label="Escuro" active={prefs.theme === 'dark'} onClick={() => updatePref('theme', 'dark')} />
                    <ThemeCard icon={<Sun size={20}/>} label="Claro" active={prefs.theme === 'light'} onClick={() => updatePref('theme', 'light')} />
                    <ThemeCard icon={<Monitor size={20}/>} label="Sistema" active={prefs.theme === 'system'} onClick={() => updatePref('theme', 'system')} />
                  </div>
                </div>

                {/* Paleta de Cores (Accent) */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold">Identidade de Destaque</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <AccentCard color="bg-[#F00511]" label="Horizon" active={prefs.accent === 'horizon'} onClick={() => updatePref('accent', 'horizon')} />
                    <AccentCard color="bg-[#8B5CF6]" label="Neon" active={prefs.accent === 'neon'} onClick={() => updatePref('accent', 'neon')} />
                    <AccentCard color="bg-[#06B6D4]" label="Cyber" active={prefs.accent === 'cyber'} onClick={() => updatePref('accent', 'cyber')} />
                  </div>
                </div>

                {/* Daltonismo */}
                <div className="space-y-4 border-t border-[var(--border)] pt-6">
                  <h3 className="text-[16px] font-bold">Filtros de Acessibilidade</h3>
                  <ListSelector 
                    label="Modo de Daltonismo"
                    options={['Nenhum', 'Protanopia (Vermelho/Verde)', 'Deuteranopia (Verde/Vermelho)', 'Tritanopia (Azul/Amarelo)']}
                    value={prefs.daltonism}
                    onChange={(val) => updatePref('daltonism', val)}
                  />
                </div>
              </motion.div>
            )}

            {/* ABA 2: TIPOGRAFIA & LEITURA */}
            {activeTab === 'typography' && (
              <motion.div key="type" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-[16px] font-bold">Escala de Texto</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <TextSizeCard label="Pequeno" sizeClass="text-[12px]" active={prefs.textSize === 'small'} onClick={() => updatePref('textSize', 'small')} />
                    <TextSizeCard label="Normal" sizeClass="text-[16px]" active={prefs.textSize === 'normal'} onClick={() => updatePref('textSize', 'normal')} />
                    <TextSizeCard label="Grande" sizeClass="text-[20px]" active={prefs.textSize === 'large'} onClick={() => updatePref('textSize', 'large')} />
                  </div>
                </div>

                <div className="space-y-4 border-t border-[var(--border)] pt-6">
                  <h3 className="text-[16px] font-bold">Assistência de Leitura</h3>
                  
                  <ToggleOption 
                    title="Modo Dislexia" 
                    desc="Altera a fonte do sistema para otimizar a legibilidade (OpenDyslexic)."
                    active={prefs.dyslexia} 
                    onToggle={() => updatePref('dyslexia', !prefs.dyslexia)} 
                  />
                  
                  <ToggleOption 
                    title="Tudo em Maiúsculas (All Caps)" 
                    desc="Força textos de interface para letras maiúsculas para maior distinção."
                    active={prefs.allCaps} 
                    onToggle={() => updatePref('allCaps', !prefs.allCaps)} 
                  />
                </div>
              </motion.div>
            )}

            {/* ABA 3: COMPORTAMENTO EXTRAS */}
            {activeTab === 'extras' && (
              <motion.div key="extras" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ListSelector 
                    label="Tom de Comunicação da IA"
                    options={['Direta e Objetiva', 'Detalhada e Analítica', 'Amigável e Empática']}
                    value={prefs.communication}
                    onChange={(val) => updatePref('communication', val)}
                  />

                  <ListSelector 
                    label="Exportação Padrão"
                    options={['PDF', 'CSV', 'JSON']}
                    value={prefs.exportFormat}
                    onChange={(val) => updatePref('exportFormat', val)}
                  />

                  <ListSelector 
                    label="Nível de Notificações"
                    options={['Todas as atividades', 'Apenas Menções Diretas', 'Silêncio Total']}
                    value={prefs.notifications}
                    onChange={(val) => updatePref('notifications', val)}
                  />
                </div>

                <div className="space-y-4 border-t border-[var(--border)] pt-6">
                  <h3 className="text-[16px] font-bold flex items-center gap-2">
                    <BrainCircuit size={18} className="text-[var(--hz-accent)]" /> 
                    Inteligência Artificial
                  </h3>
                  <ToggleOption 
                    title="Recomendações Pró-ativas" 
                    desc="Permitir que a IA analise o seu fluxo de trabalho e sugira atalhos ou otimizações em tempo real."
                    active={prefs.aiRecs} 
                    onToggle={() => updatePref('aiRecs', !prefs.aiRecs)} 
                  />
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ==========================================
// COMPONENTES ATÓMICOS
// ==========================================

function TabButton({ active, onClick, icon, title, subtitle }: any) {
  return (
    <button onClick={onClick} className={`text-left w-full p-4 rounded-[20px] border transition-all flex items-center gap-4 group ${active ? 'bg-[var(--surface)] border-[var(--border)] shadow-[var(--shadow-sm)]' : 'bg-transparent border-transparent hover:bg-[var(--bg-subtle)] hover:border-[var(--border)]'}`}>
      <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-colors ${active ? 'bg-[var(--hz-black)] text-white shadow-md' : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`text-[14px] font-bold ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{title}</h4>
        <p className="text-[12px] text-[var(--text-tertiary)] mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}

function ThemeCard({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-[20px] border transition-all ${active ? 'bg-[var(--bg-subtle)] border-[var(--hz-black)] shadow-[var(--shadow-sm)] text-[var(--hz-black)]' : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
      <div className="mb-2">{icon}</div>
      <span className="text-[12px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function AccentCard({ color, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer flex items-center gap-3 p-4 rounded-[20px] border transition-all ${active ? 'bg-[var(--bg-subtle)] border-[var(--hz-black)] shadow-[var(--shadow-sm)]' : 'bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-secondary)]'}`}>
      <div className={`w-6 h-6 rounded-full ${color} shadow-inner`} />
      <span className={`text-[13px] font-bold ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{label}</span>
    </div>
  );
}

function TextSizeCard({ label, sizeClass, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer flex items-center justify-center p-4 rounded-[20px] border transition-all h-[80px] ${active ? 'bg-[var(--bg-subtle)] border-[var(--hz-black)] shadow-[var(--shadow-sm)] text-[var(--text-primary)]' : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'}`}>
      <span className={`font-medium ${sizeClass}`}>Aa</span>
    </div>
  );
}

function ToggleOption({ title, desc, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-[20px] bg-[var(--bg)] border border-[var(--border)]">
      <div className="pr-4">
        <h4 className="text-[14px] font-bold text-[var(--text-primary)]">{title}</h4>
        <p className="text-[12px] text-[var(--text-secondary)] mt-1">{desc}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 shrink-0 ${active ? 'bg-[var(--hz-accent)]' : 'bg-[var(--border)]'}`}
      >
        <motion.div 
          layout
          className="w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: active ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}