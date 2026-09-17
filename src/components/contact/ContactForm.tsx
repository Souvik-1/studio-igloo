import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import contactConfig from '@/config/contact.json';
import { validateContactPayload } from '@/lib/contactUtils';
import { ContactPayload, ContactApiResponse } from '@/types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    service: contactConfig.services[0] || '',
    date: '',
    message: '',
    honeypot: '',
    turnstileToken: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [validationErr, setValidationErr] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationErr) setValidationErr('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client side validation
    const validation = validateContactPayload(formData, contactConfig.limits);
    if (!validation.valid) {
      setValidationErr(validation.error || contactConfig.messages.validationError);
      return;
    }

    setStatus('submitting');
    setResponseMsg('');
    setValidationErr('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ContactApiResponse = await res.json();

      if (data.code === 'DUPLICATE') {
        setStatus('duplicate');
        setResponseMsg(data.message || contactConfig.messages.duplicate);
      } else if (data.success) {
        setStatus('success');
        setResponseMsg(data.message || contactConfig.messages.success);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: contactConfig.services[0] || '',
          date: '',
          message: '',
          honeypot: '',
          turnstileToken: '',
        });
      } else {
        setStatus('error');
        setResponseMsg(data.message || contactConfig.messages.serverError);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setResponseMsg(contactConfig.messages.serverError);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#1C1C1C] text-[#FAF8F5] relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FAF8F5]/60 font-sans block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal">
            Start a Conversation
          </h2>
          <p className="text-sm font-sans text-[#FAF8F5]/70 font-light">
            We accept a limited number of commissions each year to ensure every story receives undivided creative dedication.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FAF8F5] text-[#1C1C1C] p-8 md:p-14 shadow-2xl">
          <AnimatePresence mode="wait">
            {status === 'success' || status === 'duplicate' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-6"
              >
                <div className="inline-flex p-4 rounded-full bg-[#1C1C1C] text-[#FAF8F5]">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">
                  {status === 'duplicate' ? 'Enquiry Recorded' : 'Enquiry Sent'}
                </h3>
                <p className="text-sm font-sans text-[#6B6862] max-w-md mx-auto leading-relaxed">
                  {responseMsg}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 border border-[#1C1C1C] text-xs uppercase tracking-widest text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field (hidden from humans) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Validation Error Alert */}
                {(validationErr || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-sans flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 stroke-[1.5]" />
                    <span>{validationErr || responseMsg}</span>
                  </motion.div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={contactConfig.limits.nameMax}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={contactConfig.limits.emailMax}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. eleanor@example.com"
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={contactConfig.limits.phoneMax}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Photography Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors cursor-pointer"
                    >
                      {contactConfig.services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Preferred Date or Season (Optional)
                    </label>
                    <input
                      type="text"
                      name="date"
                      maxLength={contactConfig.limits.dateMax}
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="e.g. Autumn 2026 or October 14"
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B6862] font-sans font-medium block">
                      Your Message & Story <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      maxLength={contactConfig.limits.messageMax}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your occasion, location, or vision..."
                      className="w-full bg-transparent border-b border-[#EAE6E1] py-3 text-sm font-sans text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE6E1]">
                  <p className="text-[11px] text-[#6B6862] font-sans">
                    Protected by Cloudflare Turnstile bot filter. Privacy respected.
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-4 bg-[#1C1C1C] text-[#FAF8F5] text-xs uppercase tracking-widest hover:bg-[#2B3A42] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    data-cursor="SEND"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <span>Send Enquiry</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
