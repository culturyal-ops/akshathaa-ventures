'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const phoneNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1A1614] text-white p-5 shadow-2xl w-64"
          >
            <p className="text-sm font-medium mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Chat with us
            </p>
            <p className="text-xs text-white/60 mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Typically replies within minutes
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full justify-center text-xs"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={14} strokeWidth={1.5} />
              <span>Open WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pulse-gold bg-[#C9A96E] hover:bg-[#8B7355] text-white p-4 shadow-2xl transition-colors duration-300"
        aria-label="Contact on WhatsApp"
        style={{ boxShadow: '0 8px 32px rgba(201, 169, 110, 0.35)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
