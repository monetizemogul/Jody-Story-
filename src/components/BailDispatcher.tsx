import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { Smartphone } from 'lucide-react';

const BailDispatcherOverlay = lazy(() => import('./BailDispatcherOverlay'));

export default function BailDispatcher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-bg text-brand-primary p-4 rounded-full shadow-[0_0_40px_rgba(0,210,255,0.4)] hover:scale-105 transition-all active:scale-95 group border border-brand-primary/30"
      >
        <div className="absolute -top-1 -left-1 bg-gradient-purple text-white text-[8px] font-bold px-2 py-1 border border-brand-primary/30 uppercase tracking-widest whitespace-nowrap shadow-lg">
          Express Dispatch
        </div>
        <Smartphone className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={null}>
            <BailDispatcherOverlay onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
