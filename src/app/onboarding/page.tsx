'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Awakening } from '@/components/onboarding/scenes/Ato0_Awakening';
import { Identity } from '@/components/onboarding/scenes/Ato1_Identity';
import { Nexus } from '@/components/onboarding/scenes/Ato2_Nexus';
import { Spectrum } from '@/components/onboarding/scenes/Ato4_Spectrum';
import { Architecture } from '@/components/onboarding/scenes/Ato6_Architecture';
import { saveOnboardingData } from './actions';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    identity: { name: '', role: '', pronoun: '', age: 18, avatar: '' },
    nexus: { workspace: '', org: '' },
    spectrum: { theme: 'dark', accent: '#F00511' }
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Orquestração de transição de cena
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] relative overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 && <Awakening key="step0" onComplete={nextStep} />}
        {step === 1 && (
          <Identity 
            key="step1" 
            data={formData.identity} 
            update={(d: any) => setFormData({...formData, identity: d})} 
            onNext={nextStep} 
          />
        )}
        {step === 2 && (
          <Nexus 
            key="step2" 
            data={formData.nexus} 
            update={(d: any) => setFormData({...formData, nexus: d})} 
            onNext={nextStep} 
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <Spectrum 
            key="step3" 
            data={formData.spectrum} 
            update={(d: any) => setFormData({...formData, spectrum: d})} 
            onNext={nextStep}
          />
        )}
        {step === 4 && <Architecture key="step4" onComplete={() => window.location.href = '/dashboard'} />}
      </AnimatePresence>
    </main>
  );
}