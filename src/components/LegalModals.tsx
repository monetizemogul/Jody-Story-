import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Scale, FileText, Landmark } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'licensing' | 'resources' | null;
}

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Charter',
    icon: <Shield className="w-8 h-8 text-brand-accent" />,
    content: `
      Jody Story Bail Bonds LLC is committed to maintaining the absolute confidentiality of our clients. 
      In accordance with Missouri state law and judicial standards, we do not share, sell, or disclose 
      sensitive client information to third parties without explicit consent or judicial order.
      
      Our data protection protocols include:
      - Encrypted communications for all inmate and requester data.
      - Immediate purging of non-essential records post-bond exoneration.
      - Strict adherence to professional secrecy for "discreet" bond scenarios.
    `
  },
  terms: {
    title: 'Terms of Engagement',
    icon: <FileText className="w-8 h-8 text-brand-accent" />,
    content: `
      Engaging Jody Story Bail Bonds LLC signifies acceptance of the following basic terms:
      - Premium set in accordance with Missouri Department of Insurance regulations (typically 10%).
      - Collateral requirements are determined on a case-by-case basis as per judicial risk profiles.
      - The client (Indemnitor) is responsible for ensuring the defendant's appearance at all scheduled court dates.
      - Fees are earned upon the release of the defendant and are non-refundable.
    `
  },
  licensing: {
    title: 'Licensing Verification',
    icon: <Scale className="w-8 h-8 text-brand-accent" />,
    content: `
      Jody Story Bail Bonds LLC is fully licensed to operate in the state of Missouri. 
      Agent License #115793 (Active). Our agents maintain continuous education credits 
      as required by the Professional Bail Agents of Missouri (PBAM).
      
      We are fully insured and bonded to underwrite surety bonds in:
      - Washington County
      - St. Francois County
      - Iron County
      - Jefferson County
    `
  },
  resources: {
    title: 'Judicial Resources',
    icon: <Landmark className="w-8 h-8 text-brand-accent" />,
    content: `
      Access to judicial information and case lookup:
      - CaseNet (Missouri Courts Online): lookup cases by name or number.
      - Washington County Sheriff's Department: Inmate information.
      - St. Francois County Adult Detention Center lookup.
      - Iron County Judicial Circuit information.
      
      Note: We provide these resources for informational purposes but do not provide legal advice.
    `
  },
  disclaimer: {
    title: 'Legal Disclaimer',
    icon: <Scale className="w-8 h-8 text-brand-accent" />,
    content: `
      Jody Story Bail Bonds LLC is a bail bond agency, not a law firm. 
      
      Our services are strictly limited to the posting of bail bonds and providing information related to the bail process. 
      
      CRITICAL NOTICE:
      - We do NOT provide legal advice.
      - We do NOT provide legal representation.
      - Any information provided by our agents or on this website should not be construed as legal counsel.
      
      If you are in need of legal advice, case strategy, or a defense against criminal charges, you MUST consult with a licensed attorney in the state of Missouri.
    `
  }
};

export default function LegalModals() {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'licensing' | 'resources' | 'disclaimer' | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['privacy', 'terms', 'licensing', 'resources', 'disclaimer'].includes(hash)) {
        setModalType(hash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeModal = () => {
    setModalType(null);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  return (
    <AnimatePresence>
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-muted border border-brand-border p-8 md:p-12 shadow-2xl"
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 p-4 rounded-full border border-brand-border bg-brand-bg/50">
                {LEGAL_CONTENT[modalType].icon}
              </div>
              <h2 className="text-3xl font-serif text-white italic font-bold mb-8 italic underline decoration-brand-accent/30 underline-offset-8">
                {LEGAL_CONTENT[modalType].title}
              </h2>
              <div className="text-brand-text-dim leading-relaxed space-y-4 text-left whitespace-pre-line font-light">
                {LEGAL_CONTENT[modalType].content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-border flex justify-center">
              <button 
                onClick={closeModal}
                className="bg-brand-accent text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent/80 transition-all active:scale-95"
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
