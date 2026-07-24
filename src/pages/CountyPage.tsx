import { lazy, Suspense, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  ShieldCheck, 
  Scale, 
  Clock, 
  Phone, 
  ArrowLeft, 
  Building2, 
  Landmark, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Map 
} from 'lucide-react';
import { counties } from './counties';
import { countyDetailsMap } from './countyDetails';
import { cities } from './cities';
import Logo from '../components/Logo';
import LazyRender from '../components/LazyRender';
import { getCityUrl } from '../utils/urls';

const Contact = lazy(() => import('../components/Contact'));

export default function CountyPage() {
  const { countyId } = useParams<{ countyId: string }>();
  const county = counties.find(c => c.id === countyId);
  const details = county ? countyDetailsMap[county.id] : undefined;
  
  const [geoStatus, setGeoStatus] = useState<'idle' | 'checking' | 'granted' | 'denied' | 'outside'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleVerifyLoc = () => {
    if (!county) return;
    if (!("geolocation" in navigator)) {
      setGeoStatus('denied');
      return;
    }

    setGeoStatus('checking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistance(latitude, longitude, county.lat, county.lng);
        // If within 40 miles (roughly covers a county area from center)
        if (distance < 40) {
          setGeoStatus('granted');
        } else {
          setGeoStatus('outside');
        }
      },
      (error) => {
        console.warn("Geolocation access denied or error:", error);
        setGeoStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

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

  // Find cities specifically mapped to this county in cities.ts
  const localAppCities = cities.filter(c => c.countyId === county.id);

  // Generate dynamic, extremely rich FAQ array for AEO (Answer Engine Optimization) & Voice Search
  const richFaqItems = details?.extendedContent?.faqs || [
    {
      question: `How do I secure a bail bond in ${county.name}, MO?`,
      answer: `To secure an immediate bail bond, contact Jody Story Bail Bonds 24/7 at (573) 854-9264. Our experienced bondsmen coordinate directly with the court clerk and duty deputies. You will typically need to pay a standard 10% premium or establish certified collateral to initiate the release procedure. We deal with everything immediately so you can focus on your family.`
    },
    {
      question: `Where is the main detention center of ${county.name} located?`,
      answer: details 
        ? `Individuals arrested in ${county.name} are held at the ${details.jailName}, located at ${details.jailAddress}. Jody Story coordinates directly with the ${details.sheriffOffice} to process paperwork and secure release promptly.`
        : `Most individuals arrested within ${county.name} are processed and held at the main county detention center near the local courthouse. Jody Story coordinates with the Sheriff's department around the clock to post bonds with zero delay.`
    },
    {
      question: `How long does the bail release process take at ${details?.jailName || 'jail'}?`,
      answer: details
        ? `Release schedules at the ${details.jailName} in ${details.countySeat} generally take between 1 to 3 hours once our certified agent delivers the approved surety or cash filing. Actual transit times depend heavily on active duty intake volumes, courthouse hours, and scheduling shifts.`
        : "Standard releases typically range between 1 and 3 hours from the moment our agent registers the authorized bond paperwork with the correctional officers on duty."
    },
    {
      question: `Does Jody Story accept flexible payment plans in ${county.name}?`,
      answer: `Yes, we understand that sudden legal problems are stressful and expensive. We offer customizable financing plans with low down payments and installment configurations suited to your home budget. We service all of ${county.name} with honest, completely transparent, non-interest terms for qualifying clients.`
    }
  ];

  const isWebster = county.id === 'webster';
  const isRipley = county.id === 'ripley';
  const isHowell = county.id === 'howell';

  const pageTitle = isWebster
    ? "Webster County Bail Bonds | Marshfield MO | 24/7 Jody Story"
    : isRipley
      ? "Ripley County Bail Bonds | Doniphan MO | 24/7 Fast Release"
      : isHowell
        ? "Howell County Bail Bonds | West Plains MO | 24/7 Jody Story"
        : `${county.name} Bail Bonds | 24/7 Fast Jail Release | Jody Story`;

  const pageDescription = (() => {
    if (isWebster) return "Need 24/7 bail bonds in Webster County? We offer fast jail release in Marshfield, Seymour, and Rogersville. Call Jody Story at (573) 854-9264.";
    if (isRipley) return "Need 24/7 bail bonds in Ripley County? Jody Story offers reliable jail release in Doniphan, Naylor, & Fairdealing. Call (573) 854-9264 now.";
    if (isHowell) return "Fast 24/7 bail bonds in Howell County, MO. We provide professional jail release in West Plains & Willow Springs. Call Jody Story at (573) 854-9264.";
    
    if (details) {
      const jail = details.jailName;
      const city = details.countySeat ? ` in ${details.countySeat}` : '';
      let desc = `Fast 24/7 bail bonds in ${county.name}, MO. We offer reliable jail release at ${jail}${city}. Call Jody Story at (573) 854-9264.`;
      
      if (desc.length > 160) {
        desc = `24/7 bail bonds in ${county.name}. Fast release at ${jail}${city}. Call Jody Story at (573) 854-9264.`;
      }
      if (desc.length > 160) {
        desc = `24/7 bail bonds in ${county.name}. Fast release at ${jail}. Call (573) 854-9264.`;
      }
      if (desc.length < 120) {
        desc = `Need fast 24/7 bail bonds in ${county.name}? We provide reliable jail release at ${jail}${city}. Call Jody Story now at (573) 854-9264.`;
      }
      return desc;
    }
    
    let defaultDesc = `Fast 24/7 bail bonds in ${county.name}, MO. We provide reliable jail release across the ${county.circuit} area. Call Jody Story at (573) 854-9264.`;
    if (defaultDesc.length < 120) {
      defaultDesc = `Need fast 24/7 bail bonds in ${county.name}, MO? We provide reliable jail release across the ${county.circuit} area. Call Jody Story now at (573) 854-9264.`;
    }
    return defaultDesc;
  })();

  const pageKeywords = `${county.name} Bail Bonds, ${details?.countySeat || ''} MO Bondsman, ${details?.jailName || ''}, ${county.circuit} Bail Service, ${county.name} Sheriff, Bail Bonds near ${county.name} Missouri, Jody Story Bail Bonds`;
  const pageUrl = `https://jstorybailbonds.com/service-area/${county.id}`;
  const pageImage = (isWebster || isRipley || isHowell)
    ? "https://jstorybailbonds.com/logo.png"
    : "https://jstorybailbonds.com/jody_story_bailbonds.jpg";

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
          {JSON.stringify(
            isWebster
              ? {
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "LegalService",
                      "name": "Jody Story Bail Bonds LLC",
                      "url": "https://jstorybailbonds.com/service-area/webster",
                      "image": "https://jstorybailbonds.com/logo.png",
                      "telephone": "573-854-9264",
                      "email": "jodystory95@yahoo.com",
                      "priceRange": "$$",
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Marshfield",
                        "addressRegion": "MO",
                        "addressCountry": "US"
                      },
                      "knowsAbout": ["Bail Bonds", "Surety Bonds", "Transfer Bonds", "Webster County Court Rules", "Jail Release Procedures"],
                      "areaServed": [
                        {
                          "@type": "AdministrativeArea",
                          "name": "Webster County",
                          "containsPlace": [
                            {"@type": "City", "name": "Marshfield"},
                            {"@type": "City", "name": "Seymour"},
                            {"@type": "City", "name": "Rogersville"}
                          ]
                        }
                      ]
                    },
                    {
                      "@type": "BreadcrumbList",
                      "@id": "https://jstorybailbonds.com/service-area/webster/#breadcrumb",
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
                            "@id": "https://jstorybailbonds.com/service-area/webster",
                            "name": "Webster County Bail Bonds"
                          }
                        }
                      ]
                    }
                  ]
                }
              : isRipley
                ? {
                    "@context": "https://schema.org",
                    "@graph": [
                      {
                        "@type": "LegalService",
                        "name": "Jody Story Bail Bonds LLC",
                        "url": "https://jstorybailbonds.com/service-area/ripley",
                        "image": "https://jstorybailbonds.com/logo.png",
                        "telephone": "573-854-9264",
                        "email": "jodystory95@yahoo.com",
                        "priceRange": "$$",
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": "Doniphan",
                          "addressRegion": "MO",
                          "addressCountry": "US"
                        },
                        "knowsAbout": ["Bail Bonds", "Surety Bonds", "Transfer Bonds", "Ripley County Court System", "Jail Release Procedures"],
                        "areaServed": [
                          {
                            "@type": "AdministrativeArea",
                            "name": "Ripley County",
                            "containsPlace": [
                              {"@type": "City", "name": "Doniphan"},
                              {"@type": "City", "name": "Naylor"},
                              {"@type": "City", "name": "Fairdealing"}
                            ]
                          }
                        ]
                      },
                      {
                        "@type": "BreadcrumbList",
                        "@id": "https://jstorybailbonds.com/service-area/ripley/#breadcrumb",
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
                              "@id": "https://jstorybailbonds.com/service-area/ripley",
                              "name": "Ripley County Bail Bonds"
                            }
                          }
                        ]
                      }
                    ]
                  }
                : isHowell
                  ? {
                      "@context": "https://schema.org",
                      "@graph": [
                        {
                          "@type": "LegalService",
                          "name": "Jody Story Bail Bonds LLC",
                          "url": "https://jstorybailbonds.com/service-area/howell",
                          "image": "https://jstorybailbonds.com/logo.png",
                          "telephone": "573-854-9264",
                          "email": "jodystory95@yahoo.com",
                          "priceRange": "$$",
                          "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "West Plains",
                            "addressRegion": "MO",
                            "addressCountry": "US"
                          },
                          "knowsAbout": ["Bail Bonds", "Surety Bonds", "Transfer Bonds", "37th Judicial Circuit Rules", "Howell County Jail Procedures"],
                          "areaServed": [
                            {
                              "@type": "AdministrativeArea",
                              "name": "Howell County",
                              "containsPlace": [
                                {"@type": "City", "name": "West Plains"},
                                {"@type": "City", "name": "Willow Springs"},
                                {"@type": "City", "name": "Mountain View"}
                              ]
                            }
                          ]
                        },
                        {
                          "@type": "BreadcrumbList",
                          "@id": "https://jstorybailbonds.com/service-area/howell/#breadcrumb",
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
                                "@id": "https://jstorybailbonds.com/service-area/howell",
                                "name": "Howell County Bail Bonds"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  : {
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
                          "@id": `https://jstorybailbonds.com/service-area/${county.id}/#bailservice`,
                          "name": `Jody Story Bail Bonds - ${county.name} Division`,
                          "description": `Professional 24-hour bail bond services specializing in ${county.name} and the ${county.circuit}.`,
                          "url": `https://jstorybailbonds.com/service-area/${county.id}`,
                          "telephone": "+1-573-854-9264",
                          "priceRange": "$$",
                          "areaServed": {
                            "@type": "AdministrativeArea",
                            "name": county.name,
                            "containsPlace": localAppCities.map(c => ({
                              "@type": "City",
                              "name": c.name,
                              "url": `https://jstorybailbonds.com${getCityUrl(c.id)}`
                            }))
                          },
                          "address": {
                            "@type": "PostalAddress",
                            "addressLocality": details?.countySeat || "Farmington",
                            "addressRegion": "MO",
                            "addressCountry": "US"
                          },
                          "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": county.lat,
                            "longitude": county.lng
                          },
                          "parentOrganization": {
                            "@id": "https://jstorybailbonds.com/#organization"
                          }
                        },
                        {
                          "@type": "FAQPage",
                          "@id": `https://jstorybailbonds.com/service-area/${county.id}/#faq`,
                          "mainEntity": richFaqItems.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": item.answer
                            }
                          }))
                        },
                        {
                          "@type": "BreadcrumbList",
                          "@id": `https://jstorybailbonds.com/service-area/${county.id}/#breadcrumb`,
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
                                "@id": `https://jstorybailbonds.com/service-area/${county.id}`,
                                "name": `${county.name} Bail Bonds`
                              }
                            }
                          ]
                        }
                      ]
                    }
          )}
        </script>
      </Helmet>
      
      {/* Dynamic Responsive Hero Section */}
      <section className="relative pt-40 pb-20 galaxy-bg overflow-hidden border-b border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black mb-12 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Service Areas
          </Link>
          
          <div className="mb-10 max-w-xl">
            <AnimatePresence mode="wait">
              {geoStatus === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-border/40 bg-brand-surface/30 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                    <div>
                      <p className="text-[9px] text-[#00D2FF] font-black uppercase tracking-widest leading-none">Immediate Response Zone</p>
                      <p className="text-xs text-brand-text-dim mt-1.5 font-light">Check if an active agent is dispatching in your area.</p>
                    </div>
                  </div>
                  <button
                    onClick={handleVerifyLoc}
                    className="self-start sm:self-auto text-[9px] font-black uppercase tracking-widest text-[#00D2FF] border border-[#00D2FF]/40 px-3 py-1.5 hover:bg-[#00D2FF]/10 hover:border-[#00D2FF] transition-all cursor-pointer rounded-sm"
                  >
                    Verify Area
                  </button>
                </motion.div>
              )}

              {geoStatus === 'checking' && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-brand-primary/30 bg-brand-primary/5 p-5 flex items-center gap-3 rounded-sm"
                >
                  <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-brand-text-dim uppercase tracking-widest font-bold">Verifying physical location coordinates...</p>
                </motion.div>
              )}

              {geoStatus === 'granted' && (
                <motion.div
                  key="granted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-accent/35 bg-brand-accent/5 p-5 flex items-center gap-4 rounded-sm"
                >
                  <div className="p-2 bg-brand-accent/20 rounded-full animate-pulse">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-accent font-black uppercase tracking-[0.3em] leading-none">Location Confirmed</p>
                    <p className="text-white text-xs font-light mt-1.5">Success! You are within our immediate {county.name} dispatch circle. Call now to guarantee 15-min agent travel!</p>
                  </div>
                </motion.div>
              )}

              {geoStatus === 'outside' && (
                <motion.div
                  key="outside"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-primary/35 bg-brand-surface/30 p-5 flex items-center gap-4 rounded-sm"
                >
                  <div className="p-2 bg-brand-primary/20 rounded-full">
                    <MapPin className="w-5 h-5 text-[#00D2FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#00D2FF] font-black uppercase tracking-[0.3em] leading-none">Border Alert</p>
                    <p className="text-white text-xs font-light mt-1.5">Your location borders {county.name}, but Jody Story serves the whole {county.circuit} and 20+ other counties across MO. Call for immediate dispatch!</p>
                  </div>
                </motion.div>
              )}

              {geoStatus === 'denied' && (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-red-500/30 bg-red-500/5 p-5 flex items-center gap-3 rounded-sm"
                >
                  <p className="text-xs text-red-400 uppercase tracking-widest font-bold">Location access skipped. We still serve {county.name} 24/7! Contact us directly.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Logo className="w-16 h-16" size={64} priority={true} />
                <span className="text-[10px] text-brand-primary uppercase tracking-[0.4em] font-black block">Certified Missouri {county.circuit}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 italic font-black">
                {county.name} <br/>
                <span className="text-gradient-gold logo-shadow">Bail Bonds</span>
              </h1>
              
              {/* customIntro represents localized AEO contents that makes each county unique */}
              <p className="text-brand-text-dim text-lg mb-12 max-w-xl leading-relaxed font-light">
                {details?.customIntro || `${county.description} We offer fast, confidential 24-hour bail bond services to bring your loved ones home immediately in ${county.name}.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="tel:5738549264" className="px-10 py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(255,184,0,0.4)] text-center rounded-sm">
                  Call Now: (573) 854-9264
                </a>
                <a href="#contact" className="px-10 py-5 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all text-center rounded-sm">
                  Flexible Payment Options
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-surface border border-brand-border p-10 backdrop-blur-md relative rounded-sm shadow-xl"
            >
              <div className="absolute top-0 right-0 p-4 bg-gradient-purple text-white text-[8px] font-black tracking-widest uppercase">
                {county.circuit} Certified Bondsman
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">24/7 Rapid Release</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Always-available mobile agents stationed across {county.name} for swift detention clearance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">{county.circuit} Legal Expertise</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Familiarity with judges, clerks, and local bail conditions inside the {county.name} judicial offices.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">100% Secure & Private</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Strict client privacy and absolute discretion are guaranteed throughout your entire release process.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Ambient background blur */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
      </section>

      {/* Geospatial and Authority Fact-Sheet Grid (GEO Optimization) */}
      <section className="py-20 bg-brand-surface/20 border-b border-brand-border/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary text-[10px] uppercase font-black tracking-[0.4em] block mb-3">Geographic Grounding Info</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white italic font-black">
              {county.name} Local Authority & Area Facts
            </h2>
            <p className="text-brand-text-dim text-sm max-w-xl mx-auto mt-4 font-light">
              We anchor our services in structural local realities to guarantee legally precise answers and extremely responsive agent dispatching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-brand-surface border border-brand-border p-8 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Landmark className="w-8 h-8 text-brand-accent mb-6" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Seat of Jurisdiction</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">{details?.countySeat || "Local Courthouse"}</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                All main administrative bookings and felony hearings for {county.name} take place in the historical seat of {details?.countySeat || "the local district"}.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-8 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Building2 className="w-8 h-8 text-brand-accent mb-6" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Detention Complex</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">{details?.jailName || "County Detention Center"}</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light mb-4">
                Location: <span className="text-white">{details?.jailAddress || "Centerville region"}</span>
              </p>
              <span className="text-[9px] font-black uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 px-2 py-1 text-brand-accent rounded-sm">
                24/7 Agent Availability
              </span>
            </div>

            <div className="bg-brand-surface border border-brand-border p-8 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Compass className="w-8 h-8 text-brand-accent mb-6" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Transit Access</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">Primary Highway Corridors</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light mb-2">
                We monitor local routes including <span className="text-white">{details?.highways || "Local arterials"}</span>.
              </p>
              <p className="text-[10px] text-brand-text-dim italic leading-relaxed font-light">
                Allows our mobile bondsmen to respond in minutes.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-8 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Map className="w-8 h-8 text-brand-accent mb-6" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Municipalities Served</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">Complete Border Coverage</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {localAppCities.length > 0 ? (
                  localAppCities.map(c => (
                    <Link 
                      key={c.id} 
                      to={getCityUrl(c.id)} 
                      className="text-[10px] bg-brand-border/40 hover:bg-brand-primary-dim/20 px-2 py-0.5 rounded-sm border border-brand-border/50 text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all font-bold"
                    >
                      {c.name}
                    </Link>
                  ))
                ) : (
                  details?.majorCities.map((cityName, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] bg-brand-border/40 px-2 py-0.5 rounded-sm border border-brand-border/50 text-brand-text-dim font-bold"
                    >
                      {cityName}
                    </span>
                  ))
                )}
                {/* Fallback extra cities listings from details data */}
                {localAppCities.length > 0 && details && details.majorCities.map((cityName, idx) => (
                  !localAppCities.some(c => c.name.toLowerCase() === cityName.toLowerCase()) && (
                    <span 
                      key={`extra-${idx}`} 
                      className="text-[10px] bg-brand-border/20 px-2 py-0.5 rounded-sm border border-brand-border/30 text-brand-text-dim font-light"
                    >
                      {cityName}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Context with localized layout */}
      <section className="py-24 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif text-white italic font-black mb-8 border-l-4 border-brand-accent pl-6 uppercase tracking-tight">
                  Fast Jail Release & Court Procedures in {county.name}
                </h2>
                
                <div className="prose prose-invert prose-brand max-w-none text-brand-text-dim space-y-6 leading-relaxed font-light">
                  {details?.extendedContent ? (
                    <>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.overview}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                        County Jail Information
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.jailInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                        Court Information & Compliance
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.courtInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-12 mb-6 border-b border-brand-border/40 pb-2">
                        The Local Bail Bond Process
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.localBondProcess}
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        When a friend, partner, or family member gets arrested inside {county.name}, acting without delay is vitally important. 
                        Jody Story Bail Bonds provides immediate, certified support for all individuals facing court hearings in the {county.circuit}. 
                        We understand that receiving a call from jail is highly distressing, which is why we guide you clearly through every form, payment option, and discharge condition.
                      </p>
                      
                      <p>
                        Our professional on-ground agents work directly around the clock with the clerks at the <strong>{details?.countySeat || "local municipal offices"} courthouse</strong> and the <strong>{details?.jailName || "county detention facility"}</strong>. 
                        Whether it's a misdemeanor conviction, traffic offense, or a complex felony warrant, we submit standard, certified bonds efficiently to initiate the physical release protocols.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Local court operations card */}
              <div className="bg-brand-surface border border-brand-border p-8 rounded-sm space-y-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-brand-border/80 pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-accent" />
                  Active Judicial Courts We Serve in {county.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {details ? (
                    details.localCourts.map((courtName, idx) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim text-wrap leading-relaxed">{courtName}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{county.name} Circuit Court</span>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{county.name} Municipal Divisions</span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-[10px] text-brand-text-dim italic leading-relaxed font-light border-t border-brand-border/40 pt-4">
                  *Our agents coordinate hearings and schedules with local court clerks immediately to ensure defendants remain in complete regulatory compliance. You can verify active dockets and case filings online on the official <a href="https://www.courts.mo.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-accent underline hover:text-white transition-colors">Missouri Case.net Portal</a>.
                </p>
              </div>

              {/* Interactive Accordion for AEO and Voice Grounding */}
              <div className="space-y-6">
                <div className="border-l-4 border-brand-primary pl-6">
                  <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Instant Answers</p>
                  <h3 className="text-2xl font-serif text-white italic font-black uppercase tracking-tight">
                    Frequently Asked Questions ({county.name})
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

            {/* Sticky/Responsive Action Sidebar */}
            <div className="space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="p-8 bg-brand-surface border border-brand-primary/30 relative overflow-hidden rounded-sm shadow-lg group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-purple rotate-45 translate-x-12 -translate-y-12 opacity-50" />
                <h3 className="text-xl font-serif font-black italic mb-4 text-gradient-gold">Immediate Dispatch</h3>
                <p className="text-xs uppercase tracking-widest font-black text-[#00D2FF] mb-6">24/7 Mobile Service Line</p>
                <p className="text-xs text-brand-text-dim font-light leading-relaxed mb-8">
                  Licensed bail bondsmen are ready on-call to represent defendants at any court or jail within the {county.name} territory.
                </p>
                
                <a 
                  href="tel:5738549264" 
                  className="flex items-center gap-4 text-2xl font-serif font-black italic text-gradient-gold hover:scale-105 transition-transform logo-shadow"
                >
                  <Phone className="w-6 h-6 text-brand-primary shrink-0" />
                  (573) 854-9264
                </a>
              </div>

              {/* Enhanced surrounding link structures to elevate internal crawl pathways */}
              <div className="p-8 border-2 border-brand-primary hover:border-brand-primary-dim transition-colors rounded-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-6">Explore Neighboring Divisions</h4>
                <div className="flex flex-wrap gap-2">
                  {counties
                    .filter(c => c.id !== county.id)
                    .slice(0, 10)
                    .map(c => (
                      <Link 
                        key={c.id} 
                        to={`/service-area/${c.id}`} 
                        className="px-3 py-1.5 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all rounded-sm hover:-translate-y-0.5 inline-block"
                      >
                        {c.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy contact component */}
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Contact />
        </Suspense>
      </LazyRender>
    </div>
  );
}
