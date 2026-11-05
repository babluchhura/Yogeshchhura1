import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02000d] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#080c1d] rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
              YC
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Yogesh Chhura
          </span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-400 mb-8">
          {['Home', 'About', 'Skills', 'Services', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => soundManager.playClick()}
              className="hover:text-purple-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/yogeshchhura', label: 'Instagram' },
            { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/yogesh.chhura', label: 'Facebook' },
            { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/in/yogesh-chhura', label: 'LinkedIn' },
            { icon: <Github className="w-4 h-4" />, href: 'https://github.com/yogeshchhura', label: 'GitHub' },
            { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com/yogeshchhura', label: 'Twitter' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:scale-110 transition-all"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundManager.playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:border-purple-500/50 transition-all mb-10 group"
        >
          <ArrowUp className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-y-0.5 transition-transform" />
          <span>Back to Top</span>
        </button>

        {/* Exact User Prompt Copyright and Credit Strings */}
        <div className="text-center space-y-1.5 border-t border-white/5 pt-8 w-full max-w-lg">
          <p className="text-xs text-slate-400 font-mono">
            © 2026 Yogesh Chhura. All Rights Reserved.
          </p>
          <p className="text-xs text-purple-400 font-mono">
            Designed & Developed by Yogesh Chhura.
          </p>
        </div>
      </div>
    </footer>
  );
};
