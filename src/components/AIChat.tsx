import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const AIChatOverlay = lazy(() => import('./AIChatOverlay'));

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-accent text-black p-4 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 group"
      >
        <div className="absolute -top-1 -left-1 bg-brand-bg text-brand-accent text-[8px] font-bold px-2 py-0.5 border border-brand-accent/20 uppercase tracking-widest">
          Secure
        </div>
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={null}>
            <AIChatOverlay onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
