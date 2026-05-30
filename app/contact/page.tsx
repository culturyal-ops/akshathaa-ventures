'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isValidIndianPhone, normalizePhoneNumber } from '@/lib/utils';
import AnimateIn from '@/components/AnimateIn';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!isValidIndianPhone(formData.phone)) {
      setErrors({ phone: 'Please enter a valid Indian mobile number (10 digits starting with 6–9)' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('enquiries').insert([{
      name: formData.name,
      phone: normalizePhoneNumber(formData.phone),
      email: formData.email || null,
      message: formData.message || null,
    }]);
    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── Header ── */}
      <section className="relative pt-40 pb-20 bg-[#1A1614] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <AnimateIn direction="up">
            <span className="gold-line" />
            <span className="section-label block mb-4">We'd Love to Hear From You</span>
            <h1
              className="text-5xl lg:text-7xl text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get in Touch
            </h1>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">

          {/* ── Form ── */}
          <AnimateIn direction="right" className="lg:col-span-3">
            <span className="gold-line" />
            <h2
              className="text-3xl lg:text-4xl text-[#1A1614] mb-10"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Send Us a Message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#C9A96E]/15 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-2xl text-[#1A1614] mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Message Sent!
                </h3>
                <p className="text-[#6B6560] mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold"
                >
                  <span>Send Another</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block section-label mb-2.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-[#F0EBE3] border border-[#C9A96E]/20 focus:outline-none focus:border-[#C9A96E] text-sm transition-colors"
                      placeholder="Your full name"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block section-label mb-2.5">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({}); }}
                      className={`w-full px-5 py-4 bg-[#F0EBE3] border ${errors.phone ? 'border-red-400' : 'border-[#C9A96E]/20'} focus:outline-none focus:border-[#C9A96E] text-sm transition-colors`}
                      placeholder="Your 10-digit mobile number"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block section-label mb-2.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-[#F0EBE3] border border-[#C9A96E]/20 focus:outline-none focus:border-[#C9A96E] text-sm transition-colors"
                    placeholder="your@email.com (optional)"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block section-label mb-2.5">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-5 py-4 bg-[#F0EBE3] border border-[#C9A96E]/20 focus:outline-none focus:border-[#C9A96E] text-sm transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center disabled:opacity-60"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimateIn>

          {/* ── Info ── */}
          <AnimateIn direction="left" delay={0.15} className="lg:col-span-2">
            <span className="gold-line" />
            <h2
              className="text-3xl lg:text-4xl text-[#1A1614] mb-10"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Contact Information
            </h2>

            <div className="space-y-8 mb-12">
              {[
                {
                  icon: <Phone size={20} strokeWidth={1.5} />,
                  label: 'Phone',
                  primary: '+91 98765 43210',
                  secondary: 'Mon–Sat, 9 AM – 7 PM',
                  href: 'tel:+919876543210',
                },
                {
                  icon: <Mail size={20} strokeWidth={1.5} />,
                  label: 'Email',
                  primary: 'info@akshathaaventures.com',
                  secondary: 'We respond within 24 hours',
                  href: 'mailto:info@akshathaaventures.com',
                },
                {
                  icon: <MapPin size={20} strokeWidth={1.5} />,
                  label: 'Office',
                  primary: 'Bangalore, Karnataka',
                  secondary: 'India',
                  href: undefined,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-10 h-10 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A96E] transition-colors duration-300">
                    <span className="text-[#C9A96E] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="section-label mb-1">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base text-[#1A1614] hover:text-[#C9A96E] transition-colors font-medium block mb-0.5"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {item.primary}
                      </a>
                    ) : (
                      <p className="text-base text-[#1A1614] font-medium mb-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {item.primary}
                      </p>
                    )}
                    <p className="text-sm text-[#6B6560]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{item.secondary}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#1A1614] p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={22} className="text-[#C9A96E]" strokeWidth={1.5} />
                <h3
                  className="text-xl text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Prefer WhatsApp?
                </h3>
              </div>
              <p className="text-white/60 mb-6 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Get instant responses for quick queries and property information.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full justify-center"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
