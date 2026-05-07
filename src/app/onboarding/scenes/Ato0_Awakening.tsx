// src/components/onboarding/scenes/Ato0_Awakening.tsx
export function Awakening({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1 h-1 bg-[var(--hz-black)] rounded-full"
      />
      <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--text-tertiary)] font-bold">
        Initializing System Presence
      </span>
    </motion.div>
  );
}