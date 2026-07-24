import { Phone } from 'lucide-react';

export default function StickyCallBanner() {
  return (
    <div 
      style={{
        backgroundImage: "linear-gradient(90deg, #00D2FF 0%, #0082FF 50%, #00D2FF 100%)",
      }}
      className="fixed bottom-0 left-0 right-0 z-[60] text-white p-4 shadow-2xl flex items-center justify-center gap-4 border-t border-brand-accent/40 animate-gradient-slide animate-slide-up-delayed"
    >
      <div className="flex items-center gap-2">
        <div 
          className="text-sm uppercase tracking-widest font-black drop-shadow-md text-white animate-pulse"
        >
          Need Immediate Help?
        </div>
      </div>
      <a 
        href="tel:5738549264" 
        className="flex items-center gap-2 bg-white text-brand-surface px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-black hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 shadow-xl group"
      >
        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Call Now: 573-854-9264
      </a>
    </div>
  );
}
