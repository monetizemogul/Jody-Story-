import { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ShieldCheck, Scale, Clock, Phone, ArrowLeft } from 'lucide-react';
import { cities } from '../data/cities';
import logo from '../assets/images/jody_story_logo.jpg';

const Contact = lazy(() => import('../components/Contact'));

export default function CityPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const city = cities.find(c => c.id === cityId);

  if (!city) {
    return (
      <div className="min-h-screen pt-40 px-4 text-center">
        <h1 className="text-4xl text-white font-serif italic mb-8">City Not Found</h1>
        <Link to="/" className="text-brand-accent uppercase tracking-widest font-black border-b border-brand-accent">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{city.name} Bail Bonds | Fast 24/7 Jail Release | Jody Story</title>
        <meta name="description" content={`Fast, reliable bail bonds in ${city.name}, MO. Available 24/7 for ${city.countyName} jail releases. Professional bondsman Jody Story provides expert service to bring your loved ones home.`} />
        <meta name="keywords" content={`${city.name} Bail Bonds, ${city.name} MO Bondsman, ${city.circuit} Bail Service, Bail Bonds near ${city.name} Missouri`} />
        <link rel="canonical" href={`https://jstorybailbonds.com/service-area/city/${city.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BailBondService",
                "@id": `https://jstorybailbonds.com/service-area/city/${city.id}/#localbusiness`,
                "name": `Jody Story Bail Bonds - ${city.name} Office`,
                "description": `Professional 24-hour bail bond services specializing in ${city.name} and ${city.countyName}.`,
                "url": `https://jstorybailbonds.com/service-area/city/${city.id}`,
                "telephone": "+1-573-854-9264",
                "areaServed": {
                  "@type": "City",
                  "name": city.name
                },
                "parentOrganization": {
                  "@id": "https://jstorybailbonds.com/#organization"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": `https://jstorybailbonds.com/service-area/city/${city.id}/#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@id": "https://jstorybailbonds.com",
                      "name": "Home"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@id": `https://jstorybailbonds.com/service-area/${city.countyId}`,
                      "name": city.countyName
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@id": `https://jstorybailbonds.com/service-area/city/${city.id}`,
                      "name": city.name
                    }
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>
      
      <section className="relative pt-40 pb-20 galaxy-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black mb-12 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Service Areas
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={logo} 
                  alt="Jody Story Logo" 
                  className="w-16 h-16 object-contain"
                  width={64}
                  height={64}
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] text-brand-primary uppercase tracking-[0.5em] font-black block">Serving {city.name}, MO</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 italic font-black">
                {city.name} <br/>
                <span className="text-gradient-gold logo-shadow">Bail bonds</span>
              </h1>
              <p className="text-brand-text-dim text-lg mb-12 max-w-md leading-relaxed font-light">
                {city.description} We offer fast, confidential 24-hour bail bond services to bring your loved ones home immediately in {city.name}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="#contact" className="px-10 py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(255,184,0,0.4)] text-center">
                  Secure Release Now
                </a>
                <a href="#contact" className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all text-center">
                  Payment Plans
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-surface border border-brand-border p-10 backdrop-blur-md relative"
            >
              <div className="absolute top-0 right-0 p-4 bg-gradient-purple text-white text-[8px] font-black tracking-widest uppercase">
                {city.circuit} Certified
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">24/7 Availability</h3>
                    <p className="text-sm text-brand-text-dim">On-call dispatchers ready to serve {city.name} at any hour.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">{city.countyName} Experts</h3>
                    <p className="text-sm text-brand-text-dim">Deep knowledge of local {city.name} municipal and county judicial procedures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">Discreet & Private</h3>
                    <p className="text-sm text-brand-text-dim">Your privacy is guaranteed throughout the entire bail process in {city.name}.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-serif text-white italic font-black mb-8 border-l-4 border-brand-accent pl-6 uppercase tracking-tight">
                Immediate {city.name} Bail Assistance
              </h2>
              <div className="prose prose-invert prose-brand max-w-none space-y-6 text-brand-text-dim leading-relaxed">
                <p>
                  Arrests in {city.name} require quick action. Jody Story Bail Bonds provides 
                  reliable assistance to navigate the {city.countyName} jail system. We facilitate
                  fast releases for both municipal and county charges.
                </p>
                <p>
                  Our experienced agents understand the specific bail schedules and release procedures in {city.name}. 
                  We work closely with local law enforcement to ensure your loved one is processed and released 
                  without unnecessary delays.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 my-12">
                  <div className="bg-brand-surface p-6 border border-brand-border">
                    <h4 className="text-brand-accent font-black uppercase tracking-widest text-xs mb-4">Local Service</h4>
                    <p className="text-sm">We serve all neighborhoods and municipal courts in {city.name}, MO.</p>
                  </div>
                  <div className="bg-brand-surface p-6 border border-brand-border">
                    <h4 className="text-brand-accent font-black uppercase tracking-widest text-xs mb-4">County Reach</h4>
                    <p className="text-sm">Integrated services with {city.countyName} sheriff's department and circuit courts.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 bg-brand-surface border border-brand-primary/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-purple rotate-45 translate-x-12 -translate-y-12 opacity-50" />
                <h3 className="text-xl font-serif font-black italic mb-4 text-gradient-gold">Call {city.name} Bondsman</h3>
                <p className="text-xs uppercase tracking-widest font-bold mb-8 text-brand-text-dim">One Call Away From Setting You Free!</p>
                <a href="tel:5738549264" className="flex items-center gap-4 text-2xl font-serif font-black italic text-gradient-gold hover:scale-105 transition-transform logo-shadow">
                  <Phone className="w-6 h-6 text-brand-primary" />
                  (573) 854-9264
                </a>
              </div>
              
              <div className="p-8 border-2 border-brand-primary">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-6">Nearby Cities</h4>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(0, 8).filter(c => c.id !== city.id).map(c => (
                    <Link key={c.id} to={`/service-area/city/${c.id}`} className="px-3 py-1 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <Contact />
      </Suspense>
    </div>
  );
}
