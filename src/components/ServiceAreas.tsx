import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { counties } from '../data/counties';
import { cities } from '../data/cities';

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-brand-surface border-y border-brand-border" id="service-areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white italic font-black mb-6 uppercase tracking-tight">
              Service <span className="text-gradient-gold">Areas</span>
            </h2>
            <p className="text-brand-text-dim max-w-2xl mx-auto font-light leading-relaxed">
              Providing expert bail bond services across multiple Missouri judicial circuits. 
              Available 24/7 in over 30 counties and major cities.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Counties Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-brand-primary/20" />
              <h3 className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs">Major Counties</h3>
              <div className="h-px flex-1 bg-brand-primary/20" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {counties.filter(c => [
                'washington', 'st-francois', 'ste-genevieve', 'madison', 
                'franklin', 'crawford', 'dent', 'iron', 'reynolds', 'wayne'
              ].includes(c.id)).map((county) => (
                <Link
                  key={county.id}
                  to={`/service-area/${county.id}`}
                  className="group p-4 border border-brand-border bg-brand-bg hover:border-brand-primary transition-all duration-300"
                >
                  <div className="flex flex-col h-full justify-between gap-4">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{county.circuit}</span>
                    <h4 className="text-white font-bold group-hover:text-brand-primary transition-colors text-sm uppercase tracking-tight">{county.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cities Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-brand-accent/20" />
              <h3 className="text-brand-accent font-black uppercase tracking-[0.3em] text-xs">Popular Cities</h3>
              <div className="h-px flex-1 bg-brand-accent/20" />
            </div>
            <div className="space-y-3">
              {cities.map((city) => (
                <Link
                  key={city.id}
                  to={`/service-area/city/${city.id}`}
                  className="flex items-center justify-between p-4 border border-brand-border bg-brand-bg hover:bg-brand-surface group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <MapPin className="w-4 h-4 text-brand-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h4 className="text-white font-bold group-hover:text-brand-accent transition-colors text-sm uppercase tracking-widest">{city.name}</h4>
                      <p className="text-[8px] text-brand-text-dim uppercase tracking-widest font-black">{city.countyName}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-brand-text-dim uppercase tracking-widest font-bold mb-4">Not listed? We serve over 20+ other Missouri counties.</p>
          <a href="tel:5738549264" className="text-brand-primary font-black uppercase tracking-widest border-b border-brand-primary hover:text-white hover:border-white transition-all text-sm pb-1">
            Call for Immediate Assistance
          </a>
        </div>
      </div>
    </section>
  );
}
