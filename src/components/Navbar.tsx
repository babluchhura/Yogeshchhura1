import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText, Send } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030014]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-purple-500/25">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center font-bold text-white text-base">
                YC
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Yogesh Chhura
              </span>
              <span className="text-[10px] text-purple-400 tracking-wider font-mono uppercase">
                Web Dev & Designer
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-purple-400 transition-colors relative py-1 text-slate-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + audio control */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Audio toggle button */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Resume button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 rounded-xl transition-all hover:border-purple-500/60 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Resume</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenContact();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="relative group overflow-hidden px-5 py-2 text-xs font-bold text-white rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-102"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 transition-all group-hover:opacity-90" />
              <span className="relative flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg text-slate-400 bg-slate-900 border border-white/10"
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-white/10 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b1a]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 shadow-2xl transition-all animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 rounded-xl border border-white/10"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>View Full Resume</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
