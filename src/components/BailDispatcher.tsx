import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Headset, X, MessageSquare, ArrowRight, Phone, Smartphone, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  type: 'bot' | 'user';
  options?: string[];
  field?: string;
}

interface IntakeData {
  defendantName: string;
  county: string;
  bondAmount: string;
  requesterName: string;
  requesterPhone: string;
}

const STEPS = [
  { id: 'start', text: "Hello, this is the Jody Story 24/7 Bail Dispatcher. We are one call away from setting you free. \n\nWho are we trying to help today? (Enter Defendant's Name)", next: 'county' },
  { id: 'county', text: "Understood. Which county are they being held in?", options: ['Washington', 'Jefferson', 'St. Francois', 'St. Charles', 'Howell', 'Iron', 'Other'], next: 'bond' },
  { id: 'bond', text: "Do you know the bail amount? (Example: 5000, or type 'Unknown')", next: 'requester' },
  { id: 'requester', text: "Got it. And what is your name?", next: 'contact' },
  { id: 'contact', text: "One last thing: What is the best phone number for an agent to call you back on?", next: 'final' }
];

export default function BailDispatcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [intake, setIntake] = useState<IntakeData>({
    defendantName: '',
    county: '',
    bondAmount: '',
    requesterName: '',
    requesterPhone: ''
  });
  const [input, setInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        id: '1', 
        type: 'bot', 
        text: STEPS[0].text 
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option: string) => {
    submitResponse(option);
  };

  const submitResponse = (val: string) => {
    if (!val.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: val };
    const step = STEPS[currentStepIndex];
    
    // Update data
    const newIntake = { ...intake };
    if (step.id === 'start') newIntake.defendantName = val;
    if (step.id === 'county') newIntake.county = val;
    if (step.id === 'bond') newIntake.bondAmount = val;
    if (step.id === 'requester') newIntake.requesterName = val;
    if (step.id === 'contact') newIntake.requesterPhone = val;
    setIntake(newIntake);

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Advance
    if (currentStepIndex < STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: STEPS[nextIndex].text,
          options: STEPS[nextIndex].options
        }]);
      }, 600);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: "Intake Complete. Click below to instantly notify our dispatch team on their mobile devices."
        }]);
      }, 600);
    }
  };

  const shareToAgent = () => {
    const text = `BAIL REQUEST:
- Inmate: ${intake.defendantName}
- County: ${intake.county}
- Bond: ${intake.bondAmount}
- Requester: ${intake.requesterName}
- Contact: ${intake.requesterPhone}
- Source: JodyStoryBailBonds.com`;

    // Try SMS first
    const smsUrl = `sms:5738549264?body=${encodeURIComponent(text)}`;
    window.location.href = smsUrl;
  };

  const resetDispatcher = () => {
    setMessages([]);
    setCurrentStepIndex(0);
    setIntake({
      defendantName: '',
      county: '',
      bondAmount: '',
      requesterName: '',
      requesterPhone: ''
    });
    setIsComplete(false);
    setInput('');
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-bg text-brand-primary p-4 rounded-full shadow-[0_0_40px_rgba(0,210,255,0.4)] hover:scale-105 transition-all active:scale-95 group border border-brand-primary/30"
      >
        <div className="absolute -top-1 -left-1 bg-gradient-purple text-white text-[8px] font-bold px-2 py-1 border border-brand-primary/30 uppercase tracking-widest whitespace-nowrap shadow-lg">
          Express Dispatch
        </div>
        <Smartphone className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-brand-bg rounded-none shadow-[0_0_80px_rgba(0,0,0,0.8)] z-[60] flex flex-col border border-brand-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-brand-surface text-white flex justify-between items-center border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center rounded-sm">
                    <Smartphone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-brand-surface animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">Rapid Response</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white uppercase font-bold tracking-[0.1em]">Bail Dispatcher</span>
                  </div>
                </div>
              </div>
              <button onClick={resetDispatcher} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0B0D]">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", msg.type === 'user' ? "ml-auto flex-row-reverse text-right" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-sm border flex-shrink-0 flex items-center justify-center backdrop-blur-sm",
                    msg.type === 'bot' ? "bg-brand-muted border-brand-border" : "bg-brand-primary border-brand-primary"
                  )}>
                    {msg.type === 'bot' ? <ShieldCheck className="w-4 h-4 text-brand-primary" /> : <User className="w-4 h-4 text-black" />}
                  </div>
                  <div className="space-y-3">
                    <div className={cn(
                      "p-4 text-[11px] leading-relaxed tracking-wide shadow-sm",
                      msg.type === 'bot' 
                        ? "bg-brand-muted border border-brand-border text-brand-text font-light" 
                        : "bg-brand-primary text-black font-bold uppercase tracking-widest"
                    )}>
                      {msg.text}
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-2 justify-start">
                        {msg.options.map(opt => (
                          <button 
                            key={opt}
                            onClick={() => handleOptionClick(opt)}
                            className="px-3 py-1.5 border border-brand-primary/30 text-[9px] uppercase font-bold text-brand-primary hover:bg-brand-primary hover:text-black transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-4 border-t border-brand-border"
                >
                  <div className="p-4 bg-brand-primary/10 border border-brand-primary/20">
                    <p className="text-[10px] text-white uppercase font-bold tracking-widest mb-4">Summary Verification</p>
                    <div className="space-y-2 text-[9px] text-brand-text-dim uppercase tracking-widest font-medium">
                      <div className="flex justify-between"><span>Defendant:</span> <span className="text-white">{intake.defendantName}</span></div>
                      <div className="flex justify-between"><span>County:</span> <span className="text-white">{intake.county}</span></div>
                      <div className="flex justify-between"><span>Bond:</span> <span className="text-white">${intake.bondAmount}</span></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={shareToAgent}
                    className="w-full bg-brand-primary text-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(0,173,239,0.3)]"
                  >
                    <Smartphone className="w-4 h-4" />
                    Text Dispatch Team
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <a 
                    href="tel:5738549264"
                    className="w-full border border-brand-border text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-muted transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Direct Now
                  </a>
                </motion.div>
              )}
            </div>

            {/* Input */}
            {!isComplete && (
              <div className="p-6 bg-brand-surface border-t border-brand-border flex gap-4">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitResponse(input)}
                  placeholder="Type your response..."
                  className="flex-1 bg-brand-bg border border-brand-border px-4 py-3 text-[10px] text-white focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest placeholder:text-gray-700"
                />
                <button 
                  onClick={() => submitResponse(input)}
                  disabled={!input.trim()}
                  className="bg-brand-primary text-black p-3 hover:bg-brand-primary/80 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="px-6 py-4 bg-[#050505] border-t border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-brand-primary" />
                <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Serving 20+ MO Counties</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-brand-primary" />
                <span className="text-[7px] text-gray-600 uppercase tracking-widest">Encrypted Port</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
