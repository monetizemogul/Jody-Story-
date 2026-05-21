
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';

const Calculator = lazy(() => import('../components/Calculator'));
const Process = lazy(() => import('../components/Process'));
const Contact = lazy(() => import('../components/Contact'));
const FAQ = lazy(() => import('../components/FAQ'));
const WorkRecord = lazy(() => import('../components/WorkRecord'));
const ServiceAreas = lazy(() => import('../components/ServiceAreas'));

export default function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Missouri Bail Bonds | Fast 24/7 Jail Release | Jody Story</title>
        <meta name="description" content="Need bail bonds in Missouri? Jody Story provides fast, professional 24/7 jail release in Washington, St. Francois, Jefferson, and surrounding counties. Expert bondsman available now." />
        <meta name="keywords" content="Missouri Bail Bonds, 24/7 Bail Bondsman MO,Washington County Bail Bonds, Potosi Bail Bonds, Farmington MO Bail Bonds, Jefferson County Bail Bonds MO, Missouri Surety Bonds" />
        <meta property="og:title" content="Missouri Bail Bonds | Fast 24/7 Jail Release" />
        <meta property="og:description" content="Professional 24/7 bail bond assistance in Missouri. Secure release now with Jody Story." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jstorybailbonds.com" />
        <meta property="og:image" content="https://jstorybailbonds.com/assets/images/jody_story_bailbonds.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Hero />
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <Process />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <WorkRecord />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <ServiceAreas />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <Calculator />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
        <Contact />
      </Suspense>
    </main>
  );
}
