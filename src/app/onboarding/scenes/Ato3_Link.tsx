'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Blocks, Layers, Check, Plus, ChevronDown, Sparkles } from 'lucide-react';

export function LinkScene({ data, update, onNext, onBack }: any) {
  const [activeTab, setActiveTab] = useState<'extensions' | 'stack' | 'horazion'>('extensions');

  const extensions = data.extensions || [];
  const stack = data.stack || [];

  const toggleExtension = (id: string) => {
    const newExt = extensions.includes(id) ? extensions.filter((e: string) => e !== id) : [...extensions, id];
    update({ ...data, extensions: newExt });
  };

  const toggleStack = (id: string) => {
    const newStack = stack.includes(id) ? stack.filter((s: string) => s !== id) : [...stack, id];
    update({ ...data, stack: newStack });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="w-full grid grid-cols-12 gap-10 items-start h-[65vh] min-h-[500px]" // Altura controlada para não colidir com o perfil
    >
      
      {/* COLUNA ESQUERDA: Navegação e Contexto */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
        <div className="space-y-3 mb-8">
          <h2 className="text-[36px] font-bold tracking-tighter leading-tight">Monte o seu<br/>Ecossistema.</h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
            Centralize as suas ferramentas. Escolha o que deseja integrar para que o ambiente trabalhe por si.
          </p>
        </div>

        {/* Abas de Navegação */}
        <div className="flex flex-col gap-3">
          <TabButton 
            active={activeTab === 'extensions'} onClick={() => setActiveTab('extensions')}
            icon={<Blocks size={18} />} title="Integrações" subtitle="Ferramentas externas"
          />
          <TabButton 
            active={activeTab === 'stack'} onClick={() => setActiveTab('stack')}
            icon={<Layers size={18} />} title="Stack de Trabalho" subtitle="Tecnologias e linguagens"
          />
          <TabButton 
            active={activeTab === 'horazion'} onClick={() => setActiveTab('horazion')}
            icon={<Sparkles size={18} />} title="Loja Horazion" subtitle="Extensões nativas exclusivas"
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

      {/* COLUNA DIREITA: Área de Conteúdo (Scroll Interno Elegante) */}
      <div className="col-span-12 lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] rounded-[32px] h-full shadow-[var(--shadow-sm)] flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <AnimatePresence mode="wait">
            
            {/* 1. ABA DE INTEGRAÇÕES EXTERNAS */}
            {activeTab === 'extensions' && (
              <motion.div key="ext" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[18px] font-bold">Catálogo de Ferramentas</h3>
                  <span className="text-[12px] font-medium text-[var(--text-secondary)] bg-[var(--bg)] px-3 py-1 rounded-full border border-[var(--border)]">{extensions.length} Conectadas</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <ExtensionCard 
                    icon={<GithubIcon />} name="GitHub" connected={extensions.includes('github')} onClick={() => toggleExtension('github')}
                    description="Sincronização direta de repositórios e branches."
                    why="Ao conectar o GitHub, o painel passará a exibir métricas de commits, status de deploys e pull requests pendentes em tempo real. Ideal para equipas de engenharia manterem o rastro do código sem trocar de aba."
                  />
                  <ExtensionCard 
                    icon={<FigmaIcon />} name="Figma" connected={extensions.includes('figma')} onClick={() => toggleExtension('figma')}
                    description="Protótipos e tokens de design no seu ambiente."
                    why="A integração permite visualizar frames ao vivo. No futuro, a inteligência do sistema conseguirá extrair tokens de design (cores, tipografia) diretamente dos seus ficheiros Figma para o código."
                  />
                  <ExtensionCard 
                    icon={<SlackIcon />} name="Slack" connected={extensions.includes('slack')} onClick={() => toggleExtension('slack')}
                    description="Notificações e comandos canalizados."
                    why="Receba alertas de falhas, novos convites e relatórios diretamente num canal do Slack. Pode também usar comandos (ex: /horazion status) para consultar a saúde da sua operação remotamente."
                  />
                  <ExtensionCard 
                    icon={<NotionIcon />} name="Notion" connected={extensions.includes('notion')} onClick={() => toggleExtension('notion')}
                    description="Gestão de conhecimento centralizada."
                    why="Sincronize as suas bases de dados do Notion. Documentações técnicas, roadmaps e tarefas transformam-se em blocos de informação vivos dentro do seu painel."
                  />
                </div>
              </motion.div>
            )}

            {/* 2. ABA DE STACK DE TRABALHO */}
            {activeTab === 'stack' && (
              <motion.div key="stack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold">Definição de Stack</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] mt-1">Selecione as tecnologias base da sua equipa.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Linguagens e Frameworks */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] pl-1">Linguagens & Front-end</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      <TechCard icon={<NextIcon />} name="Next.js" active={stack.includes('nextjs')} onClick={() => toggleStack('nextjs')} />
                      <TechCard icon={<ReactIcon />} name="React" active={stack.includes('react')} onClick={() => toggleStack('react')} />
                      <TechCard icon={<VueIcon />} name="Vue.js" active={stack.includes('vue')} onClick={() => toggleStack('vue')} />
                      <TechCard icon={<TsIcon />} name="TypeScript" active={stack.includes('typescript')} onClick={() => toggleStack('typescript')} />
                      <TechCard icon={<PythonIcon />} name="Python" active={stack.includes('python')} onClick={() => toggleStack('python')} />
                      <TechCard icon={<NodeIcon />} name="Node.js" active={stack.includes('nodejs')} onClick={() => toggleStack('nodejs')} />
                    </div>
                  </div>

                  {/* UI e Estilização */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] pl-1">Estilização & UI</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      <TechCard icon={<TailwindIcon />} name="Tailwind" active={stack.includes('tailwind')} onClick={() => toggleStack('tailwind')} />
                      <TechCard icon={<CssIcon />} name="CSS / SCSS" active={stack.includes('css')} onClick={() => toggleStack('css')} />
                    </div>
                  </div>

                  {/* Infra e BD */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] pl-1">Infraestrutura & Base de Dados</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      <TechCard icon={<SupabaseIcon />} name="Supabase" active={stack.includes('supabase')} onClick={() => toggleStack('supabase')} />
                      <TechCard icon={<PostgresIcon />} name="PostgreSQL" active={stack.includes('postgres')} onClick={() => toggleStack('postgres')} />
                      <TechCard icon={<MongoIcon />} name="MongoDB" active={stack.includes('mongo')} onClick={() => toggleStack('mongo')} />
                      <TechCard icon={<AwsIcon />} name="AWS" active={stack.includes('aws')} onClick={() => toggleStack('aws')} />
                      <TechCard icon={<DockerIcon />} name="Docker" active={stack.includes('docker')} onClick={() => toggleStack('docker')} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. ABA LOJA HORAZION (EM BREVE) */}
            {activeTab === 'horazion' && (
              <motion.div key="hz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-bold">Ecossistema Horazion</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] mt-1">Módulos nativos construídos com a nossa Engenharia de Precisão.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HorazionStoreCard 
                    title="Horazion Analytics" desc="Métricas avançadas de performance, heatmaps e análise de comportamento dos utilizadores em tempo real."
                  />
                  <HorazionStoreCard 
                    title="Design to Code" desc="Sincronização mágica: converta tokens visuais do seu ambiente em código React/Tailwind limpo."
                  />
                  <HorazionStoreCard 
                    title="Multiplayer Sync" desc="Transforme o seu painel numa zona de colaboração com cursores ao vivo, comentários contextuais e partilha instantânea."
                  />
                  <HorazionStoreCard 
                    title="Automate AI" desc="Agentes autônomos que organizam tarefas, sugerem otimizações de código e redigem documentação baseada nas suas atividades."
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        
        {/* Degradê de fade no fundo do scroll para elegância */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ==========================================
// COMPONENTES ATÓMICOS
// ==========================================

function TabButton({ active, onClick, icon, title, subtitle }: any) {
  return (
    <button 
      onClick={onClick}
      className={`text-left w-full p-4 rounded-[20px] border transition-all flex items-center gap-4 group ${
        active 
        ? 'bg-[var(--surface)] border-[var(--border)] shadow-[var(--shadow-sm)]' 
        : 'bg-transparent border-transparent hover:bg-[var(--bg-subtle)] hover:border-[var(--border)]'
      }`}
    >
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

function ExtensionCard({ icon, name, description, why, connected, onClick }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col p-5 rounded-[24px] border transition-all ${connected ? 'border-[var(--hz-black)] bg-[var(--bg-subtle)]' : 'border-[var(--border)] bg-[var(--bg)] hover:border-gray-400'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[16px] bg-white border border-[var(--border)] flex items-center justify-center shadow-sm">
            {icon}
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-[var(--text-primary)]">{name}</h4>
            <p className="text-[13px] text-[var(--text-secondary)]">{description}</p>
          </div>
        </div>
        <button onClick={onClick} className={`h-[36px] px-4 rounded-[10px] font-bold text-[12px] flex items-center gap-2 transition-all ${connected ? 'bg-white text-[var(--hz-black)] border border-[var(--border)] shadow-sm' : 'bg-[var(--hz-black)] text-white hover:scale-105'}`}>
          {connected ? <><Check size={14}/> Integrado</> : <><Plus size={14}/> Conectar</>}
        </button>
      </div>
      
      {/* Accordion Animado para o "Porquê" */}
      <div className="mt-2 border-t border-[var(--border)] pt-2">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-[12px] font-bold text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors py-2 outline-none">
          <span>Como e porquê integrar?</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed pt-2 pb-2">
                {why}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TechCard({ icon, name, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer flex items-center gap-3 p-3 rounded-[16px] border transition-all ${active ? 'bg-[var(--surface)] border-[var(--hz-black)] shadow-[var(--shadow-sm)]' : 'bg-[var(--bg)] border-[var(--border)] hover:border-gray-400'}`}>
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 shadow-sm">{icon}</div>
      <span className={`text-[13px] font-bold ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{name}</span>
      {active && <motion.div layoutId={`dot-${name}`} className="w-2 h-2 rounded-full bg-[var(--hz-black)] ml-auto mr-2" />}
    </div>
  );
}

function HorazionStoreCard({ title, desc }: any) {
  return (
    <div className="p-6 rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--bg-subtle)] relative overflow-hidden group">
      <div className="absolute top-4 right-4 bg-[var(--hz-black)] text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-md">
        Em Breve
      </div>
      <div className="w-10 h-10 rounded-[12px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-4 text-[var(--hz-black)]">
        <Sparkles size={18} />
      </div>
      <h4 className="text-[16px] font-bold mb-2 text-[var(--text-primary)]">{title}</h4>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </div>
  );
}

// ==========================================
// ÍCONES COM CORES REAIS DAS MARCAS
// ==========================================

function GithubIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>; }
function FigmaIcon() { return <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#F24E1E" d="M12 12a3.5 3.5 0 1 1 0-7h-3.5A3.5 3.5 0 0 1 12 5h3.5A3.5 3.5 0 0 1 19 8.5 3.5 3.5 0 0 1 15.5 12H12z"/><path fill="#A259FF" d="M8.5 12A3.5 3.5 0 0 1 12 8.5 3.5 3.5 0 0 1 15.5 12 3.5 3.5 0 0 1 12 15.5 3.5 3.5 0 0 1 8.5 12z"/><path fill="#1ABCFE" d="M12 15.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"/><path fill="#0ACF83" d="M8.5 12A3.5 3.5 0 0 0 5 15.5 3.5 3.5 0 0 0 8.5 19V12z"/><path fill="#FF7262" d="M5 8.5A3.5 3.5 0 0 1 8.5 5H12v7H8.5A3.5 3.5 0 0 1 5 8.5z"/></svg>; }
function SlackIcon() { return <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/><path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/><path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1 2.521-2.52A2.528 2.528 0 0 1 13.876 5.042a2.527 2.527 0 0 1-2.521 2.52h-2.521v-2.52z"/><path fill="#36C5F0" d="M8.834 6.313a2.527 2.527 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V0a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 8.834 0v6.313z"/><path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"/><path fill="#2EB67D" d="M17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.521A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.521v6.313z"/><path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1-2.523 2.522A2.528 2.528 0 0 1 10.12 18.956a2.527 2.527 0 0 1 2.522-2.521h2.523v2.521z"/><path fill="#ECB22E" d="M15.165 17.688a2.527 2.527 0 0 1 2.523-2.523 2.527 2.527 0 0 1 2.52 2.523V24a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.523-2.522v-6.312z"/></svg>; }
function NotionIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M4.459 4.208c.746.064 1.157.301 1.48.91l2.585 5.56-1.503 6.942c-.087.352-.303.626-.826.66l-1.637.106v.737h5.452v-.737l-1.282-.103c-.56-.057-.79-.344-.658-.876l1.325-6.073 4.417 7.67.243.118V6.51c0-.52-.162-.777-.731-.832L12.164 5.6v-.737h4.869v.737l-1.047.086c-.528.055-.71.272-.71.802v10.66l-5.61-9.522 1.055-4.856c.117-.468.375-.688.892-.728l1.32-.1V4.21H4.459zM22.094 2.872v18.067L1.906 23.414V5.158l20.188-2.286zm-19.123 2.5v16.924l18.058-2.162V4.025L2.971 5.372z"/></svg>; }
function NextIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5zm0 1.5C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-2.25-15h2.25v6h-2.25v-6zM15 9h2.25v6H15V9z"/></svg>; }
function ReactIcon() { return <svg width="24" height="24" viewBox="-11.5 -10.232 23 20.463"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>; }
function TailwindIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>; }
function TsIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12 12.375h-2.25v6h-2.25v-6H5.25v-1.875H12v1.875zm6.75 6.375c-2.07 0-3.375-1.14-3.375-3h2.25c0 .645.465 1.125 1.125 1.125.645 0 1.05-.33 1.05-.81 0-.54-.42-.75-1.605-1.08-1.575-.42-2.52-1.2-2.52-2.73 0-1.62 1.23-2.85 3.15-2.85 1.935 0 3.165 1.11 3.165 2.85h-2.25c0-.6-.39-1.02-1.02-1.02-.54 0-.87.315-.87.75 0 .51.375.69 1.455 1.005 1.74.51 2.685 1.245 2.685 2.82 0 1.74-1.29 2.94-3.24 2.94z"/></svg>; }
function PythonIcon() { return <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#3776AB" d="M11.96 1.025c-5.58 0-5.32 2.4-5.32 2.4l.02 2.48h5.36v1.14H6.55s-2.54.02-2.54 3.44c0 3.4 2.22 3.4 2.22 3.4h1.16v-1.62s-.06-1.92 1.86-1.92h3.64s1.82-.04 1.82-1.74V4.14s.1-2.38-2.75-3.115zm-2.06 1.83a.92.92 0 0 1 .92.92.92.92 0 0 1-.92.92.92.92 0 0 1-.92-.92.92.92 0 0 1 .92-.92z"/><path fill="#FFD43B" d="M12.08 22.995c5.58 0 5.32-2.4 5.32-2.4l-.02-2.48H12v-1.14h5.48s2.54-.02 2.54-3.44c0-3.4-2.22-3.4-2.22-3.4h-1.16v1.62s.06 1.92-1.86 1.92h-3.64s-1.82.04-1.82 1.74v4.44s-.1 2.38 2.75 3.115zm2.06-1.83a.92.92 0 0 1-.92-.92.92.92 0 0 1 .92-.92.92.92 0 0 1 .92.92.92.92 0 0 1-.92.92z"/></svg>; }
function NodeIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#339933"><path d="M11.986 0L.114 6.843v10.313L11.986 24l11.898-6.843V6.843L11.986 0zm9.467 15.748L11.986 21.2l-9.466-5.452V8.252l9.466-5.453 9.467 5.453v7.496zm-9.52-1.341c-2.306 0-3.155-1.135-3.155-2.85v-.773h2.368v.693c0 1.05.352 1.258 1.133 1.258.834 0 1.109-.327 1.109-1.077 0-1.815-4.542-1.25-4.542-4.502 0-1.782 1.34-2.868 3.51-2.868 2.35 0 3.327 1.085 3.327 2.825v.558h-2.35v-.61c0-.986-.34-1.157-1.047-1.157-.773 0-1.025.328-1.025 1.01 0 1.714 4.542 1.187 4.542 4.49 0 1.83-1.31 2.998-3.87 2.998zm8.016-8.52h-2.45v5.828c0 1.127-.478 1.488-1.347 1.488-.816 0-1.133-.36-1.133-1.46V5.887h-2.45v6.527c0 2.227 1.144 3.033 2.903 3.033 1.182 0 1.956-.55 2.477-1.53v1.39h2V5.887z"/></svg>; }
function VueIcon() { return <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#4FC08D" d="M12 20.893L1.517 2.76H5.4l6.6 11.411L18.6 2.76h3.882z"/><path fill="#35495E" d="M12 11.41l-3.3-5.714h-3.883L12 18.257l7.183-12.56h-3.883z"/></svg>; }
function SupabaseIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>; }
function PostgresIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#4169E1"><path d="M12.012 0C5.39 0 .018 5.373.018 11.996c0 6.623 5.372 11.996 11.994 11.996 6.623 0 11.996-5.373 11.996-11.996C24.008 5.373 18.635 0 12.012 0zm-1.89 2.502c1.785.498 3.551 1.748 4.796 3.498-2.613-.248-5.392-.248-8.005 0 1.245-1.75 3.01-3 4.795-3.498H10.12zm7.498 4.542c1.74 2.292 2.58 4.885 2.58 7.496H17.61c0-2.458-.8-4.887-2.316-6.996 1.054-.347 1.956-.5 2.316-.5zm-14.996 0c.36 0 1.262.153 2.316.5C3.414 9.65 2.614 12.08 2.614 14.538H.034c0-2.61.84-5.204 2.58-7.496zm6.398 2.506h1.098c2.458 0 4.498.747 4.498 3.498 0 2.75-2.04 3.497-4.498 3.497h-1.098v4.996H9.012V9.55zm2.148 1.998v2.996h-.59v-2.996h.59z"/></svg>; }
function AwsIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9900"><path d="M14.07 15.61c-1.39 1.15-3.23 1.77-5.11 1.77-2.93 0-5.16-1.57-5.16-4.22 0-2.58 1.93-3.92 5.61-3.92h2.24v-.7c0-1.57-.7-2.43-2.67-2.43-1.4 0-3.03.6-4.09 1.44l-1.3-2.6c1.38-1.07 3.61-1.63 5.86-1.63 3.96 0 5.6 1.83 5.6 5v6.52h-2.97v-1.92v.69zm-2.88-4.66h-1.97c-1.83 0-2.68.6-2.68 1.63 0 .97.66 1.5 1.93 1.5 1.45 0 2.45-.66 2.72-1.58v-1.55zM21.1 20.6c-2.3 1.8-6.1 2.8-9.9 2.8-4.3 0-8.2-1.2-11.2-3.3.4-.2.8-.5 1.1-.9 2.7 1.8 6.2 2.8 9.9 2.8 3.5 0 6.8-.9 8.8-2.3l1.3.9z"/></svg>; }
function DockerIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#2496ED"><path d="M11.603 14.288h-1.69v1.652h1.69v-1.652zm-1.87-3.34h-1.692v1.652h1.691V10.95zm-3.738 3.34h-1.69v1.652h1.69v-1.652zm0-3.34h-1.69v1.652h1.69V10.95zm0-3.336h-1.69v1.65h1.69v-1.65zm-3.74 3.336H.565v1.652h1.69V10.95zm14.184.223h-1.55l-.47-1.127H18.25l-.472 1.127h-1.55v2.96h1.55l.47-1.127h1.467l.47 1.127h1.55v-2.96zm-2.02.77l.552-1.32.553 1.32h-1.104zM11.604 7.612h-1.69v1.65h1.69v-1.65zm3.74 3.338h-1.69v1.652h1.69v-1.652zm0-3.338h-1.69v1.65h1.69v-1.65zm0-3.34h-1.69V5.92h1.69V4.272zm-3.74 3.34h-1.69v1.65h1.69v-1.65zM23.136 9.38l-1.077 1.054c.266.602.404 1.258.404 1.93 0 2.502-2.186 4.54-4.882 4.54H.416a.377.377 0 0 1-.377-.378c0-.206.17-.376.377-.376h17.165c2.088 0 3.785-1.642 3.785-3.666 0-.583-.146-1.144-.423-1.64l-1.082 1.055a.378.378 0 0 1-.527-.542l1.698-1.655a.38.38 0 0 1 .527.001l1.698 1.655a.377.377 0 0 1 .168.307.38.38 0 0 1-.29.355z"/></svg>; }
function CssIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.16l.24-2.65H4.99l-.24 2.65h13.84zM5.23 6.81l.24 2.65h10.95l-.65 7.21-3.79 1.05-3.8-1.05-.23-2.58H5.21l.4 4.54 6.36 1.77 6.35-1.77 1.06-11.82H5.23z"/></svg>; }
function MongoIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="#47A248"><path d="M12.919 13.921c.54 1.056.906 2.052 1.096 2.946.331 1.554.269 2.509-.234 3.125-.494.605-1.298.718-1.854.718h-.129c-.556 0-1.36-.113-1.854-.718-.503-.616-.565-1.571-.234-3.125.19-.894.556-1.89 1.096-2.946l2.114-4.887 2.114 4.887zM11.927.001C6.012 3.82.793 6.953.793 11.232c0 4.148 3.513 8.358 7.391 10.362 1.493.771 3.238 1.411 3.743 1.954.505-.543 2.25-1.183 3.743-1.954 3.878-2.004 7.391-6.214 7.391-10.362 0-4.279-5.219-7.412-11.134-11.231z"/></svg>; }