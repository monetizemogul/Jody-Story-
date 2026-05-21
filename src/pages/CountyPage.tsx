
import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ShieldCheck, Scale, Clock, Phone, ArrowLeft } from 'lucide-react';
import { counties } from '../data/counties';
import logo from '../assets/images/jody_story_logo.jpg';

const Contact = lazy(() => import('../components/Contact'));

export default function CountyPage() {
  const { countyId } = useParams<{ countyId: string }>();
  const county = counties.find(c => c.id === countyId);
  const [isNearCounty, setIsNearCounty] = useState<boolean | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator && county) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = calculateDistance(latitude, longitude, county.lat, county.lng);
          // If within 40 miles (roughly covers a county area from center)
          setIsNearCounty(distance < 40);
        },
        (error) => {
          console.warn("Geolocation access denied or error:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [county]);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  if (!county) {
    return (
      <div className="min-h-screen pt-40 px-4 text-center">
        <h1 className="text-4xl text-white font-serif italic mb-8">County Not Found</h1>
        <Link to="/" className="text-brand-accent uppercase tracking-widest font-black border-b border-brand-accent">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{county.name} Bail Bonds | Fast 24/7 Jail Release | Jody Story</title>
        <meta name="description" content={`Fast, reliable bail bonds in ${county.name}, MO. Available 24/7 for ${county.circuit} jail releases. Professional bondsman Jody Story provides expert service to bring your loved ones home.`} />
        <meta name="keywords" content={`${county.name} Bail Bonds, ${county.name} MO Bondsman, ${county.circuit} Bail Service, Bail Bonds near ${county.name} Missouri`} />
        <link rel="canonical" href={`https://jstorybailbonds.com/service-area/${county.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BailBondService",
                "@id": `https://jstorybailbonds.com/service-area/${county.id}/#localbusiness`,
                "name": `Jody Story Bail Bonds - ${county.name} Division`,
                "description": `Professional 24-hour bail bond services specializing in ${county.name} and the ${county.circuit}.`,
                "url": `https://jstorybailbonds.com/service-area/${county.id}`,
                "telephone": "+1-573-854-9264",
                "areaServed": {
                  "@type": "AdministrativeArea",
                  "name": county.name
                },
                "parentOrganization": {
                  "@id": "https://jstorybailbonds.com/#organization"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": `https://jstorybailbonds.com/service-area/${county.id}/#breadcrumb`,
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
                      "@id": `https://jstorybailbonds.com/service-area/${county.id}`,
                      "name": `${county.name} Bail Bonds`
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
          
          <AnimatePresence>
            {isNearCounty && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm p-4 flex items-center gap-4 group"
              >
                <div className="p-2 bg-brand-accent/20 rounded-full animate-pulse">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-accent font-black uppercase tracking-[0.3em]">Location Confirmed</p>
                  <p className="text-white text-xs font-light">You are within our {county.name} immediate response zone.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
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
                <span className="text-[10px] text-brand-primary uppercase tracking-[0.5em] font-black block">Serving Missouri {county.circuit}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 italic font-black">
                {county.name} <br/>
                <span className="text-gradient-gold logo-shadow">Bail bonds</span>
              </h1>
              <p className="text-brand-text-dim text-lg mb-12 max-w-md leading-relaxed font-light">
                {county.description} We offer fast, confidential 24-hour bail bond services to bring your loved ones home immediately in {county.name}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="#contact" className="px-10 py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(255,184,0,0.4)] text-center">
                  Secure Release Now
                </Link>
                <Link to="#contact" className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all text-center">
                  Payment Plans
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-surface border border-brand-border p-10 backdrop-blur-md relative"
            >
              <div className="absolute top-0 right-0 p-4 bg-gradient-purple text-white text-[8px] font-black tracking-widest uppercase">
                {county.circuit} Certified
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">24/7 Availability</h3>
                    <p className="text-sm text-brand-text-dim">On-call dispatchers ready to serve {county.name} courts at any hour.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">{county.circuit} Experts</h3>
                    <p className="text-sm text-brand-text-dim">Deep knowledge of local {county.name} judicial procedures and bail requirements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1">Discreet & Private</h3>
                    <p className="text-sm text-brand-text-dim">Your privacy is guaranteed throughout the entire bail process in {county.name}.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
      </section>

      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-serif text-white italic font-black mb-8 border-l-4 border-brand-accent pl-6 uppercase tracking-tight">
                Fast Jail Release & Bail Bonds in {county.name}
              </h2>
              <div className="prose prose-invert prose-brand max-w-none space-y-6 text-brand-text-dim leading-relaxed">
                <p>
                  When a friend or family member is arrested in {county.name}, time is of the essence. Jody Story Bail Bonds provides 
                  immediate assistance in navigating the local court system. We specialize in {county.circuit} cases, ensuring that we
                  can expedite the paperwork and secure a release as quickly as possible.
                </p>
                <p>
                  Our agents are familiar with the specific requirements of the {county.name} sheriff's department and local jails. 
                  Whether it's a misdemeanor or a more serious charge, we handle every case with the same level of professionalism
                  and urgency.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 my-12">
                  <div className="bg-brand-surface p-6 border border-brand-border">
                    <h4 className="text-brand-accent font-black uppercase tracking-widest text-xs mb-4">Local Courts</h4>
                    <p className="text-sm">We provide bail services for the municipal and circuit courts within {county.name}, Missouri.</p>
                  </div>
                  <div className="bg-brand-surface p-6 border border-brand-border">
                    <h4 className="text-brand-accent font-black uppercase tracking-widest text-xs mb-4">Service Area</h4>
                    <p className="text-sm">Covering every city and municipality within the {county.name} border.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 bg-brand-surface border border-brand-primary/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-purple rotate-45 translate-x-12 -translate-y-12 opacity-50" />
                <h3 className="text-xl font-serif font-black italic mb-4 text-gradient-gold">Ready to Help 24/7</h3>
                <p className="text-xs uppercase tracking-widest font-bold mb-8 text-brand-text-dim">One Call Away From Setting You Free!</p>
                <a href="tel:5738549264" className="flex items-center gap-4 text-2xl font-serif font-black italic text-gradient-gold hover:scale-105 transition-transform logo-shadow">
                  <Phone className="w-6 h-6 text-brand-primary" />
                  (573) 854-9264
                </a>
              </div>
              
              <div className="p-8 border-2 border-brand-primary">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-6">Nearby Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {counties.slice(0, 8).filter(c => c.id !== county.id).map(c => (
                    <Link key={c.id} to={`/service-area/${c.id}`} className="px-3 py-1 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all">
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
