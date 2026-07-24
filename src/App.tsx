/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  const [hasLegalHash, setHasLegalHash] = useState(false);

  useEffect(() => {
    // Defers the overlays to boost initial FCP/LCP and lower main-thread pressure
    const timer = setTimeout(() => {
      setShouldRenderDeferred(true);
    }, 1500);

    // Only load LegalModals on-demand when one of the matching legal hashes exists
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      const isLegalHash = ['#privacy', '#terms', '#licensing', '#resources', '#disclaimer'].includes(hash);
      if (isLegalHash) {
        setHasLegalHash(true);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', checkHash);
    };
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
              <Route path="/felony-bail-bonds" element={<HomePage />} />
              <Route path="/service-area/city/bonne-terre" element={<Navigate to="/bonne-terre-mo-bail-bonds--24/7-jail-release-services" replace />} />
              <Route path="/bonne-terre-mo-bail-bonds--24/7-jail-release-services" element={<CityPage forceCityId="bonne-terre" />} />
              <Route path="/service-area/city/ironton" element={<Navigate to="/ironton-bail-bonds-247-jail-release" replace />} />
              <Route path="/ironton-bail-bonds-247-jail-release" element={<CityPage forceCityId="ironton" />} />
              <Route path="/service-area/:countyId" element={<CountyPage />} />
              <Route path="/service-area/city/:cityId" element={<CityPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <StickyCallBanner />
          
          {shouldRenderDeferred && (
            <>
              {hasLegalHash && (
                <Suspense fallback={null}>
                  <LegalModals />
                </Suspense>
              )}
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

