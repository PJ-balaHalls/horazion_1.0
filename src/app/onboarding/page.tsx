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
  const [step, setStep] = useState(1); // Iniciando no 1 para testar o avatar
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    identity: { username: '', role: '', pronoun: '', sexuality: '', avatarBlob: null },
    nexus: { workspace: '', org: '' },
    links: { github: false, google: false, slack: false, notion: false },
    spectrum: { theme: 'system', accent: '#F00511' },
    intelligence: { focus: '' }
  });

  const nextStep = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleFinish = async () => {
    await saveOnboardingData(formData);
    window.location.href = '/dashboard';
  };

  return (
    <main className="h-screen w-full bg-[var(--bg)] text-[var(--text-primary)] relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700">
      
      {/* 1. DNA Progress Bar */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-center z-50">
        <div className="w-full max-w-[800px] flex gap-2">
          {Array.from({ length: totalSteps + 1 }).map((_, i) => (
            <div key={i} className="h-[4px] flex-1 bg-[var(--bg-subtle)] rounded-full overflow-hidden border border-[var(--border)]/50">
              <motion.div 
                className="h-full bg-[var(--hz-black)]"
                initial={{ width: "0%" }}
                animate={{ width: step >= i ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Centro Interativo (No-Scroll Viewport) */}
      <div className="w-full max-w-[1200px] h-full max-h-[700px] flex items-center justify-center p-6 z-10">
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
          {step === 2 && <Nexus key="ato2" data={formData.nexus} update={(d: any) => setFormData({...formData, nexus: d})} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <LinkScene key="ato3" data={formData.links} update={(d: any) => setFormData({...formData, links: d})} onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <Spectrum key="ato4" data={formData.spectrum} update={(d: any) => setFormData({...formData, spectrum: d})} onNext={nextStep} onBack={prevStep} />}
          {step === 5 && <Intelligence key="ato5" data={formData.intelligence} update={(d: any) => setFormData({...formData, intelligence: d})} onNext={nextStep} onBack={prevStep} />}
          {step === 6 && <Architecture key="ato6" onComplete={handleFinish} />}
        </AnimatePresence>
      </div>

      {/* 3. Global Gray Filtered Logo (Footer-ish) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-30">
        <img 
          src="/isologo/horazion.svg" 
          alt="Horazion DNA" 
          className="w-16 h-16 grayscale opacity-80" // Filtro cinza e opacidade baixa
        />
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none z-0" />
    </main>
  );
}