// src/components/onboarding/scenes/Ato1_Identity.tsx
import { Input } from "@/components/ui/input"; // shadcn
import { Button } from "@/components/ui/button";

export function Identity({ data, update, onNext }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[400px] space-y-12"
    >
      <div className="space-y-2">
        <h2 className="text-[32px] font-bold tracking-tighter">Identity.</h2>
        <p className="text-[14px] text-[var(--text-secondary)]">Define who enters the system.</p>
      </div>

      <div className="space-y-6">
        <div className="group border-b border-[var(--border)] focus-within:border-[var(--hz-black)] transition-all">
          <input 
            autoFocus
            className="w-full bg-transparent py-4 text-2xl outline-none placeholder:text-[var(--hz-mist)]"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => update({...data, name: e.target.value})}
          />
        </div>
        
        <div className="flex gap-4">
           <select 
             className="flex-1 bg-[var(--surface)] h-[44px] rounded-[12px] border border-[var(--border)] px-4 text-[14px]"
             onChange={(e) => update({...data, role: e.target.value})}
           >
             <option>Select Role</option>
             <option value="developer">Developer</option>
             <option value="designer">Designer</option>
             <option value="architect">Architect</option>
           </select>
        </div>
      </div>

      <button 
        disabled={!data.name}
        onClick={onNext}
        className="h-[44px] w-full bg-[var(--hz-black)] text-white rounded-[12px] font-bold disabled:opacity-20 transition-all"
      >
        Establish Identity
      </button>
    </motion.div>
  );
}