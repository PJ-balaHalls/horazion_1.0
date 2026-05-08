'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Awakening } from './scenes/Ato0_Awakening';
import { Identity } from './scenes/Ato1_Identity';
import { Nexus } from './scenes/Ato2_Nexus';
import { LinkScene } from './scenes/Ato3_Link';
import { Spectrum } from './scenes/Ato4_Spectrum';
import { Intelligence } from './scenes/Ato5_Intelligence';
import { Architecture } from './scenes/Ato6_Architecture';
import { saveOnboardingData } from './actions';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const totalSteps = 7;

  // Estado Global - Sincronização Automática entre Etapas
  const [formData, setFormData] = useState({
    identity: { 
      username: '', 
      role: '', 
      pronoun: '', 
      sexuality: '', 
      avatarBlob: null,     // O ficheiro real para o banco de dados
      avatarPreview: null   // A imagem para visualização na tela
    },
    nexus: { 
      workspace: '', 
      org: '', 
      roleInOrg: '', 
      functionInOrg: '', 
      mode: 'choice' 
    },
    links: { github: false, google: false, slack: false, notion: false },
    spectrum: { theme: 'system', accent: '#F00511' },
    intelligence: { focus: '' }
  });

  const nextStep = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleFinish = async () => {
    // Salva os dados finais e direciona para o painel principal
    await saveOnboardingData(formData);
    window.location.href = '/dashboard';
  };

  // Nomes simples e diretos para a barra de progresso
  const stepLabels = [
    "Início", 
    "Identidade", 
    "Equipe", 
    "Conexões", 
    "Aparência", 
    "Preferências", 
    "Preparando", 
    "Pronto"
  ];

  return (
    <main className="h-screen w-full bg-[var(--bg)] text-[var(--text-primary)] relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700">
      
      {/* 1. BARRA DE PROGRESSO ANIMADA */}
      <div className="absolute top-0 left-0 w-full p-8 flex flex-col items-center z-50">
        <div className="w-full max-w-[800px] flex gap-2">
          {Array.from({ length: totalSteps + 1 }).map((_, i) => (
            <div key={i} className="h-[4px] flex-1 bg-[var(--bg-subtle)] rounded-full overflow-hidden border border-[var(--border)]/30">
              <motion.div 
                className="h-full bg-[var(--hz-black)]"
                initial={{ width: "0%" }}
                animate={{ width: step >= i ? "100%" : "0%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          ))}
        </div>
        <motion.div 
          key={step} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="mt-4 text-[10px] font-mono font-bold tracking-[0.3em] text-[var(--text-tertiary)] uppercase flex items-center gap-3"
        >
          <span>Etapa {step.toString().padStart(2, '0')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
          <span>{stepLabels[step]}</span>
        </motion.div>
      </div>

      {/* 2. CABEÇALHO DO PERFIL (SINCRONIZADO E HUMANIZADO) */}
      {step > 0 && step < 6 && (
        <div className="absolute top-20 left-0 w-full flex justify-center z-40">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[20px] px-6 py-2 flex items-center gap-4 shadow-[var(--shadow-sm)]"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] overflow-hidden border border-[var(--border)] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {formData.identity.avatarPreview ? (
                  <motion.img 
                    key="avatar"
                    src={formData.identity.avatarPreview} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full h-full object-cover" 
                    alt="Foto de perfil"
                  />
                ) : (
                  <motion.div key="empty" className="w-full h-full bg-neutral-200" />
                )}
              </AnimatePresence>
            </div>
            <span className="text-[14px] font-mono font-bold">
              @{formData.identity.username || 'voce'}
            </span>
            <div className="h-3 w-[1px] bg-[var(--border)] mx-1" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-tertiary)]">
              Sincronizado
            </span>
          </motion.div>
        </div>
      )}

      {/* 3. ÁREA CENTRAL (SEM SCROLL) */}
      <div className="w-full max-w-[1200px] h-full flex items-center justify-center p-6 z-10">
        <AnimatePresence mode="wait">
          {step === 0 && <Awakening key="ato0" onNext={nextStep} />}
          {step === 1 && (
            <Identity 
              key="ato1" 
              data={formData.identity} 
              update={(d: any) => setFormData({...formData, identity: d})} 
              onNext={nextStep} 
            />
          )}
          {step === 2 && (
            <Nexus 
              key="ato2" 
              data={formData} 
              update={(d: any) => setFormData({...formData, nexus: d})} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 3 && (
            <LinkScene 
              key="ato3" 
              data={formData.links} 
              update={(d: any) => setFormData({...formData, links: d})} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 4 && (
            <Spectrum 
              key="ato4" 
              data={formData.spectrum} 
              update={(d: any) => setFormData({...formData, spectrum: d})} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 5 && (
            <Intelligence 
              key="ato5" 
              data={formData.intelligence} 
              update={(d: any) => setFormData({...formData, intelligence: d})} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 6 && (
            <Architecture 
              key="ato6" 
              data={formData}
              onComplete={handleFinish} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* 4. LOGO NO RODAPÉ (MARCA D'ÁGUA) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0 grayscale contrast-50">
        <img src="/isologo/horazion.svg" alt="Horazion" className="w-12 h-12" />
      </div>
    </main>
  );
}