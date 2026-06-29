import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { conversationTree } from '../../utils/conversationFlow';
import { Message } from './Message';
import { PropertyCard } from './PropertyCard';
import { X, MessageSquare, Mic, Navigation, MapPin } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([{ type: 'bot', ...conversationTree.start }]);
  const [isTyping, setIsTyping] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const messagesEndRef = useRef(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  const handleOptionClick = (option) => {
    // Add user message
    setHistory(prev => [...prev, { type: 'user', message: option.text }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const nextNode = conversationTree[option.next] || conversationTree.fallback;
      setHistory(prev => [...prev, { type: 'bot', ...nextNode }]);
      speak(nextNode.message);
    }, 1000);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoice = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      processVoiceCommand(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const processVoiceCommand = (text) => {
    const t = text.toLowerCase();
    let nextNode = conversationTree.fallback;
    
    if (t.includes('buy') || t.includes('property')) {
      nextNode = conversationTree.buy_property;
    } else if (t.includes('villa')) {
      nextNode = conversationTree.villas;
    } else if (t.includes('budget') || t.includes('lakhs') || t.includes('crore')) {
      nextNode = conversationTree.show_villas;
    }

    setHistory(prev => [...prev, { type: 'user', message: text }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setHistory(prev => [...prev, { type: 'bot', ...nextNode }]);
      speak(nextNode.message);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="glass w-[380px] h-[600px] rounded-2xl flex flex-col overflow-hidden mb-4 shadow-2xl bg-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-dark to-[#1e293b] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center font-bold">
                  RI
                </div>
                <div>
                  <h3 className="font-semibold">Rishee Assistant</h3>
                  <p className="text-xs text-brand-gold">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Message msg={msg} />
                  
                  {msg.type === 'property_list' && msg.properties && (
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                      {msg.properties.map(prop => (
                        <PropertyCard key={prop.id} property={prop} userLocation={userLocation} setUserLocation={setUserLocation} />
                      ))}
                    </div>
                  )}

                  {msg.type === 'bot' && msg.options && index === history.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((opt, i) => (
                         <motion.button
                           key={i}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => handleOptionClick(opt)}
                           className="bg-brand-dark text-white text-sm px-4 py-2 rounded-full hover:bg-brand-gold transition shadow-md"
                         >
                           {opt.text}
                         </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <button 
                onClick={handleVoice}
                className={`p-3 rounded-full transition ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-brand-dark hover:bg-brand-gold'}`}
              >
                <Mic size={20} />
              </button>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                {listening ? transcript || "Listening..." : "Select an option or tap mic..."}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-brand-dark to-brand-gold text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          <MessageSquare size={28} />
        </motion.button>
      )}
    </div>
  );
};
