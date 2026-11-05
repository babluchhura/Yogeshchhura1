import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Award, Sparkles, Terminal } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { TiltCard } from './3D/TiltCard';

const experienceData: ExperienceItem[] = [
  {
    id: 'web-designer-dev',
    role: 'Web Developer & Designer',
    company: 'Independent & Client Solutions',
    period: '2024 — Present',
    location: 'Odisha, India · Remote',
    description:
      'Designing and engineering custom responsive websites, client branding portals, and interactive business solutions tailored to local and international clients.',
    achievements: [
      'Delivered 10+ custom client websites across hospitality, dining, e-commerce, and non-profit sectors.',
      'Designed end-to-end user interfaces in Figma and ported directly to production-grade responsive code.',
      'Achieved 95%+ Google PageSpeed and Lighthouse scores across all client deployments.',
    ],
    technologies: ['React', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'WordPress', 'UI/UX'],
  },
  {
    id: 'java-dev',
    role: '1 Year Java Development Experience',
    company: 'Software Engineering & Systems Development',
    period: '2023 — 2024 (1 Full Year)',
    location: 'Odisha, India',
    description:
      'Dedicated one full year to core Java programming, object-oriented system design, algorithmic problem solving, and backend API integration.',
    achievements: [
      'Engineered backend modules utilizing Core Java, OOP principles, collections framework, and multithreading.',
      'Designed relational database models, executed SQL queries, and integrated backend logic with frontend UI.',
      'Developed clean modular code following SOLID principles and design patterns.',
    ],
    technologies: ['Java', 'OOP', 'Data Structures', 'JDBC', 'MySQL', 'REST APIs', 'Spring Basics'],
  },
  {
    id: 'personal-projects',
    role: 'Personal Website & Web App Projects',
    company: 'Open Source & Creative Laboratory',
    period: '2024 — 2026',
    location: 'Odisha, India',
    description:
      'Architected full-featured real-world web applications including e-commerce storefronts, travel booking systems, luxury hotel interfaces, and 3D portfolios.',
    achievements: [
      'Built production-ready prototypes with interactive state machines, mock checkout flows, and dynamic reservation systems.',
      'Engineered 3D spatial user experiences with Three.js WebGL rendering, custom particles, and physics-based tilt mechanics.',
      'Authored clean, reusable TypeScript components and documentation.',
    ],
    technologies: ['Three.js', 'TypeScript', 'React', 'Tailwind CSS', 'Web Audio API', 'Git'],
  },
  {
    id: 'frontend-dev',
    role: 'Frontend Development & Interface Craftsman',
    company: 'Digital Experiences',
    period: '2023 — Present',
    location: 'Odisha, India',
    description:
      'Specialized in creating high-performance, accessible, and visually stunning web interfaces with fluid animations and responsive layouts.',
    achievements: [
      'Mastered responsive layouts guaranteeing 100% parity across mobile devices, tablets, and 4K desktops.',
      'Integrated CSS Grid, Tailwind CSS tokens, and glassmorphism styling into modern web standards.',
      'Implemented performance optimizations including lazy loading, asset compression, and zero-layout-shift rendering.',
    ],
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'Responsive Design'],
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span>Milestones & Growth</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Professional <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base mb-6">
          A track record of engineering clean web solutions, dedicated Java software development, and continuous self-driven innovation.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-purple-900/50 ml-4 sm:ml-32 md:ml-48 space-y-12">
        {experienceData.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 sm:pl-10 group">
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:border-cyan-400 flex items-center justify-center transition-colors shadow-lg shadow-purple-500/30">
              <div className="w-3 h-3 rounded-full bg-purple-400 group-hover:bg-cyan-300 transition-colors" />
            </div>

            {/* Period Badge on the Left (for medium+ screens) */}
            <div className="hidden sm:block absolute -left-44 top-1.5 w-36 text-right">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-500/20">
                {exp.period}
              </span>
            </div>

            {/* Experience Card */}
            <TiltCard
              intensity={8}
              glare={true}
              className="rounded-2xl glass-card p-6 sm:p-8 border border-white/10 hover:border-purple-500/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {exp.role}
                </h3>
                {/* Mobile period display */}
                <span className="sm:hidden text-xs font-mono text-purple-400 w-fit bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                  {exp.period}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                <span className="font-semibold text-cyan-300">{exp.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {exp.location}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Key Achievements Bullet points */}
              <div className="space-y-2 mb-6">
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Technologies strip */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-slate-500 mr-2">Technologies:</span>
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-purple-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};
