
import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import LazyRender from '../components/LazyRender';

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
        <meta name="description" content="Need a bail bondsman in Missouri? Jody Story Bail Bonds provides fast, professional 24/7 jail release services. Call 573-854-9264 for immediate help." />
        <meta name="keywords" content="Missouri Bail Bonds, 24/7 Bail Bondsman MO,Washington County Bail Bonds, Potosi Bail Bonds, Farmington MO Bail Bonds, Jefferson County Bail Bonds MO, Missouri Surety Bonds" />
        <link rel="canonical" href="https://jstorybailbonds.com/" />
        <meta property="og:title" content="Missouri Bail Bonds | Fast 24/7 Jail Release | Jody Story" />
        <meta property="og:description" content="Need a bail bondsman in Missouri? Jody Story Bail Bonds provides fast, professional 24/7 jail release services. Call 573-854-9264 for immediate help." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jstorybailbonds.com/" />
        <meta property="og:image" content="https://jstorybailbonds.com/jody_story_bailbonds.jpg" />
        <meta property="og:site_name" content="Jody Story Bail Bonds" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://jstorybailbonds.com/" />
        <meta name="twitter:title" content="Missouri Bail Bonds | Fast 24/7 Jail Release | Jody Story" />
        <meta name="twitter:description" content="Need a bail bondsman in Missouri? Jody Story Bail Bonds provides fast, professional 24/7 jail release services. Call 573-854-9264 for immediate help." />
        <meta name="twitter:image" content="https://jstorybailbonds.com/jody_story_bailbonds.jpg" />
      </Helmet>
      <Hero />
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Process />
        </Suspense>
      </LazyRender>
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <WorkRecord />
        </Suspense>
      </LazyRender>
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <ServiceAreas />
        </Suspense>
      </LazyRender>
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Calculator />
        </Suspense>
      </LazyRender>
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <FAQ />
        </Suspense>
      </LazyRender>
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Contact />
        </Suspense>
      </LazyRender>
    </main>
  );
}
