import React from 'react';
import { Download, Send, ArrowDown, Sparkles, Code, Cpu, Globe, Award } from 'lucide-react';
import { LaptopModel } from './3D/LaptopModel';
import { soundManager } from '../utils/soundEffects';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {

  const scrollToAbout = () => {
    soundManager.playClick();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Introduction & Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Status Kicker (anti-slop: clean unboxed text) */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-xs font-mono text-purple-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Available for Freelance & Full-Time Roles · Limpara, Bolangir, Odisha</span>
          </div>

          {/* Salutation & Name */}
          <h2 className="text-xl sm:text-2xl font-medium text-slate-300 tracking-wide mb-2">
            Hello, I'm
          </h2>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-6">
            <span className="text-gradient">Yogesh</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Chhura
            </span>
          </h1>

          {/* Exact User Prompt Quote */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-normal">
            "I create modern, responsive and visually stunning websites with creative designs and powerful functionality."
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenContact();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="glow-btn px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Hire Me</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-purple-500/30 hover:border-purple-400 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Quick Quantitative Highlights Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                1+ <span className="text-purple-400 text-lg">Year</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">Java & Web Dev</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                10+
              </div>
              <div className="text-xs text-slate-400 mt-1">Projects Built</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-400 mt-1">Client Quality</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Laptop Model */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full relative">
            <LaptopModel />

            {/* Orbiting Tech Floating Badges */}
            <div className="hidden sm:flex items-center gap-2 absolute -top-4 -right-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-purple-500/30 backdrop-blur shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-200">Java & React</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 absolute bottom-12 -left-4 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-cyan-500/30 backdrop-blur shadow-lg animate-bounce" style={{ animationDuration: '5s' }}>
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">Responsive 3D Web</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-8">
        <button
          onClick={scrollToAbout}
          onMouseEnter={() => soundManager.playHover()}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors focus:outline-none group"
          aria-label="Scroll Down to About Section"
        >
          <span className="text-xs font-mono tracking-wider uppercase text-slate-400 group-hover:text-purple-300">
            Explore Portfolio
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 group-hover:border-purple-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-purple-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
