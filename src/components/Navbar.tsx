import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Clock, ShieldCheck, MapPin, Share2, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [showCopyToast, setShowCopyToast] = useState(false);

  const scrollToSection = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/#' + id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
       // Fallback: Copy to clipboard safely under iFrame limits
       try {
         await navigator.clipboard.writeText(window.location.href);
         setShowCopyToast(true);
         setTimeout(() => setShowCopyToast(false), 2500);
       } catch (err) {
         console.warn('Could not copy link automatically:', err);
       }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-surface/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center group cursor-pointer p-1 border border-brand-primary/20 rounded-sm hover:border-brand-primary/50 transition-all shadow-[0_0_15px_rgba(0,210,255,0.1)]" aria-label="Jody Story Bail Bonds Home">
                <Logo className="w-12 h-12" size={48} priority={true} />
                <div className="ml-2 flex flex-col justify-center">
                  <span className="text-xl font-serif font-black italic text-gradient-teal leading-none logo-shadow tracking-tight">Jody</span>
                  <span className="text-xl font-serif font-black italic text-gradient-gold leading-none logo-shadow tracking-tight">Story</span>
                </div>
              </Link>
              <div className="hidden sm:flex flex-col border-l-2 border-brand-primary/50 pl-3 ml-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-accent font-black leading-tight">Serving 20+ Missouri Counties</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-white font-bold opacity-80 uppercase">One Call Away From Setting You Free!</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium" role="navigation" aria-label="Main Navigation Menu">
              <button onClick={() => scrollToSection('how-it-works')} className="text-brand-accent hover:text-white transition-colors cursor-pointer" aria-label="View our step-by-step bail process">Process</button>
              <button onClick={() => scrollToSection('service-areas')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer" aria-label="View our service areas in Missouri">Areas</button>
              <button onClick={() => scrollToSection('calculator')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer" aria-label="Use bail fee calculator">Calculator</button>
              <button onClick={() => scrollToSection('faq')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer" aria-label="Read frequently asked legal questions">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer" aria-label="Contact bail bond agent">Contact</button>
            </div>

            <div className="flex items-center gap-6">
              <button 
                  onClick={handleShare}
                  className="p-2 text-brand-text-dim hover:text-white transition-colors relative"
                  aria-label="Share this website link"
              >
                  <Share2 className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] uppercase text-brand-muted tracking-wider">24/7 Response</span>
                <p className="text-xl font-mono text-brand-accent font-bold leading-none blue-glow">573-854-9264</p>
              </div>
              <a 
                href="tel:5738549264" 
                className="bg-brand-accent text-black px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-accent/80 transition-all active:scale-95 animate-pulse"
                aria-label="Call Jody Story Bail Bonds immediately"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern, non-intrusive notification feedback */}
      <div
        className={cn(
          "fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-brand-surface border border-brand-accent/50 text-white px-6 py-3 shadow-[0_0_30px_rgba(255,184,0,0.15)] flex items-center gap-3 transition-all duration-300 ease-out transform pointer-events-none",
          showCopyToast 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 -translate-y-4 scale-95"
        )}
        role="status"
      >
        <div className="w-5 h-5 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
          <Check className="w-3 h-3 text-brand-accent" />
        </div>
        <span className="text-[10px] uppercase tracking-widest font-black">Link Saved to Clipboard</span>
      </div>
    </>
  );
}
