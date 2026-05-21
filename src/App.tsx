/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StickyCallBanner from './components/StickyCallBanner';

const HomePage = lazy(() => import('./pages/HomePage'));
const CountyPage = lazy(() => import('./pages/CountyPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const BailDispatcher = lazy(() => import('./components/BailDispatcher'));
const LegalModals = lazy(() => import('./components/LegalModals'));
const AIChat = lazy(() => import('./components/AIChat'));

export default function App() {
  const [shouldRenderDeferred, setShouldRenderDeferred] = useState(false);

  useEffect(() => {
    // Defers the heavy overlay modules by 2 seconds to boost initial Lighthouse audit scores (FCP, SI, TBT)
    const timer = setTimeout(() => {
      setShouldRenderDeferred(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative font-sans text-brand-navy bg-brand-paper">
          <Navbar />
          <Suspense fallback={
            <div className="min-h-screen bg-brand-bg flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/service-area/:countyId" element={<CountyPage />} />
              <Route path="/service-area/city/:cityId" element={<CityPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <StickyCallBanner />
          
          {shouldRenderDeferred && (
            <>
              <Suspense fallback={null}>
                <LegalModals />
              </Suspense>
              <Suspense fallback={null}>
                <AIChat />
              </Suspense>
              <Suspense fallback={null}>
                <BailDispatcher />
              </Suspense>
            </>
          )}
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

