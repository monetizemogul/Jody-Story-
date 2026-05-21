import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    q: "What exactly is a Bail Bond?",
    a: "A bail bond is a financial guarantee provided by a bondsman to the court that a defendant will appear for all scheduled court proceedings. It allows the defendant to be released from custody while their case is pending, rather than staying in jail."
  },
  {
    q: "How long does the release process take?",
    a: "Usually, once the paperwork is complete and the bond is posted, the release process can take between 2 to 6 hours. This depends entirely on the jail facility's current staff levels and processing speed."
  },
  {
    q: "Is the 10% premium refundable?",
    a: "No. The 10% fee is the payment for the bondsman's service and for taking the financial risk of the full bail amount. This fee is non-refundable, regardless of whether the charges are dropped or the case is dismissed."
  },
  {
    q: "What information do I need when I call you?",
    a: "To help you quickly, please have the defendant's full legal name, date of birth, the jail they are being held in, and the specific charges or the bail amount if you already know it."
  },
  {
    q: "What happens if the defendant misses court?",
    a: "If a court date is missed, the bond can be forfeited and a warrant is issued. In this situation, you should contact us immediately. We can often work with you and the court to 're-instate' the bond and resolve the warrant without going back to jail."
  },
  {
    q: "What types of collateral do I need?",
    a: "While many smaller bonds only require a co-signer's signature, larger bonds may require collateral such as car titles, property deeds, or other items of value. We assess this on a case-by-case basis."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-brand-bg">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}
      </script>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-primary mb-4 block">Information Center</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-white">
            Common <span className="text-gradient-gold italic font-bold">Inquiries</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-brand-border bg-brand-surface/50 overflow-hidden"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-all outline-none"
              >
                <span className="text-sm font-bold text-white uppercase tracking-widest">{faq.q}</span>
                <div className={cn("transition-transform duration-300 text-brand-primary", openIdx === idx ? "rotate-180" : "")}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ 
                  height: openIdx === idx ? 'auto' : 0, 
                  opacity: openIdx === idx ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 text-brand-text-dim text-sm leading-relaxed border-t border-brand-border pt-6 font-light">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
