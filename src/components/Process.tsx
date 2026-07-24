import { motion } from 'motion/react';
import { UserPlus, FileText, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

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
          <div className="relative border border-brand-border p-2 bg-brand-surface group/doc rounded-lg overflow-hidden shadow-2xl">
            {/* Elegant, interactive mock-up of a premium, state-approved judicial release decree */}
            <div className="relative w-full aspect-[1.58] max-w-[550px] mx-auto bg-[#070D28] border border-brand-accent/20 rounded p-6 flex flex-col justify-between overflow-hidden select-none transition-all duration-500 hover:border-brand-accent/50 hover:shadow-[0_0_30px_rgba(255,184,0,0.15)]">
              {/* Gold Security Border Trim */}
              <div className="absolute inset-2 border border-brand-accent/10 pointer-events-none rounded animate-pulse" />
              <div className="absolute inset-2.5 border border-dashed border-brand-accent/5 pointer-events-none rounded" />

              {/* Background watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover/doc:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-48 h-48 fill-brand-accent">
                  <path d="M50 15 L25 35 L25 65 L50 85 L75 65 L75 35 Z M50 25 L65 40 L65 60 L50 75 L35 60 L35 40 Z" />
                </svg>
              </div>

              {/* Document Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#00D2FF]/85">Missouri Judicial Bond Decree</span>
                  <h4 className="font-serif text-lg leading-tight text-white tracking-wide mt-1 font-semibold uppercase">
                    Jody Story <span className="text-brand-accent font-normal italic font-serif">Bail Bonds</span>
                  </h4>
                  <p className="text-[7px] text-[#E0E4EC]/40 uppercase tracking-[0.2em] mt-0.5">Licensed & Registered State Bondsman LLC</p>
                </div>
                <div className="text-right">
                  <div className="inline-block px-1.5 py-0.5 border border-brand-accent/30 bg-brand-accent/5 text-[8px] font-mono font-bold text-brand-accent tracking-widest uppercase rounded">
                    BOND #7783496
                  </div>
                  <div className="text-[7px] font-mono text-[#E0E4EC]/40 mt-1">STATUS: SECURED & ACTIVE</div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent my-2" />

              {/* Document Fields */}
              <div className="relative z-10 grid grid-cols-2 gap-4 my-1 text-left">
                <div className="space-y-2">
                  <div>
                    <span className="block text-[7px] uppercase font-mono tracking-wider text-[#E0E4EC]/45">Primary Jurisdictions</span>
                    <span className="block text-[10px] font-bold text-white tracking-wide font-sans mt-0.5">Washington • St. Francois • Jefferson Counties</span>
                  </div>
                  <div>
                    <span className="block text-[7px] uppercase font-mono tracking-wider text-[#E0E4EC]/45">Circuit Court Districts</span>
                    <span className="block text-[10px] font-bold text-[#00D2FF] tracking-wide font-sans mt-0.5">Circuit 24, 23, 18 @ 10% Statutory Premium</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="block text-[7px] uppercase font-mono tracking-wider text-[#E0E4EC]/45">Bail Release Guarantee</span>
                    <p className="text-[9px] text-[#E0E4EC]/70 leading-relaxed font-serif italic mt-0.5 font-normal">
                      "Immediate judicial filing and processing in compliance with State legal divisions."
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent my-1.5" />

              {/* Document Footer: Seal & Signatures & Brass Keys */}
              <div className="relative z-10 flex justify-between items-end mt-1">
                {/* Official Stamp */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 border border-brand-accent/30 rounded-full flex items-center justify-center bg-brand-surface/40 hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0.5 border border-dashed border-brand-accent/20 rounded-full" />
                    <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-brand-accent stroke-[1.5] opacity-80">
                      <path d="M50 20 L50 80 M20 50 L80 50 M29 29 L71 71 M29 71 L71 29" strokeWidth="1" strokeDasharray="3,3" />
                      <circle cx="50" cy="50" r="30" strokeWidth="1.5" />
                    </svg>
                    <span className="absolute text-[5px] font-bold text-brand-accent tracking-tighter uppercase scale-75">J. S. BAIL</span>
                  </div>
                  <div>
                    <span className="block text-[6px] font-mono text-[#E0E4EC]/30">ISSUED IN COMPLIANCE BY</span>
                    <span className="block text-[11px] font-serif italic font-bold tracking-wide text-brand-accent mt-0.5">Jody Story</span>
                    <span className="block text-[5px] font-mono text-brand-primary uppercase tracking-widest leading-none">Registered Bondsman</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[6px] font-mono text-[#E0E4EC]/30">LEGAL COMPLIANCE SEAL</span>
                  <span className="block text-[9px] font-mono text-white/80 uppercase tracking-widest mt-1">STATE APPROVED</span>
                </div>
              </div>

              {/* Brass Jail Keys Vector Overlay: Absolutely Positioned over the document */}
              <div className="absolute -bottom-2 -right-2 w-32 h-20 pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] filter group-hover/doc:-translate-y-1 group-hover/doc:rotate-3 transition-all duration-700">
                <svg viewBox="0 0 160 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF8D0" />
                      <stop offset="30%" stopColor="#FFB800" />
                      <stop offset="70%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                    <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E6C47A" />
                      <stop offset="50%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                  </defs>

                  {/* Brass Ring */}
                  <circle cx="55" cy="45" r="18" fill="none" stroke="url(#ring-grad)" strokeWidth="3" />
                  <circle cx="55" cy="45" r="18" fill="none" stroke="#251203" strokeWidth="0.5" className="opacity-40" />

                  {/* Key 1 (Primary Skeleton Key) */}
                  <g transform="translate(55, 45) rotate(-35)">
                    {/* Key Bow (Ring on Key Head) */}
                    <circle cx="0" cy="0" r="8" fill="none" stroke="url(#brass-grad)" strokeWidth="3.5" />
                    <circle cx="0" cy="0" r="5" fill="none" stroke="#000" strokeWidth="0.5" className="opacity-20" />
                    {/* Key Shaft */}
                    <path d="M8 0 L58 0" stroke="url(#brass-grad)" strokeWidth="4" strokeLinecap="round" />
                    {/* Key Bit (The tooth) */}
                    <path d="M50 0 L50 14 L56 14 L56 5 L52 2 L52 0 Z" fill="url(#brass-grad)" />
                    {/* Collar details */}
                    <rect x="14" y="-3" width="3" height="6" fill="url(#brass-grad)" rx="1" />
                    <rect x="46" y="-3.5" width="4" height="7" fill="url(#brass-grad)" rx="1.5" />
                  </g>

                  {/* Key 2 (Secondary angled Skeleton Key) */}
                  <g transform="translate(55, 45) rotate(-5)">
                    {/* Key Bow */}
                    <circle cx="0" cy="0" r="7" fill="none" stroke="url(#brass-grad)" strokeWidth="3" />
                    {/* Key Shaft */}
                    <path d="M7 0 L48 0" stroke="url(#brass-grad)" strokeWidth="3.2" strokeLinecap="round" />
                    {/* Key Bit */}
                    <path d="M41 0 L41 11 L46 11 L46 4 L43 2 L43 0 Z" fill="url(#brass-grad)" />
                    {/* Collar details */}
                    <rect x="12" y="-2" width="2" height="4" fill="url(#brass-grad)" rx="1" />
                    <rect x="37" y="-2.5" width="3" height="5" fill="url(#brass-grad)" rx="1" />
                  </g>

                  {/* Ring highlight segment */}
                  <path d="M40 35 A18 18 0 0 1 65 30" fill="none" stroke="#FFF8D0" strokeWidth="1.2" className="opacity-70" />
                </svg>
              </div>
            </div>
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
