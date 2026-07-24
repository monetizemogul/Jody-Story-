import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator as CalcIcon, Info, HelpCircle } from 'lucide-react';

export default function Calculator() {
  const [bondAmount, setBondAmount] = useState<number>(1000);
  const feePercentage = 0.10; // 10% standard

  const fee = useMemo(() => bondAmount * feePercentage, [bondAmount]);

  return (
    <section id="calculator" className="py-32 bg-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-accent mb-4 block">Fee Transparency</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-8">
              Bail Bond <span className="text-brand-accent italic font-bold">Calculator</span>
            </h2>
            <p className="text-brand-text-dim text-lg mb-10 leading-relaxed font-light">
              Understand your obligation clearly with no hidden costs. Most bonds require a non-refundable premium set by law.
            </p>
            
            <div className="space-y-6">
              {[
                "Strict adherence to legal fee caps",
                "Interest-free financing for qualified co-signers",
                "Complimentary case assessment",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white/90">
                  <div className="w-1.5 h-1.5 bg-brand-accent rotate-45" />
                  <span className="text-xs uppercase tracking-widest font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-surface p-10 border border-brand-border relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-accent" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-accent" />
            
            <div className="flex items-center gap-3 mb-10 text-brand-accent">
              <CalcIcon className="w-5 h-5" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Premium Estimator</h3>
            </div>
            
            <div className="space-y-10">
              <div>
                <label htmlFor="bond-amount-input" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">
                  Full Bail Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-0 bottom-4 text-3xl font-serif italic text-brand-accent/50">$</span>
                  <input 
                    id="bond-amount-input"
                    type="number" 
                    value={bondAmount || ''}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(10000000, Number(e.target.value)));
                      setBondAmount(val);
                    }}
                    className="w-full bg-transparent border-b border-brand-border py-4 pl-8 pr-4 text-4xl font-mono font-bold text-white focus:outline-none focus:border-brand-accent transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="mt-8">
                  <input 
                    type="range" 
                    min="500" 
                    max="50000" 
                    step="500"
                    value={bondAmount}
                    onChange={(e) => setBondAmount(Number(e.target.value))}
                    className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                    aria-label="Drag to adjust overall bail sum"
                  />
                </div>
              </div>
              
              <div className="p-8 bg-brand-bg border border-brand-border flex justify-between items-center shadow-[inset_0_0_20px_rgba(0,210,255,0.05)]">
                <div>
                  <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Calculated Premium</div>
                  <div className="text-[9px] text-brand-accent-light mt-1 uppercase tracking-tighter">Standard 10% Legal Rate</div>
                </div>
                <div className="text-4xl font-mono font-bold text-brand-accent tracking-tighter drop-shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                  <span className="text-xl mr-1 font-serif italic">$</span>
                  {fee.toLocaleString()}
                </div>
              </div>
              
              <Link to="/#contact" className="w-full bg-brand-accent text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent/90 transition-all shadow-xl shadow-brand-accent/5 block text-center">
                Request Immediate Assistance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
