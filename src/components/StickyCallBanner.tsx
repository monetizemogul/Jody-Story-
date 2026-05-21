import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function StickyCallBanner() {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ 
        y: 0,
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{ 
        y: { duration: 0.5, delay: 1 },
        backgroundPosition: { duration: 10, repeat: Infinity, ease: "linear" }
      }}
      style={{
        backgroundSize: "200% 100%",
        backgroundImage: "linear-gradient(90deg, #00D2FF 0%, #0082FF 50%, #00D2FF 100%)",
      }}
      className="fixed bottom-0 left-0 right-0 z-[60] text-white p-4 shadow-2xl flex items-center justify-center gap-4 border-t border-brand-accent/40"
    >
      <div className="flex items-center gap-2">
        <motion.div 
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm uppercase tracking-widest font-black drop-shadow-md text-white"
        >
          Need Immediate Help?
        </motion.div>
      </div>
      <motion.a 
        href="tel:5738549264" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-white text-brand-surface px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-black transition-all shadow-xl group"
      >
        <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        Call Now: 573-854-9264
      </motion.a>
    </motion.div>
  );
}
