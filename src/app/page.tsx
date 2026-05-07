import Link from "next/link";
import { ArrowRight, Terminal, Layers, Cpu } from "lucide-react";

export default function HorazionLanding() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center relative overflow-hidden">
      
      {/* Navegação Topo */}
      <nav className="w-full max-w-[1200px] flex justify-between items-center p-6 z-10">
        <div className="text-[20px] font-bold text-[var(--text-primary)] tracking-tighter">
          HORAZION
        </div>
        <Link 
          href="/login" 
          className="h-[44px] px-6 rounded-[12px] border border-[var(--border)] flex items-center justify-center font-[600] text-[var(--text-primary)] hover:bg-[var(--hz-surface)] transition-all"
        >
          Entrar
        </Link>
      </nav>

      {/* 1. Hero Section - Engenharia de Precisão */}
      <section className="w-full max-w-[720px] pt-20 pb-16 px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#F00511] animate-pulse" />
          <span className="text-[12px] font-medium text-[var(--text-secondary)] uppercase tracking-widest">
            Infraestrutura Viva de UI
          </span>
        </div>
        
        <h1 className="text-[40px] md:text-[64px] leading-[1.1] font-[700] text-[var(--text-primary)] tracking-tight mb-6">
          Onde o Design se torna <br /> 
          <span className="text-transparent bg-clip-text bg-[var(--accent)]">DNA Digital.</span>
        </h1>
        
        <p className="text-[18px] leading-[28px] text-[var(--text-secondary)] mb-10 max-w-[600px] mx-auto">
          Elimine a discrepância entre o design conceitual e o código de produção. 
          Sincronização bidirecional em tempo real com zero lock-in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="h-[44px] px-8 rounded-[12px] bg-[var(--accent)] text-white font-[600] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full sm:w-auto">
            Iniciar Sincronia <ArrowRight size={18} />
          </Link>
          <button className="h-[44px] px-8 rounded-[12px] border border-[var(--border)] bg-transparent text-[var(--text-primary)] font-[600] hover:bg-[var(--hz-surface)] transition-colors w-full sm:w-auto">
            Ver Lab
          </button>
        </div>
      </section>

      {/* 2. Grid de Componentes - A Arquitetura de DNA */}
      <section className="w-full max-w-[1200px] py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
        <FeatureCard 
          icon={<Terminal size={24} />} 
          title="Studio" 
          desc="Editor visual onde decisões de design tornam-se propriedades semânticas." 
        />
        <FeatureCard 
          icon={<Cpu size={24} />} 
          title="Engine" 
          desc="Cérebro interpretativo que gera código React/TypeScript puro e acessível." 
        />
        <FeatureCard 
          icon={<Layers size={24} />} 
          title="Bridge" 
          desc="Sincronização CLI bidirecional (npx horazion sync) sem copiar e colar." 
        />
      </section>

      {/* 3. Status de Performance - Orçamento de Latência */}
      <div className="fixed bottom-8 left-8 hidden lg:block z-20">
        <div className="p-4 rounded-[16px] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)]">
          <div className="text-[10px] uppercase tracking-tighter text-[var(--text-tertiary)] mb-2 font-bold">
            Live Performance Metrics
          </div>
          <div className="space-y-1">
            <Metric label="API Latency" value="< 200ms" color="bg-green-500" />
            <Metric label="Render Sync" value="60 fps" color="bg-green-500" />
            <Metric label="Micro-interactions" value="< 15ms" color="bg-green-500" />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-[24px] rounded-[16px] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all group">
      <div className="w-12 h-12 rounded-[12px] bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-primary)] mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-[20px] font-[600] text-[var(--text-primary)] mb-3">{title}</h3>
      <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">{desc}</p>
    </div>
  );
}

function Metric({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between gap-8">
      <span className="text-[12px] text-[var(--text-secondary)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-mono font-bold text-[var(--text-primary)]">{value}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
      </div>
    </div>
  );
}