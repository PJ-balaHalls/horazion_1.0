'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Type, Settings2, Moon, Sun, 
  Monitor, Check, ArrowRight, ArrowLeft,
  Eye, Brain, Bell, DownloadCloud
} from 'lucide-react';

export function Spectrum({ data, update, onNext, onBack }: any) {
  const [activeTab, setActiveTab] = useState<'visual' | 'reading' | 'behavior'>('visual');

  const updatePref = (key: string, value: any) => {
    update({ ...data, [key]: value });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', data.theme || 'dark');
    root.setAttribute('data-accent', data.accent || 'horazion');
    root.setAttribute('data-textsize', data.textSize || 'normal');
    root.setAttribute('data-dyslexia', data.dyslexia ? 'true' : 'false');
    root.setAttribute('data-allcaps', data.allCaps ? 'true' : 'false');
    
    const daltonismMap: Record<string, string> = {
      'nenhum': 'none',
      'protanopia': 'protanopia',
      'deuteranopia': 'deuteranopia',
      'tritanopia': 'tritanopia'
    };
    root.setAttribute('data-daltonism', daltonismMap[data.daltonism || 'nenhum'] || 'none');
  }, [data]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid grid-cols-12 gap-10 items-start h-[65vh] min-h-[550px]">
      
      {/* NAVEGAÇÃO LATERAL (Mais margem superior para respirar o perfil) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full pt-12">
        <div className="space-y-3 mb-8">
          <h2 className="text-[36px] font-bold tracking-tighter leading-tight">Aparência do<br/>Ambiente.</h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
            Adapte a plataforma aos seus olhos. Modifique cores, contrastes e comportamentos em tempo real.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <TabBtn active={activeTab === 'visual'} onClick={() => setActiveTab('visual')} icon={<Palette size={18}/>} label="Luz & Cor" />
          <TabBtn active={activeTab === 'reading'} onClick={() => setActiveTab('reading')} icon={<Type size={18}/>} label="Leitura & Foco" />
          <TabBtn active={activeTab === 'behavior'} onClick={() => setActiveTab('behavior')} icon={<Settings2 size={18}/>} label="Preferências" />
        </div>

        <div className="mt-auto pt-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-[13px] font-bold opacity-50 hover:opacity-100 transition-all">
            <ArrowLeft size={16}/> Voltar
          </button>
          <button onClick={onNext} className="btn-accent">
            Finalizar <ArrowRight size={18}/>
          </button>
        </div>
      </div>

      {/* PAINEL DE CONFIGURAÇÃO (Scroll suave e design apurado) */}
      <div className="col-span-12 lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-[32px] h-full shadow-[var(--shadow-sm)] flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto no-scrollbar p-10">
          <AnimatePresence mode="wait">
            
            {/* LUZ E COR */}
            {activeTab === 'visual' && (
              <motion.div key="visual" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <section className="space-y-5">
                  <header>
                    <h3 className="text-[16px] font-bold">Luz do Sistema</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">Defina o contraste base da plataforma.</p>
                  </header>
                  <div className="grid grid-cols-3 gap-4">
                    <ChoiceCard active={data.theme === 'light'} onClick={() => updatePref('theme', 'light')} icon={<Sun size={24}/>} label="Claro" />
                    <ChoiceCard active={data.theme === 'dark'} onClick={() => updatePref('theme', 'dark')} icon={<Moon size={24}/>} label="Escuro" />
                    <ChoiceCard active={data.theme === 'system'} onClick={() => updatePref('theme', 'system')} icon={<Monitor size={24}/>} label="Automático" />
                  </div>
                </section>

                <section className="space-y-5 pt-8 border-t border-[var(--border)]">
                  <header>
                    <h3 className="text-[16px] font-bold">Cor de Destaque</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">A sua assinatura em botões, links e gráficos.</p>
                  </header>
                  <div className="grid grid-cols-2 gap-4">
                    <AccentOption color="#161616" label="Padrão Horazion" active={data.accent === 'horazion'} onClick={() => updatePref('accent', 'horazion')} />
                    <AccentOption color="#E11D48" label="Vermelho" active={data.accent === 'red'} onClick={() => updatePref('accent', 'red')} />
                    <AccentOption color="#7C3AED" label="Roxo" active={data.accent === 'purple'} onClick={() => updatePref('accent', 'purple')} />
                    <AccentOption color="#0891B2" label="Ciano" active={data.accent === 'cyan'} onClick={() => updatePref('accent', 'cyan')} />
                  </div>
                </section>
              </motion.div>
            )}

            {/* LEITURA E FOCO */}
            {activeTab === 'reading' && (
              <motion.div key="reading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <section className="space-y-5">
                  <h3 className="text-[16px] font-bold">Escala da Interface</h3>
                  <div className="flex gap-4">
                    {['Small', 'Normal', 'Large'].map(s => (
                      <button 
                        key={s} onClick={() => updatePref('textSize', s.toLowerCase())}
                        className={`flex-1 h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${data.textSize === s.toLowerCase() ? 'border-accent bg-accent-soft' : 'border-[var(--border)] bg-[var(--bg)] hover:border-gray-400'}`}
                      >
                        <span className="font-bold" style={{ fontSize: s === 'Small' ? '12px' : s === 'Normal' ? '16px' : '20px' }}>Aa</span>
                        <span className="text-[11px] uppercase font-bold tracking-widest opacity-60">{s}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4 pt-8 border-t border-[var(--border)]">
                  <h3 className="text-[16px] font-bold mb-4">Acessibilidade</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <ToggleCard icon={<Eye size={20}/>} title="Fonte para Dislexia" desc="Altera a tipografia base para evitar confusão entre carateres." active={data.dyslexia} onClick={() => updatePref('dyslexia', !data.dyslexia)} />
                    <ToggleCard icon={<Type size={20}/>} title="Texto em Maiúsculas" desc="Força botões e títulos a usarem CAIXA ALTA." active={data.allCaps} onClick={() => updatePref('allCaps', !data.allCaps)} />
                  </div>
                </section>

                <section className="space-y-4 pt-8 border-t border-[var(--border)]">
                  <h3 className="text-[16px] font-bold">Filtro de Cores</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Nenhum', 'Protanopia', 'Deuteranopia', 'Tritanopia'].map(f => (
                      <button key={f} onClick={() => updatePref('daltonism', f.toLowerCase())} className={`px-5 py-2.5 rounded-full border-2 text-[13px] font-bold transition-all ${data.daltonism === f.toLowerCase() ? 'border-accent bg-accent' : 'border-[var(--border)] bg-[var(--bg)] opacity-60 hover:opacity-100'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* PREFERÊNCIAS COMPORTAMENTAIS */}
            {activeTab === 'behavior' && (
              <motion.div key="behavior" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  <FeatureCard 
                    icon={<Brain size={24} />}
                    title="Inteligência Artificial Ativa"
                    desc="Permitir que o sistema analise padrões para sugerir atalhos operacionais."
                    active={data.aiRecs !== false} // Default to true
                    onClick={() => updatePref('aiRecs', !data.aiRecs)}
                  />
                  <FeatureCard 
                    icon={<Bell size={24}/>}
                    title="Notificações Globais"
                    desc="Receber alertas sonoros e visuais sobre integrações e convites da equipa."
                    active={data.notifications !== false} // Default to true
                    onClick={() => updatePref('notifications', !data.notifications)}
                  />
                </div>

                <div className="p-8 rounded-[28px] border border-[var(--border)] bg-[var(--bg)] flex items-center justify-between">
                   <div className="flex items-center gap-5">
                     <div className="w-12 h-12 rounded-[16px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]"><DownloadCloud size={24}/></div>
                     <div>
                       <h4 className="text-[15px] font-bold">Exportação Base</h4>
                       <p className="text-[13px] text-[var(--text-secondary)] mt-1">Formato predefinido para relatórios.</p>
                     </div>
                   </div>
                   <div className="flex bg-[var(--surface)] p-1.5 rounded-[14px] border border-[var(--border)] gap-1">
                      {['PDF', 'JSON', 'CSV'].map(fmt => (
                        <button key={fmt} onClick={() => updatePref('exportFormat', fmt)} className={`px-5 py-2 rounded-[10px] text-[12px] font-bold transition-all ${data.exportFormat === fmt ? 'bg-accent shadow-md' : 'opacity-50 hover:opacity-100'}`}>{fmt}</button>
                      ))}
                   </div>
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
// COMPONENTES ATÓMICOS DE UI (USANDO CLASSES MÁGICAS)
// ==========================================

function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full p-4 rounded-[20px] border-2 transition-all flex items-center gap-3 ${active ? 'bg-accent-soft border-accent text-accent font-bold' : 'border-transparent opacity-60 hover:opacity-100 hover:bg-[var(--surface)]'}`}>
      {icon} <span className="text-[14px]">{label}</span>
    </button>
  );
}

function ChoiceCard({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-3 p-6 rounded-[24px] border-2 transition-all ${active ? 'border-accent bg-accent-soft text-accent' : 'border-[var(--border)] bg-[var(--bg)] opacity-60 hover:opacity-100'}`}>
      {icon} <span className="text-[12px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function AccentOption({ color, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all ${active ? 'border-accent bg-accent-soft' : 'border-[var(--border)] bg-[var(--bg)] opacity-60 hover:opacity-100'}`}>
      <div className="w-8 h-8 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: color }} />
      <span className={`text-[14px] font-bold ${active ? 'text-accent' : 'text-[var(--text-primary)]'}`}>{label}</span>
      {active && <Check size={18} className="ml-auto text-accent" />}
    </button>
  );
}

function ToggleCard({ icon, title, desc, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer p-6 rounded-[24px] border-2 flex items-center justify-between transition-all ${active ? 'border-accent bg-accent-soft' : 'border-[var(--border)] bg-[var(--bg)] opacity-80 hover:opacity-100'}`}>
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-colors ${active ? 'bg-accent' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]'}`}>
          {icon}
        </div>
        <div>
          <h4 className={`text-[15px] font-bold ${active ? 'text-accent' : 'text-[var(--text-primary)]'}`}>{title}</h4>
          <p className={`text-[12px] mt-1 ${active ? 'text-[var(--text-primary)] opacity-80' : 'text-[var(--text-secondary)]'}`}>{desc}</p>
        </div>
      </div>
      <div className={`w-14 h-8 rounded-full relative transition-colors duration-300 shadow-inner border border-black/5 ${active ? 'bg-accent' : 'bg-[var(--border)]'}`}>
        <motion.div className="absolute top-[3px] w-6 h-6 bg-white rounded-full shadow-sm" animate={{ x: active ? 28 : 3 }} />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-6 rounded-[28px] border-2 text-left space-y-4 transition-all w-full ${active ? 'border-accent bg-accent-soft' : 'border-[var(--border)] bg-[var(--bg)] opacity-70 hover:opacity-100'}`}>
      <div className="flex items-center justify-between">
        <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center transition-colors ${active ? 'bg-accent' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]'}`}>
          {icon}
        </div>
        {active && <div className="bg-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Ativado</div>}
      </div>
      <div>
        <h4 className={`font-bold text-[16px] ${active ? 'text-accent' : 'text-[var(--text-primary)]'}`}>{title}</h4>
        <p className={`text-[13px] mt-1.5 leading-relaxed ${active ? 'text-[var(--text-primary)] opacity-80' : 'text-[var(--text-secondary)]'}`}>{desc}</p>
      </div>
    </button>
  );
}