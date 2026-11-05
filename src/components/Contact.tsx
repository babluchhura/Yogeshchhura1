import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TiltCard } from './3D/TiltCard';
import { soundManager } from '../utils/soundEffects';

interface ContactProps {
  initialSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText('yogeshchhura@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    soundManager.playClick();
    navigator.clipboard.writeText('+919668612323');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      soundManager.playSuccess();

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#6366f1', '#38bdf8', '#f59e0b'],
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Contact <span className="text-gradient">Me</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base mb-6">
          Have a project in mind, need a modern responsive website, or want to discuss full-time/contract opportunities? Send a message or connect directly!
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contact Details & WhatsApp / Email Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <TiltCard
            intensity={10}
            glare={true}
            className="rounded-2xl glass-card p-6 sm:p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Let's build something extraordinary.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              I am based in Limpara, Bolangir, Odisha and collaborate with clients worldwide. Reach out directly for fast turnarounds, project consultations, and custom web architecture.
            </p>

            {/* Contact Details List */}
            <div className="space-y-4 mb-8">
              {/* Name */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-purple-900/40 text-purple-400 flex items-center justify-center shrink-0">
                  <span className="font-bold text-sm">YC</span>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Name</div>
                  <div className="text-sm font-semibold text-white">Yogesh Chhura</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-cyan-900/40 text-cyan-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-sm font-semibold text-white">Limpara, Bolangir, Odisha</div>
                </div>
              </div>

              {/* Email with copy button */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-indigo-900/40 text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Email</div>
                    <a
                      href="mailto:yogeshchhura@gmail.com"
                      className="text-sm font-semibold text-white hover:text-purple-300 transition-colors truncate block"
                    >
                      yogeshchhura@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp with copy button */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-emerald-900/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">WhatsApp & Phone</div>
                    <a
                      href="https://wa.me/919668612323"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors truncate block"
                    >
                      +91 9668612323
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct WhatsApp and Email Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="https://wa.me/919668612323?text=Hi%20Yogesh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>

              <a
                href="mailto:yogeshchhura@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/30 hover:scale-102"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </a>
            </div>

            {/* Social Media Section with Animated Icons */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                Connect on Social Networks
              </div>
              <div className="flex items-center gap-3">
                {[
                  {
                    name: 'Instagram',
                    icon: <Instagram className="w-4 h-4" />,
                    href: 'https://instagram.com/yogeshchhura',
                    color: 'hover:text-pink-400 hover:border-pink-500/50',
                  },
                  {
                    name: 'Facebook',
                    icon: <Facebook className="w-4 h-4" />,
                    href: 'https://facebook.com/yogesh.chhura',
                    color: 'hover:text-blue-400 hover:border-blue-500/50',
                  },
                  {
                    name: 'LinkedIn',
                    icon: <Linkedin className="w-4 h-4" />,
                    href: 'https://linkedin.com/in/yogesh-chhura',
                    color: 'hover:text-cyan-400 hover:border-cyan-500/50',
                  },
                  {
                    name: 'GitHub',
                    icon: <Github className="w-4 h-4" />,
                    href: 'https://github.com/yogeshchhura',
                    color: 'hover:text-white hover:border-white/50',
                  },
                  {
                    name: 'Twitter',
                    icon: <Twitter className="w-4 h-4" />,
                    href: 'https://twitter.com/yogeshchhura',
                    color: 'hover:text-sky-400 hover:border-sky-500/50',
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    onClick={() => soundManager.playClick()}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-slate-400 transition-all hover:scale-110 shadow-sm ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative">
            <h3 className="text-2xl font-bold text-white mb-2">
              Send Me a Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below and I will respond to your inquiry within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3 animate-fadeIn">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white font-semibold">Message Dispatched!</strong>
                  Thank you for reaching out. Yogesh will get back to your email at {formData.email || 'your address'} shortly.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Yogesh Chhura"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Website Development Project / Job Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project requirements, timeline, budget, or ideas..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => soundManager.playHover()}
                className="glow-btn w-full py-4 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
