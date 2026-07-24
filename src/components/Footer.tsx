import { ShieldCheck, Lock, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { counties } from '../pages/counties';
import { cities } from '../pages/cities';
import Logo from './Logo';
import { getCityUrl } from '../utils/urls';

export default function Footer() {
  const trustBadges = [
    { icon: <ShieldCheck className="w-4 h-4" />, label: "Licensed" },
    { icon: <Award className="w-4 h-4" />, label: "Insured" },
    { icon: <Clock className="w-4 h-4" />, label: "24/7 Service" },
    { icon: <Lock className="w-4 h-4" />, label: "Confidential" },
  ];

  return (
    <footer className="bg-brand-bg text-brand-text pt-24 pb-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-4 group">
                <Logo className="w-16 h-16" size={64} />
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-black italic text-gradient-teal leading-none logo-shadow">Jody</span>
                  <span className="text-2xl font-serif font-black italic text-gradient-gold leading-none logo-shadow">Story</span>
                </div>
              </Link>
            </div>
            <p className="text-brand-text-dim max-w-sm leading-relaxed mb-8 text-sm font-light">
              Providing professional, discreet, and fast bail services in Missouri. We are one call away from setting you free.
            </p>
            <div className="space-y-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">
              <div>
                <p className="text-brand-accent mb-1 uppercase tracking-widest">Office HQ</p>
                <p className="text-white/80">102 North Mine St, Potosi, MO 63664</p>
              </div>
              <p>Direct 24/7: <span className="text-brand-accent font-mono text-xs">(573) 854-9264</span></p>
            </div>
          </div>
          
          <div className="col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-8">Quick Navigation</p>
            <ul className="space-y-4 text-brand-text-dim text-[11px] uppercase tracking-widest font-medium">
              <li><Link to="/#how-it-works" className="hover:text-brand-accent transition-colors">Process Guide</Link></li>
              <li><Link to="/#calculator" className="hover:text-brand-accent transition-colors">Fee Calculator</Link></li>
              <li><Link to="/#faq" className="hover:text-brand-accent transition-colors">Legal FAQ</Link></li>
              <li><Link to="/#contact" className="hover:text-brand-accent transition-colors">Contact Agent</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-8">Missouri Bail Bond Service Areas</p>
            <div className="space-y-2 text-brand-text-dim text-[10px] uppercase tracking-widest font-medium max-h-[200px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-primary">
              {counties.map(county => (
                <Link key={county.id} to={`/service-area/${county.id}`} className="hover:text-brand-primary transition-colors block truncate">
                  {county.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-8">Popular Cities Served</p>
            <div className="space-y-2 text-brand-text-dim text-[10px] uppercase tracking-widest font-medium">
              {cities.slice(0, 8).map(city => (
                <Link key={city.id} to={getCityUrl(city.id)} className="hover:text-brand-accent transition-colors block truncate">
                  {city.name}, MO
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-8">Legal Policy</p>
            <ul className="space-y-4 text-brand-text-dim text-[11px] uppercase tracking-widest font-medium">
              <li><Link to="/#disclaimer" className="text-brand-accent font-black hover:text-white transition-colors">Legal Disclaimer</Link></li>
              <li><Link to="/#privacy" className="hover:text-brand-accent transition-colors">Privacy Charter</Link></li>
              <li><Link to="/#terms" className="hover:text-brand-accent transition-colors">Terms of Engagement</Link></li>
              <li><Link to="/#licensing" className="hover:text-brand-accent transition-colors">Licensing Verification</Link></li>
              <li><Link to="/#resources" className="hover:text-brand-accent transition-colors">Judicial Resources</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 py-10 border-y border-brand-border mb-12">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
              <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-primary bg-brand-muted/30">
                {badge.icon}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">{badge.label}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-brand-muted/50 border-l-4 border-brand-accent p-6 mb-12">
          <p className="text-[11px] md:text-xs text-brand-text-dim leading-relaxed font-medium uppercase tracking-wider">
            <span className="text-brand-accent font-black">Legal Disclaimer:</span> Jody Story Bail Bonds LLC is a licensed bail bond agency in Missouri. We provide surety services specifically related to bail bonds. <span className="text-white decoration-brand-accent underline underline-offset-4 decoration-2">We do not provide legal advice, legal representations, or any form of professional legal counsel.</span> Information provided on this website is for educational purposes only. Users should consult with a licensed attorney for all legal matters and case-specific advice.
          </p>
        </div>

        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold">
          <p>© {new Date().getFullYear()} Jody Story Bail Bonds LLC. Licensed & Insured Agent.</p>
          <div className="flex gap-10">
            <span>Security Verified</span>
            <span className="text-brand-accent italic font-serif lowercase tracking-wider">discretion guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
