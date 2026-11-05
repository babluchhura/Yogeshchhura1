import React from 'react';
import {
  Code,
  Palette,
  Globe,
  Smartphone,
  Sparkles,
  Rocket,
  Building2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Service } from '../types/portfolio';
import { TiltCard } from './3D/TiltCard';
import { soundManager } from '../utils/soundEffects';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const servicesData: Service[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    tagline: 'Robust, fast, and scalable full-stack web applications',
    description:
      'Custom web development using modern JavaScript/TypeScript, React, and Java backend solutions built for performance and reliability.',
    icon: 'code',
    features: ['Custom Frontend & Backend Architecture', 'API Integration & Database Modeling', 'High Performance & Speed Optimization'],
  },
  {
    id: 'web-design',
    title: 'Website Designing',
    tagline: 'Aesthetic, brand-aligned visual design that converts',
    description:
      'End-to-end creative website design crafted around your identity, typography, visual rhythm, and customer conversion paths.',
    icon: 'palette',
    features: ['Modern Color Palettes & Typography', 'Interactive Prototypes & Wireframing', 'Conversion-Focused Visual Layouts'],
  },
  {
    id: 'wordpress-dev',
    title: 'WordPress Development',
    tagline: 'Custom themes, plugins, and scalable CMS architectures',
    description:
      'Empowering businesses with manageable WordPress setups, custom Elementor/ACF configurations, WooCommerce, and bulletproof security.',
    icon: 'globe',
    features: ['Custom Theme Architecture', 'WooCommerce E-Commerce Setup', 'Easy Client Dashboard & Page Builder'],
  },
  {
    id: 'responsive-web',
    title: 'Responsive Website',
    tagline: 'Flawless viewing experience across phone, tablet, & desktop',
    description:
      'Pixel-perfect responsiveness ensuring zero layout breaking, crisp typography, and touch-optimized navigation on all screens.',
    icon: 'smartphone',
    features: ['Mobile-First CSS & Media Queries', 'Cross-Browser Parity (Chrome, Safari, Firefox)', 'Touch & Gesture Optimization'],
  },
  {
    id: 'portfolio-web',
    title: 'Portfolio Website',
    tagline: 'Distinguished 3D animated portfolios for professionals',
    description:
      'Award-winning personal websites, developer portfolios, and creative showcases with Three.js graphics, dark mode, and dynamic cards.',
    icon: 'sparkles',
    features: ['3D WebGL & Particle Animations', 'Interactive Project Case Studies', 'Contact & Lead Capture Wiring'],
  },
  {
    id: 'landing-page',
    title: 'Landing Page Design',
    tagline: 'High-conversion marketing and product launch pages',
    description:
      'Strategic landing pages engineered to captivate visitors in under 3 seconds, explain value clearly, and drive action.',
    icon: 'rocket',
    features: ['Clear Value Proposition Hero', 'Social Proof & Metric Integrations', 'Frictionless Call-To-Actions'],
  },
  {
    id: 'business-web',
    title: 'Business Website Development',
    tagline: 'Professional corporate sites that build authority',
    description:
      'Tailored business web presence for companies, agencies, hotels, clinics, and service providers with appointment booking and lead flows.',
    icon: 'building',
    features: ['Service Catalogs & Booking Forms', 'Local SEO & Google Maps Presence', 'Secure Contact & Inquiry Gateways'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    tagline: 'Human-centered interfaces and seamless user journeys',
    description:
      'Comprehensive design thinking process from user personas and information architecture to interactive clickable prototypes.',
    icon: 'layers',
    features: ['Design Systems & Reusable Components', 'Micro-Interactions & Hover Polish', 'Accessibility (WCAG AA Compliance)'],
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-6 h-6 text-purple-400" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-cyan-400" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-pink-400" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'rocket':
        return <Rocket className="w-6 h-6 text-amber-400" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'layers':
      default:
        return <Layers className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Tailored Offerings</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          My <span className="text-gradient">Services</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base mb-6">
          High-impact digital services designed to turn your ideas into functional, beautiful, and business-generating online products.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      {/* 3D Animated 8 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <TiltCard
            key={service.id}
            intensity={14}
            glare={true}
            className="rounded-2xl glass-card p-6 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Service index and icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {getIcon(service.icon)}
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {String(index + 1).padStart(2, '0')}.
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-purple-400 font-mono mb-3">
                {service.tagline}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquire Action Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onSelectService(service.title);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 border border-white/10 hover:border-purple-500/50 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn shadow-sm"
            >
              <span>Inquire This Service</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
