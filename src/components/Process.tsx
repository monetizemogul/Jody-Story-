import { motion } from 'motion/react';
import { UserPlus, FileText, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import contractImg from '../assets/images/bail_bond_contract_keys_1778349622800.jpg';

const steps = [
  {
    title: "Call Us First",
    description: "Provide the full name of the person in custody and where they are being held.",
    icon: UserPlus,
  },
  {
    title: "Quick Documentation",
    description: "We handle the paperwork and verify the bail amount with the court.",
    icon: FileText,
  },
  {
    title: "Premium & Payment Plans",
    description: "Pay the 10% premium. We offer various payment plans and methods for your convenience.",
    icon: Lock,
  },
  {
    title: "Rapid Release",
    description: "We post the bond and work with the facility to ensure the fastest possible release.",
    icon: CheckCircle2,
  },
];

export default function Process() {
  return (
    <section id="how-it-works" className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-primary mb-4 block">Our Methodology</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white">
              The Path to <span className="text-gradient-gold italic font-bold">Freedom</span>
            </h2>
          </div>
          <p className="text-brand-text-dim text-sm max-w-sm leading-relaxed uppercase tracking-widest text-[10px]">
            We prioritize speed and clarity. Efficient, precise steps to return normalcy to your family.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-brand-border">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ backgroundColor: "rgba(196, 164, 132, 0.03)" }}
              className={cn(
                "p-10 transition-all border-brand-border",
                idx !== steps.length - 1 ? "lg:border-r" : "",
                idx < 2 ? "border-b lg:border-b-0" : "border-b md:border-b-0",
                idx === 1 ? "md:border-r" : ""
              )}
            >
              <div className="text-6xl font-serif italic font-bold text-brand-accent/40 mb-8">
                {idx + 1}
              </div>
              <div className="w-10 h-10 border border-brand-accent/30 flex items-center justify-center mb-8 rotate-45 group hover:rotate-0 transition-all">
                <step.icon className="w-5 h-5 text-brand-accent -rotate-45 group-hover:rotate-0 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">{step.title}</h3>
              <p className="text-xs text-brand-text-dim leading-relaxed tracking-wide">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative border border-brand-border p-2 bg-brand-muted">
            <img 
              src={contractImg} 
              alt="Bail Bond Documentation" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              width={550}
              height={350}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white italic font-bold mb-6 italic underline decoration-brand-accent/30 underline-offset-8">Dedicated Representation.</h3>
            <p className="text-brand-text-dim text-sm leading-relaxed mb-8 uppercase tracking-[0.15em] font-bold">
              We aren't just agents; we are your advocates. Jody Story Bail Bonds LLC specializes in complex cases requiring immediate attention and absolute confidentiality.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                <div className="w-2 h-2 bg-brand-accent" />
                Legal Paperwork Specialists
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                <div className="w-2 h-2 bg-brand-accent" />
                Direct Court Liaisons
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                <div className="w-2 h-2 bg-brand-accent" />
                No Hidden Processing Fees
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
