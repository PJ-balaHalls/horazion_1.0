'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Building2, User, Users, UserPlus, X, Mail } from 'lucide-react';
import { ListSelector } from '@/components/ui/list-selector';

export function Nexus({ data, update, onNext, onBack }: any) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [invites, setInvites] = useState<string[]>([]);
  const nexusData = data.nexus;

  const addInvite = () => {
    if (inviteEmail.includes('@') && !invites.includes(inviteEmail)) {
      setInvites([...invites, inviteEmail]);
      setInviteEmail('');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid grid-cols-12 gap-8 items-center">
      <AnimatePresence mode="wait">
        {nexusData.mode === 'choice' ? (
          <motion.div key="choice" className="col-span-12 space-y-10 text-center">
            <div className="space-y-3">
              <h2 className="text-[36px] font-bold tracking-tighter">
                Certo, <span className="text-[var(--text-primary)]">@{data.identity.username}</span>...
              </h2>
              <p className="text-[16px] text-[var(--text-secondary)]">Você é independente ou faz parte de uma equipe?</p>
            </div>
            <div className="flex justify-center gap-6">
              <ModeCard 
                icon={<User size={32} />} title="Independente" 
                desc="Vou operar sozinho como freelancer ou consultor."
                onClick={() => update({...nexusData, mode: 'independent'})} 
              />
              <ModeCard 
                icon={<Users size={32} />} title="Tenho uma Equipe" 
                desc="Trabalho com um time ou possuo uma organização."
                onClick={() => update({...nexusData, mode: 'org'})} 
              />
            </div>
          </motion.div>
        ) : nexusData.mode === 'org' ? (
          <motion.div key="org" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="col-span-12 grid grid-cols-12 gap-8">
            <div className="col-span-5 space-y-6">
              <div className="bg-[var(--surface)] p-8 rounded-[28px] border border-[var(--border)] shadow-[var(--shadow-sm)] space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Ambiente da Equipe</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={18} />
                    <input 
                      value={nexusData.workspace} onChange={(e) => update({...nexusData, workspace: e.target.value})}
                      placeholder="Nome da empresa ou lab"
                      className="w-full h-[48px] pl-12 pr-4 rounded-[14px] border border-[var(--border)] bg-[var(--bg)] outline-none"
                    />
                  </div>
                </div>

                <ListSelector 
                  label="Seu Cargo" placeholder="Selecione seu cargo"
                  options={['Fundador / CEO', 'Líder de Design', 'Head de Engenharia', 'Produto']}
                  value={nexusData.roleInOrg} onChange={(val) => update({...nexusData, roleInOrg: val})}
                />
                
                <ListSelector 
                  label="Sua Função" placeholder="Selecione sua função"
                  options={['Gestão Estratégica', 'Desenvolvimento', 'Interface', 'Operações']}
                  value={nexusData.functionInOrg} onChange={(val) => update({...nexusData, functionInOrg: val})}
                />
              </div>
            </div>

            <div className="col-span-7 space-y-6">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[28px] p-8 space-y-6 shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center"><UserPlus size={24}/></div>
                  <div>
                    <h4 className="text-[16px] font-bold">Convidar para equipe</h4>
                    <p className="text-[12px] text-[var(--text-tertiary)]">Adicione membros para sincronizar o ambiente.</p>
                  </div>
                </div>

                <div className="flex gap-2 p-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-[16px]">
                  <input 
                    value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="email@equipe.com" className="flex-1 bg-transparent px-3 outline-none text-[14px]"
                  />
                  <button onClick={addInvite} className="h-[36px] px-5 bg-[var(--hz-black)] text-white rounded-[10px] text-[12px] font-bold">Adicionar</button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {invites.map(email => (
                    <div key={email} className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full text-[11px]">
                      {email} <X size={12} className="cursor-pointer" onClick={() => setInvites(invites.filter(i => i !== email))} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => update({...nexusData, mode: 'choice'})} className="flex items-center gap-2 text-[13px] font-bold text-[var(--text-tertiary)]"><ArrowLeft size={16}/> Voltar</button>
                <button onClick={onNext} className="h-[52px] px-10 bg-[var(--hz-black)] text-white rounded-[18px] font-bold shadow-[var(--shadow-md)]">Configurar Ambiente</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="col-span-12 text-center space-y-8">
            <h3 className="text-[28px] font-bold">Perfil Solo Ativado</h3>
            <button onClick={onNext} className="h-[52px] px-12 bg-[var(--hz-black)] text-white rounded-[18px] font-bold">Seguir Sozinho</button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ModeCard({ icon, title, desc, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }} onClick={onClick}
      className="w-[300px] p-8 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] cursor-pointer hover:border-[var(--hz-black)] transition-all group"
    >
      <div className="w-16 h-16 rounded-[22px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-6 text-[var(--text-tertiary)] group-hover:text-[var(--hz-black)] transition-colors">
        {icon}
      </div>
      <h3 className="text-[20px] font-bold mb-2">{title}</h3>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </motion.div>
  );
}