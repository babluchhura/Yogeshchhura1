import React, { useState } from 'react';
import { Sparkles, Code, Cpu, Palette, Layout, Terminal } from 'lucide-react';
import { Skill } from '../types/portfolio';
import { TiltCard } from './3D/TiltCard';
import { soundManager } from '../utils/soundEffects';

const skillsData: Skill[] = [
  {
    name: 'HTML5',
    percentage: 95,
    category: 'frontend',
    icon: '🌐',
    experienceLevel: 'Expert',
    description: 'Semantic markup, accessibility (a11y), modern web standards, and SEO architecture.',
  },
  {
    name: 'CSS3',
    percentage: 90,
    category: 'styling',
    icon: '🎨',
    experienceLevel: 'Advanced',
    description: 'Keyframe animations, Flexbox, CSS Grid, custom properties, and responsive design.',
  },
  {
    name: 'JavaScript',
    percentage: 88,
    category: 'frontend',
    icon: '⚡',
    experienceLevel: 'Advanced',
    description: 'ES6+, asynchronous programming, DOM manipulation, APIs, and modern toolchains.',
  },
  {
    name: 'Java',
    percentage: 85,
    category: 'backend',
    icon: '☕',
    experienceLevel: '1 Year Experience',
    description: 'Object-Oriented Programming, Data Structures, Collections, Spring basics, and backend logic.',
  },
  {
    name: 'WordPress',
    percentage: 82,
    category: 'cms',
    icon: '📑',
    experienceLevel: 'Proficient',
    description: 'Custom themes, WooCommerce, CMS architecture, plugin integration, and site speed.',
  },
  {
    name: 'Responsive Web Design',
    percentage: 95,
    category: 'frontend',
    icon: '📱',
    experienceLevel: 'Mastery',
    description: 'Mobile-first layout design, fluid typography, touch targets, and cross-browser parity.',
  },
  {
    name: 'UI/UX Design',
    percentage: 86,
    category: 'styling',
    icon: '✨',
    experienceLevel: 'Advanced',
    description: 'Wireframing, modern design systems, typography hierarchy, micro-interactions, and Figma.',
  },
  {
    name: 'Tailwind CSS',
    percentage: 92,
    category: 'styling',
    icon: '🌊',
    experienceLevel: 'Expert',
    description: 'Rapid UI engineering, dark mode, custom design tokens, and utility architecture.',
  },
  {
    name: 'Bootstrap',
    percentage: 88,
    category: 'styling',
    icon: '🅱️',
    experienceLevel: 'Advanced',
    description: 'Component architecture, grid systems, rapid prototyping, and legacy migration.',
  },
  {
    name: 'Python',
    percentage: 75,
    category: 'backend',
    icon: '🐍',
    experienceLevel: 'Intermediate',
    description: 'Data scripting, automation, algorithms, and backend prototyping.',
  },
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'styling' | 'cms'>('all');

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          My <span className="text-gradient">Skills</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base mb-6">
          A balanced blend of modern frontend architecture, 1-year dedicated Java backend development, and pixel-perfect design systems.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      {/* Interactive Category Filter Tabs (anti-slop: functional segmented buttons) */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Skills' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Java & Backend' },
            { id: 'styling', label: 'UI/UX & Styling' },
            { id: 'cms', label: 'CMS & Web' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(tab.id as typeof activeCategory);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Animated Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <TiltCard
            key={skill.name}
            intensity={12}
            glare={true}
            className="rounded-2xl glass-card p-6 border border-white/10 hover:border-purple-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Header with icon and level */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>
                    <div className="text-xs text-purple-400 font-mono">
                      {skill.experienceLevel}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-cyan-400 tabular-nums">
                    {skill.percentage}%
                  </span>
                </div>
              </div>

              {/* Skill description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {skill.description}
              </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 mb-1.5">
                <span>Proficiency Level</span>
                <span className="text-slate-300">{skill.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-1000 ease-out shadow-sm shadow-purple-500/50"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-12 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-bold text-white mb-1">
            Always Learning & Expanding the Stack
          </h4>
          <p className="text-xs text-slate-400">
            Currently diving deeper into Next.js 15, Three.js shaders, and enterprise Java Spring Boot architectures.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-3 py-1.5 rounded-lg border border-purple-500/20">
            10+ Technologies
          </span>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/20">
            Clean Architecture
          </span>
        </div>
      </div>
    </section>
  );
};
