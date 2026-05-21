import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Michael R.",
    location: "Washington County",
    text: "Jody was incredible. When my son was arrested in the middle of the night, I didn't know who to call. Jody answered on the second ring and had him home before sunrise. Professional and compassionate.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah T.",
    location: "Jefferson County",
    text: "Extremely fast service. The 10% fee was exactly what was quoted, no hidden costs. They made a very stressful situation much easier to handle. Highly recommend for anyone in MO.",
    rating: 5
  },
  {
    id: 3,
    name: "David L.",
    location: "St. Francois County",
    text: "I've dealt with other bondsmen before, but Jody Story is on another level. Confidential, direct, and actually cares about getting people back to their families. Best in the business.",
    rating: 5
  },
  {
    id: 4,
    name: "Jessica P.",
    location: "Howell County",
    text: "Fast, reliable, and available 24/7 as promised. They walked me through every step of the process which was very helpful since I had no idea how bail bonds worked.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-brand-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full mb-6"
          >
            <Star className="w-3 h-3 text-brand-primary fill-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Rated 5.0 Stars</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-white italic font-black uppercase tracking-tight"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full text-center"
            >
              <div className="mb-8 flex justify-center">
                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Quote className="w-10 h-10 text-brand-primary" />
                </div>
              </div>

              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-accent fill-brand-accent" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-brand-text-dim leading-relaxed mb-10 font-medium italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div>
                <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-brand-primary text-xs font-black uppercase tracking-[0.3em] mt-1">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 md:-mx-16">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 hover:bg-brand-primary/20 text-white transition-all pointer-events-auto border border-white/10 backdrop-blur-sm group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 hover:bg-brand-primary/20 text-white transition-all pointer-events-auto border border-white/10 backdrop-blur-sm group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "h-1.5 transition-all rounded-full",
                index === currentIndex ? "w-8 bg-brand-primary" : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
