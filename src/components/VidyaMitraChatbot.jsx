import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MessageSquare, 
  ChevronDown, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    triggers: ['income', 'limit', 'ceiling', 'salary', 'annual'],
    answer: 'Under MoTA guidelines:\n• For NFST (National Fellowship for ST): Family annual income limit is ₹6.00 Lakhs per annum.\n• For NOS (National Overseas Scholarship): Limit is ₹8.00 Lakhs per annum.\n• For Top Class Education: Limit is ₹6.00 Lakhs per annum.\nIncome certificates must be issued by a competent revenue authority (Tehsildar/SDM) for the current financial year.'
  },
  {
    triggers: ['pvtg', 'vulnerable', 'group', 'priority'],
    answer: 'Particularly Vulnerable Tribal Groups (PVTGs) such as Birhor, Baiga, Chenchu, Katkari, Sahariya, and Toda receive special priority across all MoTA schemes:\n1. Dedicated quota of 50 seats in NFST and 3 seats in NOS.\n2. +10% bonus in the AI composite merit ranking.\n3. Relaxation in academic percentile cutoffs.'
  },
  {
    triggers: ['nos', 'overseas', 'foreign', 'abroad', 'oxford', 'rank'],
    answer: 'The National Overseas Scholarship (NOS) provides:\n• 100% tuition fee reimbursement directly to the overseas institution.\n• Annual maintenance allowance: GBP 9,900 (UK/Europe) or USD 15,400 (USA/Rest of world).\n• Valid only for universities ranked within QS World Top 500 (with top priority to Top 200).\n• Return airfare & visa assistance included.'
  },
  {
    triggers: ['deficiency', 'reject', 'blur', 'expired', 'error', 'smudged'],
    answer: 'Common document deficiencies identified by VidyaSetu AI:\n1. Expired Income Certificate (must be valid for current FY 2026-27).\n2. Blurred official stamp or missing digital barcode.\n3. Name mismatch between Aadhaar and Degree certificates.\nYou have a 15-day window to upload the corrected document via the Deficiency Desk without losing your seniority!'
  },
  {
    triggers: ['stipend', 'dbt', 'pfms', 'payment', 'money', 'credit'],
    answer: 'Stipend details for NFST:\n• JRF (Junior Research Fellow): ₹37,000/month + HRA as per city classification (8%/16%/24% or 27%).\n• SRF (Senior Research Fellow after 2 years): ₹42,000/month + HRA.\n• Contingency Grant: ₹20,500/year for Humanities & Sciences.\nPayments are disbursed monthly through Direct Benefit Transfer (DBT) directly into your Aadhaar-seeded bank account via PFMS.'
  }
];

export function VidyaMitraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Johar! Namaskar! I am VidyaMitra, your AI assistant for Ministry of Tribal Affairs (MoTA) scholarships and fellowships. How may I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate AI response
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let matched = KNOWLEDGE_BASE.find(item => 
        item.triggers.some(trigger => lower.includes(trigger))
      );

      let responseText = matched 
        ? matched.answer 
        : `Thank you for your query regarding "${textToSend}". As per MoTA regulations, you can track applications or submit queries through the official Grievance Redressal Mechanism. For immediate support, consult the Scheme Guidelines or your designated Verification Officer.`;

      setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
    }, 600);
  };

  const quickChips = [
    'What is the income ceiling for NFST & NOS?',
    'How are PVTG students prioritized?',
    'What are the QS ranking criteria for NOS?',
    'How do I resolve a document deficiency?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2.5 px-4 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all border-2 border-amber-400"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="font-bold text-xs tracking-wide">Ask VidyaMitra AI</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-80 sm:w-96 flex flex-col h-[520px] overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-blue-800 text-amber-300 border border-blue-700">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-sm text-white">VidyaMitra AI Copilot</h3>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold border border-amber-400/40">
                    MoTA 2.0
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">Multi-lingual Tribal Welfare Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => speakText(messages[messages.length - 1]?.text || '')}
                className={`p-1.5 rounded-lg hover:bg-blue-800 transition ${isSpeaking ? 'text-amber-300' : 'text-blue-300'}`}
                title={isSpeaking ? 'Mute Speech' : 'Listen via Voice Speech'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-blue-800 text-blue-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Chips */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 overflow-x-auto flex space-x-1.5 no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="text-[11px] bg-white border border-slate-200 hover:border-blue-300 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-blue-50 transition shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs whitespace-pre-line leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-blue-900 text-white rounded-br-xs font-medium' 
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 font-sans'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about NFST, NOS, PVTG, or DBT..."
              className="flex-1 px-3 py-2 text-xs bg-slate-100 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
