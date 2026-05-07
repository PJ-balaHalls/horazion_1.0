'use client';
import { motion } from 'framer-motion';

export function AuthFooter() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="w-full py-8 border-t border-[var(--border)] mt-auto"
    >
      <div className="max-w-[400px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-[var(--text-tertiary)] font-medium">
        <a href="#" className="hover:text-[var(--hz-black)] transition-colors">Termos de Uso</a>
        <a href="#" className="hover:text-[var(--hz-black)] transition-colors">Privacidade</a>
        <a href="#" className="hover:text-[var(--hz-black)] transition-colors">Centro de Ajuda</a>
        <span className="cursor-default">© 2024 Horazion Lab</span>
      </div>
    </motion.footer>
  );
}