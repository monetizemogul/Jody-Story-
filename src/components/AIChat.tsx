import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const SYSTEM_PROMPT = `
You are the AI Assistant for "Jody Story Bail Bonds LLC". 
Your goal is to provide helpful, calm, and professional information about bail bonds.
You are NOT a lawyer and you should NOT give legal advice.
Company Info:
- Name: Jody Story Bail Bonds LLC
- Service: 24/7 Bail Bond assistance
- Areas Served: Over 20 counties across Missouri, including Washington, Jefferson, St. Francois, St. Charles, Howell, and Iron County.
- Core Values: Fast, Confidential, Professional
- Address: 102 North Mine St, Potosi, MO 63664
- Phone: 573-854-9264
- Tone: Empathetic but professional and direct.
Key Info to share:
1. We are open 24/7.
2. The standard fee is 10% of the bail amount.
3. We help with all types of bonds.
4. If someone is in jail, the first step is to call us at 573-854-9264.
If asked for legal advice, politely decline and suggest consulting a licensed attorney.
`;

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm the Jody Story Assistant. How can I assist you professionally today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    const sanitizedInput = input.trim().substring(0, 1000);
    if (!sanitizedInput || isLoading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: sanitizedInput }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      // Add system prompt to history as first message if history is empty or as context
      if (history.length === 0) {
        history.push({ role: 'user', parts: [{ text: SYSTEM_PROMPT }] });
        history.push({ role: 'model', parts: [{ text: "Understood. I will act as the Jody Story Bail Bonds AI Assistant." }] });
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: sanitizedInput,
          history: history 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to chat service");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text || "I'm sorry, I couldn't process that. Please call our office." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please call us at 573-854-9264 for immediate assistance." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-accent text-black p-4 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 group"
      >
        <div className="absolute -top-1 -left-1 bg-brand-bg text-brand-accent text-[8px] font-bold px-2 py-0.5 border border-brand-accent/20 uppercase tracking-widest">
          Secure
        </div>
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-brand-bg rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col border border-brand-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-brand-surface text-white flex justify-between items-center border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-accent flex items-center justify-center rounded">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Bureau Assistant</div>
                  <div className="text-[8px] text-brand-accent uppercase font-bold tracking-[0.3em]">Encrypted Session</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0B0D]">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex gap-4 max-w-[90%]", msg.role === 'user' ? "ml-auto flex-row-reverse text-right" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-none border flex-shrink-0 flex items-center justify-center",
                    msg.role === 'assistant' ? "bg-brand-muted border-brand-border" : "bg-brand-accent border-brand-accent"
                  )}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-brand-accent" /> : <User className="w-4 h-4 text-black" />}
                  </div>
                  <div className={cn(
                    "text-xs leading-relaxed font-light tracking-wide",
                    msg.role === 'assistant' ? "text-brand-text" : "text-white font-medium"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-muted border border-brand-border flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest italic font-bold">
                    <Loader2 className="w-3 h-3 animate-spin" /> Fetching Insight...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-brand-surface border-t border-brand-border flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Submit inquiry..."
                maxLength={1000}
                className="flex-1 bg-brand-bg border border-brand-border px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-all uppercase tracking-widest placeholder:text-gray-700"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-accent text-black p-3 hover:bg-brand-accent/80 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
