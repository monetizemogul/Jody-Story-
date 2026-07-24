import { lazy, Suspense, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ShieldCheck, Scale, Clock, Phone, ArrowLeft, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { cities } from './cities';
import { countyDetailsMap } from './countyDetails';
import Logo from '../components/Logo';
import LazyRender from '../components/LazyRender';
import { getCityUrl } from '../utils/urls';

const Contact = lazy(() => import('../components/Contact'));

export default function CityPage({ forceCityId }: { forceCityId?: string }) {
  const { cityId: urlCityId } = useParams<{ cityId: string }>();
  const cityId = forceCityId || urlCityId;
  const city = cities.find(c => c.id === cityId);
  const countyDetails = city ? countyDetailsMap[city.countyId] : null;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const pageTitle = `${city.name} Bail Bonds | Fast 24/7 Jail Release | Jody Story`;
  const pageDescription = (() => {
    let desc = `Fast 24/7 bail bonds in ${city.name}, MO. Jody Story offers reliable jail release across ${city.countyName}. Call 573-854-9264 for immediate assistance.`;
    if (desc.length > 160) {
      desc = `24/7 bail bonds in ${city.name}, MO. Reliable jail release across ${city.countyName}. Call 573-854-9264 for immediate assistance.`;
    }
    if (desc.length < 120) {
      desc = `Need fast 24/7 bail bonds in ${city.name}, MO? Jody Story offers reliable jail release across ${city.countyName}. Call 573-854-9264 for immediate assistance.`;
    }
    return desc;
  })();
  const pageKeywords = `${city.name} Bail Bonds, ${city.name} MO Bondsman, ${city.circuit} Bail Service, Bail Bonds near ${city.name} Missouri`;
  const pageUrl = city?.id === 'bonne-terre' 
    ? 'https://jstorybailbonds.com/bonne-terre-mo-bail-bonds--24/7-jail-release-services'
    : city?.id === 'ironton'
    ? 'https://jstorybailbonds.com/ironton-bail-bonds-247-jail-release'
    : city ? `https://jstorybailbonds.com/service-area/city/${city.id}`
    : 'https://jstorybailbonds.com/';
  const pageImage = "https://jstorybailbonds.com/jody_story_bailbonds.jpg";

  const richFaqItems = countyDetails?.extendedContent?.faqs || [
    {
      question: `How do I secure a bail bond in ${city.name}, MO?`,
      answer: `To secure an immediate bail bond, contact Jody Story Bail Bonds 24/7 at (573) 854-9264. Our experienced bondsmen coordinate directly with the court clerk and duty deputies. You will typically need to pay a standard 10% premium or establish certified collateral to initiate the release procedure.`
    },
    {
      question: `Where will someone arrested in ${city.name} be taken?`,
      answer: countyDetails 
        ? `Individuals arrested in ${city.name} are eventually processed to the ${countyDetails.jailName}, located at ${countyDetails.jailAddress}.`
        : `Most individuals arrested within ${city.name} are processed and held at the main county detention center near the local courthouse.`
    },
    {
      question: `How long does the bail release process take?`,
      answer: countyDetails
        ? `Release schedules at the ${countyDetails.jailName} in ${countyDetails.countySeat} generally take between 1 to 3 hours once our certified agent delivers the approved surety or cash filing.`
        : "Standard releases typically range between 1 and 3 hours from the moment our agent registers the authorized bond paperwork with the correctional officers on duty."
    },
    {
      question: `Does Jody Story offer payment plans in ${city.name}?`,
      answer: `Yes, we understand that sudden legal problems are stressful and expensive. We offer customizable financing plans with low down payments and installment configurations suited to your home budget.`
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content="Jody Story Bail Bonds" />

        {/* Twitter (X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://jstorybailbonds.com/#organization",
                "name": "Jody Story Bail Bonds LLC",
                "url": "https://jstorybailbonds.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jstorybailbonds.com/Jody_Story_Bailbonds_Logo.jpg"
                }
              },
              {
                "@type": "LegalService",
                "@id": `https://jstorybailbonds.com${getCityUrl(city.id)}/#localbusiness`,
                "name": `Jody Story Bail Bonds - ${city.name} Office`,
                "description": `Professional 24-hour bail bond services specializing in ${city.name} and ${city.countyName}.`,
                "url": `https://jstorybailbonds.com${getCityUrl(city.id)}`,
                "telephone": "+1-573-854-9264",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": city.name,
                  "addressRegion": "MO",
                  "addressCountry": "US"
                },
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
                "@id": `https://jstorybailbonds.com${getCityUrl(city.id)}/#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@id": "https://jstorybailbonds.com/",
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
                      "@id": `https://jstorybailbonds.com${getCityUrl(city.id)}`,
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
                <Logo className="w-16 h-16" size={64} priority={true} />
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
                Fast Jail Release & Court Procedures in {city.name}
              </h2>
              <div className="prose prose-invert prose-brand max-w-none space-y-6 text-brand-text-dim leading-relaxed font-light">
                {countyDetails?.extendedContent ? (
                  <>
                    <div className="space-y-4 whitespace-pre-wrap">
                      {countyDetails.extendedContent.overview}
                    </div>

                    <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                      County Jail Information
                    </h3>
                    <div className="space-y-4 whitespace-pre-wrap">
                      {countyDetails.extendedContent.jailInfo}
                    </div>

                    <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                      Court Information & Compliance
                    </h3>
                    <div className="space-y-4 whitespace-pre-wrap">
                      {countyDetails.extendedContent.courtInfo}
                    </div>

                    <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                      The Local Bail Bond Process
                    </h3>
                    <div className="space-y-4 whitespace-pre-wrap">
                      {countyDetails.extendedContent.localBondProcess}
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      Arrests in {city.name} require quick action. Jody Story Bail Bonds provides 
                      reliable assistance to navigate the {city.countyName} jail system. We facilitate
                      fast releases for both municipal and county charges.
                    </p>
                    <p>
                      Our experienced agents understand the specific bail schedules and release procedures in {city.name}. 
                      We work closely with local law enforcement to ensure your loved one is processed and released 
                      without unnecessary delays. You can look up active court calendars and case records directly via the official <a href="https://www.courts.mo.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-accent underline hover:text-white transition-colors">Missouri Courts Portal</a>.
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
                  </>
                )}
              </div>

              <div className="bg-brand-surface border border-brand-border p-8 rounded-sm space-y-6 mt-12">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-brand-border/80 pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-accent" />
                  Active Judicial Courts We Serve
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {countyDetails ? (
                    countyDetails.localCourts.map((courtName, idx) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim text-wrap leading-relaxed">{courtName}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{city.circuit} Court</span>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{city.name} Municipal Divisions</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div className="border-l-4 border-brand-primary pl-6">
                  <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Instant Answers</p>
                  <h3 className="text-2xl font-serif text-white italic font-black uppercase tracking-tight">
                    Frequently Asked Questions ({city.name})
                  </h3>
                </div>

                <div className="space-y-4">
                  {richFaqItems.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div 
                        key={index} 
                        className="border border-brand-border bg-brand-surface/20 hover:bg-brand-surface/40 transition-colors rounded-sm"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
                        >
                          <span className="text-white font-medium text-sm leading-snug">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-brand-primary shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-brand-text-dim shrink-0" />
                          )}
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-0 border-t border-brand-border/10 text-xs text-brand-text-dim leading-relaxed font-light space-y-2">
                                <p>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
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
                    <Link key={c.id} to={getCityUrl(c.id)} className="px-3 py-1 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Contact />
        </Suspense>
      </LazyRender>
    </div>
  );
}
