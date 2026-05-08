'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function LinkScene({ data, update, onNext, onBack }: any) {
  const toggle = (key: string) => update({ ...data, [key]: !data[key] });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[500px] p-6">
      <div className="space-y-2 mb-8">
        <span className="text-[12px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Ato 3 — The Link</span>
        <h2 className="text-[32px] font-[600] tracking-tight">Connect your universe.</h2>
        <p className="text-[14px] text-[var(--text-secondary)]">The system expands beyond itself. Select integrations to link.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-10">
        <ConnectCard icon={<GithubIcon />} label="GitHub" active={data.github} onClick={() => toggle('github')} />
        <ConnectCard icon={<GoogleIcon />} label="Google Workspace" active={data.google} onClick={() => toggle('google')} />
        <ConnectCard icon={<SlackIcon />} label="Slack" active={data.slack} onClick={() => toggle('slack')} />
        <ConnectCard icon={<NotionIcon />} label="Notion" active={data.notion} onClick={() => toggle('notion')} />
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={onNext} className="flex items-center gap-2 h-[44px] px-6 bg-[var(--text-primary)] text-[var(--bg)] rounded-[12px] font-[600] transition-all hover:scale-[1.02] active:scale-[0.98]">
          Sync Universe <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Componente Atômico de Cartão
function ConnectCard({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer p-4 rounded-[16px] border flex items-center gap-3 transition-all ${active ? 'border-[var(--text-primary)] bg-[var(--surface)] shadow-[var(--shadow-sm)]' : 'border-[var(--border)] hover:border-[var(--hz-gray)] hover:bg-[var(--surface)]'}`}>
      <div className={`${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'} transition-colors`}>{icon}</div>
      <span className={`text-[14px] font-[500] ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} transition-colors`}>{label}</span>
      {active && (
        <motion.div layoutId={`dot-${label}`} className="w-1.5 h-1.5 rounded-full bg-green-500 ml-auto" />
      )}
    </div>
  );
}

// ==========================================
// Ícones SVG Nativos (Zero Dependência)
// ==========================================

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1 2.521-2.52A2.528 2.528 0 0 1 13.876 5.042a2.527 2.527 0 0 1-2.521 2.52h-2.521v-2.52zM8.834 6.313a2.527 2.527 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V0a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 8.834 0v6.313zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.521A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.521v6.313zM15.165 18.956a2.528 2.528 0 0 1-2.523 2.522A2.528 2.528 0 0 1 10.12 18.956a2.527 2.527 0 0 1 2.522-2.521h2.523v2.521zM15.165 17.688a2.527 2.527 0 0 1 2.523-2.523 2.527 2.527 0 0 1 2.52 2.523V24a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.523-2.522v-6.312z"/>
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.064 1.157.301 1.48.91l2.585 5.56-1.503 6.942c-.087.352-.303.626-.826.66l-1.637.106v.737h5.452v-.737l-1.282-.103c-.56-.057-.79-.344-.658-.876l1.325-6.073 4.417 7.67.243.118V6.51c0-.52-.162-.777-.731-.832L12.164 5.6v-.737h4.869v.737l-1.047.086c-.528.055-.71.272-.71.802v10.66l-5.61-9.522 1.055-4.856c.117-.468.375-.688.892-.728l1.32-.1V4.21H4.459zM22.094 2.872v18.067L1.906 23.414V5.158l20.188-2.286zm-19.123 2.5v16.924l18.058-2.162V4.025L2.971 5.372z"/>
    </svg>
  );
}