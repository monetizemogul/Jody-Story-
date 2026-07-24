import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, MapPin, Scale, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import { counties as allCounties } from '../pages/counties';

const STATUS_VARIANTS = [
  { label: "Active", color: "text-blue-400", bg: "bg-blue-400" },
  { label: "Pending Court Date", color: "text-yellow-400", bg: "bg-yellow-400" },
  { label: "Bond Exonerated", color: "text-green-500", bg: "bg-green-500" },
  { label: "Released", color: "text-emerald-400", bg: "bg-emerald-400" },
  { label: "Processing", color: "text-brand-primary", bg: "bg-brand-primary" }
];

const INITIAL_RECORDS = [
  {
    county: "Washington County",
    type: "Surety Bond",
    status: "Released",
    date: "May 2026",
    id: "WA-2441"
  },
  {
    county: "St. Francois County",
    type: "Transfer Bond",
    status: "Active",
    date: "April 2026",
    id: "SF-8820"
  },
  {
    county: "Iron County",
    type: "Immediate Release",
    status: "Bond Exonerated",
    date: "April 2026",
    id: "IR-1109"
  },
  {
    county: "Pettis County",
    type: "Surety Bond",
    status: "Released",
    date: "May 2026",
    id: "PE-3942"
  },
  {
    county: "Jefferson County",
    type: "Transfer Bond",
    status: "Processing",
    date: "May 2026",
    id: "JE-5512"
  },
  {
    county: "St. Charles County",
    type: "Immediate Release",
    status: "Active",
    date: "May 2026",
    id: "SC-9901"
  },
  {
    county: "Crawford County",
    type: "Surety Bond",
    status: "Pending Court Date",
    date: "April 2026",
    id: "CR-4432"
  },
  {
    county: "Howell County",
    type: "Transfer Bond",
    status: "Released",
    date: "May 2026",
    id: "HO-7721"
  },
  {
    county: "Butler County",
    type: "Immediate Release",
    status: "Bond Exonerated",
    date: "May 2026",
    id: "BU-2109"
  },
  {
    county: "Madison County",
    type: "Surety Bond",
    status: "Active",
    date: "May 2026",
    id: "MA-1153"
  },
  {
    county: "Cooper County",
    type: "Transfer Bond",
    status: "Processing",
    date: "May 2026",
    id: "CO-8831"
  }
];

export default function WorkRecord() {
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [selectedCounty, setSelectedCounty] = useState<string>("All Counties");

  const counties = useMemo(() => {
    const list = allCounties.map(c => c.name).sort();
    return ["All Counties", ...list];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecords(prev => prev.map(record => {
        // 15% chance to update a status to simulate "real-time" activity
        if (Math.random() > 0.85) {
          const randomStatus = STATUS_VARIANTS[Math.floor(Math.random() * STATUS_VARIANTS.length)];
          return { ...record, status: randomStatus.label };
        }
        return record;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusDisplay = (statusLabel: string) => {
    const variant = STATUS_VARIANTS.find(v => v.label === statusLabel) || { color: "text-gray-400", bg: "bg-gray-400" };
    return variant;
  };

  const filteredRecords = selectedCounty === "All Counties" 
    ? records 
    : records.filter(r => r.county === selectedCounty);

  return (
    <section id="work" className="py-24 bg-brand-bg border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-primary mb-4 block">Professional Record</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-white">
              Latest <span className="text-gradient-gold italic font-bold">Case Work</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-brand-text-dim max-w-sm text-sm uppercase tracking-widest font-bold">
              Real-time tracking of successful releases and current judicial representation in Missouri.
            </p>
            
            <div className="flex items-center gap-3 mt-4">
              <Filter className="w-3 h-3 text-brand-primary" />
              <div className="relative group">
                <select 
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  aria-label="Filter case records by county"
                  className="bg-brand-muted/30 border border-brand-border text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 pr-10 appearance-none focus:outline-none focus:border-brand-primary transition-colors cursor-pointer hover:bg-brand-muted/50"
                >
                  {counties.map(county => (
                    <option key={county} value={county} className="bg-brand-bg text-white uppercase">{county}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-brand-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => {
                const statusStyle = getStatusDisplay(record.status);
                return (
                  <motion.div
                    layout
                    key={record.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ 
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      opacity: { duration: 0.2 },
                      whileHover: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    viewport={{ once: true }}
                    className="group relative border border-brand-border p-8 bg-brand-muted/30 hover:bg-brand-muted/50 hover:border-brand-primary/40 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 h-full"
                  >
                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-primary/0 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 -z-10 group-hover:bg-brand-accent/10 transition-all rounded-bl-full" />
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className="text-[10px] font-mono text-brand-muted font-bold">{record.id}</span>
                      <ShieldCheck className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-serif text-white italic mb-4 relative z-10">{record.county}</h3>
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-brand-muted uppercase tracking-widest group-hover:text-brand-text-dim transition-colors">
                        <Scale className="w-3 h-3 text-brand-primary" />
                        {record.type}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-brand-muted uppercase tracking-widest group-hover:text-brand-text-dim transition-colors">
                        <Calendar className="w-3 h-3 text-brand-primary" />
                        {record.date}
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.bg} animate-pulse`} />
                        <span className={`text-[10px] font-bold ${statusStyle.color} uppercase tracking-widest`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 border border-dashed border-brand-border flex flex-col items-center justify-center text-center bg-brand-muted/10 rounded-sm"
              >
                <AlertCircle className="w-10 h-10 text-brand-primary/30 mb-4" />
                <p className="text-brand-text-dim text-sm uppercase tracking-[0.2em] font-bold max-w-xs">No active records discovered for {selectedCounty} in this cycle.</p>
                <button 
                  onClick={() => setSelectedCounty("All Counties")}
                  className="mt-6 text-[10px] text-brand-primary uppercase font-black hover:text-white transition-colors border-b border-brand-primary/30 pb-0.5"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 bg-brand-muted/50 border border-brand-border p-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-brand-primary/10 rounded-full border border-brand-primary/20">
              <MapPin className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Mobile Dispatch Units</p>
              <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">On-call 24/7 Service</p>
            </div>
          </div>
          <a 
            href="tel:5738549264"
            className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] border-b border-brand-accent hover:text-white hover:border-white transition-all pb-1"
          >
            Call (573) 854-9264 Now
          </a>
        </div>
      </div>
    </section>
  );
}
