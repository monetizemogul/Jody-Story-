import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Clock, ShieldCheck, MapPin, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/images/jody_story_logo.jpg';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

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
       // Fallback: Copy to clipboard
       navigator.clipboard.writeText(window.location.href);
       alert('Link copied to clipboard!');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-surface/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center group cursor-pointer p-1 border border-brand-primary/20 rounded-sm hover:border-brand-primary/50 transition-all shadow-[0_0_15px_rgba(0,210,255,0.1)]">
              <img 
                src={logo} 
                alt="Jody Story Logo" 
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
                decoding="async"
                referrerPolicy="no-referrer"
              />
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
          
          <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium">
            <button onClick={() => scrollToSection('how-it-works')} className="text-brand-accent hover:text-white transition-colors cursor-pointer">Process</button>
            <button onClick={() => scrollToSection('service-areas')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer">Areas</button>
            <button onClick={() => scrollToSection('calculator')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer">Calculator</button>
            <button onClick={() => scrollToSection('faq')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="text-brand-text-dim hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>

          <div className="flex items-center gap-6">
            <button 
                onClick={handleShare}
                className="p-2 text-brand-text-dim hover:text-white transition-colors"
                aria-label="Share this page"
            >
                <Share2 className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase text-brand-muted tracking-wider">24/7 Response</span>
              <p className="text-xl font-mono text-brand-accent font-bold leading-none blue-glow">573-854-9264</p>
            </div>
            <a 
              href="tel:5738549264" 
              className="bg-brand-accent text-black px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-brand-accent/80 transition-all active:scale-95"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
