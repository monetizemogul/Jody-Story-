import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Scale } from 'lucide-react';
import Logo from './Logo';

const heroImage = '/jody_story_bailbonds.jpg';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden galaxy-bg">
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-purple flex items-center justify-center shadow-lg z-10 w-full overflow-hidden truncate px-2">
        <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white italic drop-shadow-md truncate">
          ONE CALL AWAY FROM SETTING YOU FREE!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <Logo className="w-12 h-12 md:w-16 md:h-16" size={64} priority={true} />
              <div className="h-10 w-px bg-brand-primary/30" />
              <span className="text-[10px] text-brand-primary uppercase tracking-[0.2em] md:tracking-[0.5em] font-black block">Missouri's Trusted Choice</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.95] mb-8 italic font-black">
              <span className="text-gradient-teal logo-shadow tracking-tight">Jody</span> <br/>
              <span className="text-gradient-gold logo-shadow tracking-tight">Story</span> <br/> 
              <span className="text-gradient-gold text-3xl md:text-5xl block mt-4 logo-shadow uppercase tracking-tight font-black">Bail Bonds</span>
            </h1>
            
            <div className="mb-12 bg-white/5 border-l-4 border-brand-primary p-4 md:p-6 backdrop-blur-sm">
              <p className="text-[10px] text-brand-primary uppercase tracking-[0.5em] font-black mb-3">Instant 24-Hour Dispatch</p>
              <a href="tel:5738549264" className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-gradient-gold italic tracking-tight logo-shadow hover:brightness-110 transition-all block max-w-full">
                (573) 854-9264
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/#contact" className="px-8 md:px-10 py-4 md:py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(255,184,0,0.4)] text-center w-full sm:w-auto">
                Secure Release Now
              </Link>
              <Link to="/#how-it-works" className="px-8 md:px-10 py-4 md:py-5 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all text-center w-full sm:w-auto">
                Payment Plans
              </Link>
            </div>
            
              <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-brand-border pt-8">
                <div>
                  <p className="text-brand-primary text-xs uppercase font-black tracking-widest mb-2">24 HOUR SERVICE</p>
                  <p className="text-[10px] uppercase tracking-wide text-brand-muted leading-relaxed font-bold">Reliable assistance around the clock, 365 days a year.</p>
                </div>
                <div>
                  <p className="text-brand-primary text-xs uppercase font-black tracking-widest mb-2">PAYMENT PLANS</p>
                  <p className="text-[10px] uppercase tracking-wide text-brand-muted leading-relaxed font-bold">Flexible financing options to ensure your loved ones come home.</p>
                </div>
              </div>
          </div>
          
          <div className="relative animate-scale-up [animation-delay:200ms]">
            <div className="relative z-10 border border-brand-border p-8 bg-brand-surface/30 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="w-full max-w-md">
                <img 
                  src={heroImage} 
                  alt="Jody Story Bail Bonds" 
                  className="w-full h-auto shadow-2xl rounded-sm border border-brand-primary/20"
                  width={400}
                  height={267}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="mt-12 w-full space-y-6">
                <div className="pb-4 border-b border-brand-border text-center">
                  <span className="text-[10px] text-brand-primary uppercase tracking-[0.3em] block mb-2 font-black">Missouri's Trusted Bond Service</span>
                  <p className="text-xl font-serif italic text-white tracking-wide mb-4 text-gradient-gold">One Call Away From Setting You Free!</p>
                </div>
                
                <div className="bg-brand-bg/80 p-6 border border-brand-primary/30">
                  <p className="text-[10px] text-brand-accent uppercase tracking-[.3em] mb-4 font-black">Service Areas</p>
                  <p className="text-sm italic font-serif leading-relaxed text-brand-text mb-4">
                    Serving over 20 counties in Missouri with professional, discreet, and rapid assistance.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      'Washington', 'St Francois', 'Ste Genevieve', 'Madison', 
                      'Franklin', 'Crawford', 'Dent', 'Iron', 'Reynolds', 'Wayne'
                    ].map(id => (
                      <span key={id} className="text-[8px] uppercase font-black text-brand-accent border border-brand-accent/30 px-2 py-0.5 whitespace-nowrap">
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decors */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-4 border-brand-primary opacity-20 rotate-12 -z-10" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-accent opacity-10 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
