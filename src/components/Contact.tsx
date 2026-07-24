import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { counties } from '../pages/counties';

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100, "Name too long"),
  phone: z.string().trim().min(10, "Valid phone number required").max(20, "Phone number too long"),
  email: z.string().trim().email("Valid email required").max(150, "Email too long"),
  county: z.string().min(1, "County of arrest is required"),
  message: z.string().trim().min(10, "Please provide more details").max(2000, "Message is too long (max 2000 characters)"),
  inmateName: z.string().trim().max(100, "Name too long").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataVal, setFormDataVal] = useState<ContactFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    setFormDataVal(data);
    
    try {
      const subject = `Bail Bond Lead: ${data.name} (${data.county})`;
      const body = `Jody Story Bail Bonds LLC Contact Form Submission:\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Email: ${data.email}\n` +
        `County of Arrest: ${data.county}\n` +
        `Inmate Name: ${data.inmateName || 'N/A'}\n\n` +
        `Message Details:\n${data.message}\n\n` +
        `Submitted on: ${new Date().toLocaleString()}`;

      const mailtoUrl = `mailto:jodystory95@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open default email application
      window.location.href = mailtoUrl;
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <div className="mb-12 p-6 bg-brand-accent/10 border border-brand-accent/20">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-accent mb-2 block">Emergency Hotline</span>
              <p className="text-white text-lg font-serif italic mb-4">Need help right now? Our agents are standing by 24/7 for immediate jail release.</p>
              <a href="tel:5738549264" className="inline-flex items-center gap-3 text-brand-accent font-mono font-bold text-xl hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                573-854-9264
              </a>
            </div>

            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-accent mb-4 block">Secure Inquiry</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-8">
              Reliable <span className="text-brand-accent italic font-bold">Assistance</span>
            </h2>
            <p className="text-brand-text-dim mb-16 text-lg leading-relaxed font-light">
              Our agents are positioned for immediate deployment across the region. Discreet, professional, and rapid response at any hour.
            </p>
            
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 border border-brand-accent/20 flex items-center justify-center flex-shrink-0 group-hover:border-brand-accent transition-colors rotate-45 group-hover:rotate-0">
                  <Phone className="w-5 h-5 text-brand-accent -rotate-45 group-hover:rotate-0 transition-all" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-mono">Immediate Line</div>
                  <div className="text-2xl font-mono font-bold text-white tracking-tight">573-854-9264</div>
                  <div className="text-[10px] text-brand-accent/60 uppercase tracking-widest mt-1 font-bold">Direct & Anonymous</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 border border-brand-accent/20 flex items-center justify-center flex-shrink-0 group-hover:border-brand-accent transition-colors rotate-45 group-hover:rotate-0">
                  <Mail className="w-5 h-5 text-brand-accent -rotate-45 group-hover:rotate-0 transition-all" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-mono">Secure Email</div>
                  <a href="mailto:jodystory95@yahoo.com" className="text-2xl font-serif italic font-bold text-white tracking-tight underline decoration-brand-accent/30 hover:decoration-brand-accent transition-all cursor-pointer">jodystory95@yahoo.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 border border-brand-accent/20 flex items-center justify-center flex-shrink-0 group-hover:border-brand-accent transition-colors rotate-45 group-hover:rotate-0">
                  <MapPin className="w-5 h-5 text-brand-accent -rotate-45 group-hover:rotate-0 transition-all" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 font-mono">Headquarters</div>
                  <div className="text-2xl font-serif text-white/80 font-normal">102 North Mine St</div>
                  <div className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Potosi, MO 63664</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-bg p-6 md:p-12 border border-brand-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-[100px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center rounded-full mb-8">
                    <CheckCircle2 className="w-10 h-10 text-brand-accent animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 italic font-bold">
                    Email Client Launched
                  </h3>
                  <p className="text-brand-text-dim text-sm max-w-sm leading-relaxed mb-8 font-light">
                    Your default mail application has been opened with your pre-populated inquiry draft. Simply click <strong className="text-white">"Send"</strong> in your mail application to instantly transmit these details to <strong className="text-brand-accent">jodystory95@yahoo.com</strong>.
                  </p>

                  {formDataVal && (
                    <div className="w-full space-y-4 mb-4">
                      <a 
                        href={`mailto:jodystory95@yahoo.com?subject=${encodeURIComponent(`Bail Bond Lead: ${formDataVal.name} (${formDataVal.county})`)}&body=${encodeURIComponent(
                          `Jody Story Bail Bonds LLC Contact Form Submission:\n\n` +
                          `Name: ${formDataVal.name}\n` +
                          `Phone: ${formDataVal.phone}\n` +
                          `Email: ${formDataVal.email}\n` +
                          `County of Arrest: ${formDataVal.county}\n` +
                          `Inmate Name: ${formDataVal.inmateName || 'N/A'}\n\n` +
                          `Message:\n${formDataVal.message}\n`
                        )}`}
                        className="w-full bg-brand-accent text-black py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-accent/90 transition-all shadow-lg flex items-center justify-center gap-4 select-none cursor-pointer"
                      >
                        Re-open Email App / Send Manually
                        <Send className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                    }}
                    className="mt-6 text-[10px] font-bold text-brand-muted uppercase tracking-[0.3em] hover:text-white transition-colors"
                  >
                    ← Edit details / Send Another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-8 relative z-10"
                >
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Requester Name</label>
                        <input 
                          {...register('name')}
                          id="contact-name"
                          type="text" 
                          className={`w-full bg-brand-muted/10 border-b ${errors.name ? 'border-red-500' : 'border-brand-border'} py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-muted`} 
                          placeholder="Full name..." 
                        />
                        {errors.name && <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.name.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-phone" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Phone Number</label>
                        <input 
                          {...register('phone')}
                          id="contact-phone"
                          type="tel" 
                          className={`w-full bg-brand-muted/10 border-b ${errors.phone ? 'border-red-500' : 'border-brand-border'} py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-muted`} 
                          placeholder="(555) 000-0000" 
                        />
                        {errors.phone && <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.phone.message}</span>}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Email Address</label>
                        <input 
                          {...register('email')}
                          id="contact-email"
                          type="email" 
                          className={`w-full bg-brand-muted/10 border-b ${errors.email ? 'border-red-500' : 'border-brand-border'} py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-muted`} 
                          placeholder="email@example.com" 
                        />
                        {errors.email && <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.email.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-county" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">County of Arrest</label>
                        <select 
                          {...register('county')}
                          id="contact-county"
                          className={`w-full bg-brand-muted/10 border-b ${errors.county ? 'border-red-500' : 'border-brand-border'} py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all appearance-none`}
                        >
                          <option value="" className="bg-brand-bg">Select County...</option>
                          {counties.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                            <option key={c.id} value={c.name} className="bg-brand-bg">{c.name}</option>
                          ))}
                          <option value="Other" className="bg-brand-bg">Other</option>
                        </select>
                        {errors.county && <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.county.message}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-inmate" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Inmate Name (Optional)</label>
                    <input 
                      {...register('inmateName')}
                      id="contact-inmate"
                      type="text" 
                      className="w-full bg-brand-muted/10 border-b border-brand-border py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-muted" 
                      placeholder="Full legal name" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest">Message Details</label>
                    <textarea 
                      {...register('message')}
                      id="contact-message"
                      rows={4} 
                      className={`w-full bg-brand-muted/10 border-b ${errors.message ? 'border-red-500' : 'border-brand-border'} py-3 px-0 text-sm font-medium text-white focus:outline-none focus:border-brand-accent transition-all placeholder:text-brand-muted resize-none`} 
                      placeholder="Provide context regarding the bond needed..."
                    ></textarea>
                    {errors.message && <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.message.message}</span>}
                  </div>

                  <div className="space-y-4">
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-brand-accent text-black py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-accent/90 transition-all shadow-2xl shadow-brand-accent/5 flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          Processing Request...
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit for Immediate Response
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="w-full text-[10px] font-bold text-brand-muted uppercase tracking-widest hover:text-brand-accent transition-colors py-2"
                    >
                      Clear Form
                    </button>
                  </div>
                  <p className="text-[9px] text-brand-muted uppercase tracking-widest text-center font-bold mt-4">
                    By submitting this form, you agree to our <a href="#privacy" className="underline hover:text-brand-accent">Privacy Policy</a>.
                  </p>
                  <p className="text-[9px] text-brand-muted uppercase tracking-widest text-center font-bold mt-2">
                    <span className="text-brand-accent">Disclaimer:</span> We do not provide legal advice. Please consult an attorney for legal matters.
                  </p>
                  <p className="text-[9px] text-brand-muted uppercase tracking-widest text-center font-bold mt-2">Agents typically respond in under 15 minutes.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
