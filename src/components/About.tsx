import React from 'react';
import { MapPin, Calendar, Code2, Sparkles, Laptop, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { TiltCard } from './3D/TiltCard';
import { soundManager } from '../utils/soundEffects';

interface AboutProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact, onOpenResume }) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Professional Background</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: 3D Interactive Portrait Card */}
        <div className="lg:col-span-5 flex justify-center">
          <TiltCard
            intensity={18}
            glare={true}
            className="w-full max-w-md rounded-2xl overflow-hidden glass-card p-4 relative group"
          >
            {/* Glowing border effect */}
            <div className="relative rounded-xl overflow-hidden aspect-square border border-white/10 shadow-2xl">
              <img
                src="https://s15.gifyu.com/images/bWByf.jpg"
                alt="Yogesh Chhura - Web Developer & Designer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Graceful fallback to local asset if external image fails
                  const target = e.currentTarget;
                  if (!target.src.includes('yogesh_developer_avatar')) {
                    target.src = '/src/assets/images/yogesh_developer_avatar_1793854759848.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 via-transparent to-transparent" />

              {/* Floating Bottom Card Over Picture */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Yogesh Chhura</div>
                  <div className="text-xs text-purple-400 font-mono">Web Developer & Designer</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Quick Metadata Row */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-slate-300">Limpara, Bolangir, Odisha</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-white/5">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">1 Yr Java Dev</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right: Detailed Story & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="glass-card rounded-2xl p-6 sm:p-8 w-full border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Passionate Web Developer & Designer from Limpara, Bolangir, Odisha
            </h3>

            {/* User prompt exact core paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              "I am Yogesh Chhura, a passionate Web Developer and Designer from Limpara, Bolangir, Odisha, India. I specialize in creating modern, responsive and user-friendly websites. I have 1 year of experience in Java development and enjoy transforming creative ideas into digital experiences."
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Whether building full-scale client portals, enterprise Java backends, or fluid interactive web applications, I combine solid software engineering fundamentals with forward-thinking UI/UX sensibilities. Every project I touch is designed to be lightning-fast, pixel-perfect, and tailored to business results.
            </p>

            {/* 4 Feature Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Java & Backend Logic</h4>
                </div>
                <p className="text-xs text-slate-400">
                  1 year hands-on experience in OOP, data structures, and building robust backend services.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-900/40 text-cyan-400">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Responsive UI/UX</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Crafting adaptive, mobile-first websites that look breathtaking across every viewport.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-900/40 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">3D & Modern Motion</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Integrating Three.js, Framer Motion, and GSAP animations for immersive user journeys.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-900/40 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">SEO & Performance</h4>
                </div>
                <p className="text-xs text-slate-400">
                  High Google Lighthouse scores, semantic HTML5, fast asset loading, and best practices.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 w-full">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenContact();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md"
              >
                Let's Work Together
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 transition-all"
              >
                Inspect Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
