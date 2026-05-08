'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Camera, Terminal, PenTool, Briefcase, Video, Check, X, Loader2, Sparkles, UploadCloud, MonitorUp } from 'lucide-react';
import Cropper from 'react-easy-crop'; // Biblioteca de Precisão para Imagens
import { supabase } from '@/lib/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // shadcn/ui Dialog

export function Identity({ data, update, onNext }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Estados para o Cropper ( react-easy-crop )
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  // Validação real-time debounced do username (Controle de DNA Único)
  useEffect(() => {
    if (!data.username || data.username.length < 3) { setStatus('idle'); return; }
    setStatus('checking');
    const timer = setTimeout(async () => {
      const { data: user } = await supabase.from('profiles').select('username').eq('username', data.username).single();
      setStatus(user ? 'taken' : 'available');
    }, 600);
    return () => clearTimeout(timer);
  }, [data.username]);

  // Função para ler o arquivo e abrir o Cropper
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setIsCropModalOpen(true); // Abre o modal de ajuste
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Geração da imagem final cortada em círculo (Canvas)
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setAvatarPreview(URL.createObjectURL(croppedImage)); // Preview visual
      update({ ...data, avatarBlob: croppedImage }); // Salva o Blob final para upload
      setIsCropModalOpen(false); // Fecha o modal
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, update, data]);

  const isReady = data.username.length >= 3 && status === 'available' && data.role && data.pronoun && data.sexuality;

  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }} className="w-full grid grid-cols-12 gap-10 items-center">
        
        {/* COLUNA 1: Perfil & Username - Área de Interação Imediata */}
        <div className="col-span-12 lg:col-span-5 space-y-10 bg-[var(--surface)] p-10 rounded-[32px] border border-[var(--border)] shadow-[var(--shadow-sm)]">
          <div className="flex flex-col items-center gap-5">
            
            {/* Input oculto para Arquivo e Câmera Nativa (capture="camera") */}
            <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
            <input type="file" ref={cameraInputRef} onChange={onFileChange} accept="image/*" capture="user" className="hidden" />

            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center overflow-hidden bg-[var(--bg)] shadow-inner">
                {avatarPreview ? (
                  <img src={avatarPreview} className="w-full h-full object-cover" />
                ) : (
                  <Sparkles className="text-[var(--text-tertiary)]" size={32} />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 flex gap-1.5">
                <button onClick={() => fileInputRef.current?.click()} className="bg-[var(--hz-black)] text-white p-2.5 rounded-full shadow-lg hover:bg-black transition-colors">
                  <MonitorUp size={16} /> {/* Upload do Dispositivo */}
                </button>
                <button onClick={() => cameraInputRef.current?.click()} className="bg-[var(--hz-black)] text-white p-2.5 rounded-full shadow-lg hover:bg-black transition-colors lg:hidden">
                  <Camera size={16} /> {/* Câmera (Mobile apenas) */}
                </button>
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-[18px] font-bold tracking-tight text-[var(--text-primary)]">Avatar</h3>
              <p className="text-[12px] text-[var(--text-tertiary)] max-w-[200px]">Adicione foto do dispositivo ou tire da câmera.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Seu apelido (@)</label>
            <div className="relative">
              <input 
                value={data.username}
                onChange={(e) => update({...data, username: e.target.value.toLowerCase().replace(/\s/g, '')})}
                placeholder="Apelido"
                className={`w-full h-[52px] px-5 rounded-[16px] border bg-[var(--bg)] text-[18px] font-medium outline-none transition-all ${status === 'available' ? 'border-green-500' : status === 'taken' ? 'border-red-500' : 'focus:border-[var(--hz-black)]'}`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {status === 'checking' && <Loader2 size={18} className="animate-spin text-[var(--text-tertiary)]" />}
                {status === 'available' && <Check size={18} className="text-green-500" />}
                {status === 'taken' && <X size={18} className="text-red-500" />}
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA 2: Metadata & Roles - Evolução Visual */}
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Pronome</label>
              <div className="flex flex-wrap gap-2">
                {['Ele/Dele', 'Ela/Dela', 'Elu/Delu', 'Outro'].map(p => (
                  <Pill key={p} label={p} active={data.pronoun === p} onClick={() => update({...data, pronoun: p})} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Sexualidade</label>
              <div className="flex flex-wrap gap-2">
                {['Hetero', 'Homo', 'Bi', 'Pan', 'Assexual', '+'].map(s => (
                  <Pill key={s} label={s} active={data.sexuality === s} onClick={() => update({...data, sexuality: s})} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Você é...</label>
            <div className="grid grid-cols-4 gap-3">
              <RoleCard icon={<Terminal size={20}/>} label="Developer" active={data.role === 'Developer'} onClick={() => update({...data, role: 'Developer'})} />
              <RoleCard icon={<PenTool size={20}/>} label="Designer" active={data.role === 'Designer'} onClick={() => update({...data, role: 'Designer'})} />
              <RoleCard icon={<Briefcase size={20}/>} label="Product" active={data.role === 'Product'} onClick={() => update({...data, role: 'Product'})} />
              <RoleCard icon={<Video size={20}/>} label="Creator" active={data.role === 'Creator'} onClick={() => update({...data, role: 'Creator'})} />
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <button 
              disabled={!isReady}
              onClick={onNext}
              className="group flex items-center justify-center gap-3 h-[56px] px-12 bg-[var(--hz-black)] text-white rounded-[18px] font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 shadow-[var(--shadow-md)]"
            >
              Avançar <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ====================================================== */}
      {/* MODAL DE CORTAR IMAGEM ( react-easy-crop ) */}
      {/* ====================================================== */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-[500px] bg-[var(--bg)] border border-[var(--border)] rounded-[24px] p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold tracking-tight text-center">Ajustar Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="relative w-full h-[300px] bg-black rounded-[16px] overflow-hidden mt-4">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1} // Círculo perfeito
                cropShape="round" // Forma redonda visual
                showGrid={true}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          {/* Controle de Zoom */}
          <div className="mt-6 space-y-2">
            <label className="text-[12px] text-[var(--text-tertiary)]">Zoom</label>
            <input 
              type="range" value={zoom} min={1} max={3} step={0.1}
              aria-labelledby="Zoom" onChange={(e: any) => setZoom(e.target.value)}
              className="w-full h-1 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--hz-black)]"
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button onClick={() => setIsCropModalOpen(false)} className="h-[40px] px-5 rounded-[12px] border border-[var(--border)] text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-subtle)]">
              Cancelar
            </button>
            <button onClick={showCroppedImage} className="h-[40px] px-6 bg-[var(--hz-black)] text-white rounded-[12px] font-bold flex items-center gap-2 hover:bg-black">
              <Check size={16}/> Salvar Avatar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Componentes Atômicos
function Pill({ label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${active ? 'bg-[var(--hz-black)] text-white border-[var(--hz-black)] shadow-lg' : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-primary)]'}`}>
      {label}
    </button>
  );
}

function RoleCard({ icon, label, active, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer p-5 rounded-[20px] border flex flex-col items-center justify-center gap-3 transition-all ${active ? 'bg-[var(--hz-black)] text-white border-[var(--hz-black)] shadow-[var(--shadow-md)]' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'}`}>
      {icon}
      <span className="text-[12px] font-bold">{label}</span>
    </div>
  );
}

// ======================================================
// HELPER FUNCTIONS PARA CORTE DE IMAGEM (Canvas API)
// ==========================================

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string), false);
    reader.readAsDataURL(file);
  });
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // Evita problemas de CORS
    image.src = url;
  });

async function getCroppedImg(imageSrc: string | null, pixelCrop: any): Promise<Blob> {
  if (!imageSrc) throw new Error("No image source");
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error("No 2d context");

  // Define o tamanho do canvas para o tamanho do corte (perfeitamente quadrado para o círculo)
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Desenha a imagem baseada na posição do corte ajustada pelo usuário
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Retorna como Blob pronto para upload no Supabase Storage
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error('Canvas is empty')); return; }
      resolve(blob);
    }, 'image/jpeg');
  });
}