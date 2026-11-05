import React, { useState } from 'react';
import { Sparkles, ExternalLink, Eye, ArrowUpRight, Code, Check } from 'lucide-react';
import { Project } from '../types/portfolio';
import { TiltCard } from './3D/TiltCard';
import { ProjectDemoModal } from './ProjectDemoModal';
import { soundManager } from '../utils/soundEffects';

const projectsData: Project[] = [
  {
    id: 'hotel',
    title: 'Aethelsea Luxury Resort & Hotel',
    category: 'Hospitality',
    description:
      'Ultra-modern boutique resort website featuring real-time room booking dates, ocean-view suite showcase, and seamless UX.',
    longDescription:
      'Aethelsea is a boutique hospitality platform created for luxury travelers. It includes an interactive booking dates calendar, high-resolution villa gallery, currency selector, and responsive mobile booking workflow.',
    image: '/src/assets/images/project_hotel_resort_1793854731630.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Booking Engine', 'Responsive'],
    features: [
      'Interactive Date Picker & Guest Selector',
      'Dynamic Room Availability Checker',
      'Smooth Glassmorphic Nav & Modal Views',
      'High-Speed Image Loading Optimization',
    ],
    highlightMetric: '99/100 Lighthouse Performance',
  },
  {
    id: 'restaurant',
    title: 'Aurora Gourmet Artisan Restaurant',
    category: 'Dining',
    description:
      'High-end dining platform with digital seasonal menu, online table reservations, sommelier wine list, and culinary photography.',
    longDescription:
      'Aurora Gourmet captures the essence of fine dining. Built with rich dark marble aesthetic, interactive table reservation system, seasonal chef tasting menu, and real-time seating availability.',
    image: '/src/assets/images/project_gourmet_dining_1793854734972.jpg',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Table Reservation', 'UI/UX'],
    features: [
      'Digital Interactive Menu with Allergen Filters',
      'Instant Table Booking Widget with Guest Count',
      'Curated Wine List Showcase',
      'Mobile-Friendly One-Tap Calling & Maps',
    ],
    highlightMetric: '+45% Table Bookings Conversion',
  },
  {
    id: 'ecommerce',
    title: 'Neo//Tek Cyberwear & Gear E-Commerce',
    category: 'E-commerce',
    description:
      'Futuristic streetwear and techwear e-commerce store with dynamic product filters, instant cart drawer, and sleek checkout UI.',
    longDescription:
      'Neo//Tek delivers an adrenaline-fueled shopping experience. Features categorized product grids, live stock status indicators, interactive cart sidebar, and promo discount validator.',
    image: '/src/assets/images/project_ecommerce_shop_1793854735782.jpg',
    tags: ['React', 'Tailwind CSS', 'State Management', 'E-Commerce', 'Java Backend'],
    features: [
      'Instant Slide-Out Shopping Cart Drawer',
      'Multi-Variant Product Size/Color Picker',
      'Search and Category Tag Filtering',
      'Secure Simulated Checkout Pipeline',
    ],
    highlightMetric: 'Sub-second page transitions',
  },
  {
    id: 'portfolio',
    title: 'Chronos Creative 3D Developer Portfolio',
    category: 'Portfolio',
    description:
      'Award-winning personal developer showcase with Three.js WebGL spatial animations, holographic particle field, and interactive projects.',
    longDescription:
      'A masterpiece in creative developer web experiences. Utilizes custom WebGL shaders, interactive 3D procedural geometries, smooth dampening camera kinematics, and dark theme glassmorphism.',
    image: '/src/assets/images/project_portfolio_creative_1793854758569.jpg',
    tags: ['Three.js', 'React', 'Framer Motion', '3D Spatial', 'Audio FX'],
    features: [
      'Interactive 3D Workstation & Particle Field',
      'Hardware-Accelerated 60 FPS WebGL',
      'Procedural Web Audio Sound Effects',
      'Zero-Pill Typographic Hierarchy',
    ],
    highlightMetric: 'FWA & Awwwards Style Aesthetics',
  },
  {
    id: 'travel',
    title: 'PeakQuest Himalayan Adventure Expeditions',
    category: 'Travel',
    description:
      'High-altitude trek and tour booking portal featuring day-by-day interactive itinerary timeline, flight search, and packing guides.',
    longDescription:
      'PeakQuest simplifies expedition planning with interactive elevation maps, weather forecasts, multi-day itinerary timeline, and group booking management.',
    image: '/src/assets/images/project_travel_booking_1793854735600.jpg',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Itinerary Engine', 'Responsive'],
    features: [
      'Day-by-Day Interactive Route Milestones',
      'Altitude Profile & Acclimatization Graph',
      'Flight and Accommodation Search Strip',
      'Offline-Friendly Printable Itinerary',
    ],
    highlightMetric: 'Trusted by 1,200+ Trekkers',
  },
  {
    id: 'ngo',
    title: 'Unity Reach Global Humanitarian NGO',
    category: 'NGO',
    description:
      'Community outreach and non-profit platform with real-time impact metrics, urgent cause appeals, and transparent donation system.',
    longDescription:
      'Unity Reach connects donors with verified grassroots humanitarian projects worldwide. Features impact progress bars, inspiring storytelling, recurring donation flow, and volunteer sign-up.',
    image: '/src/assets/images/project_ngo_charity_1793854735911.jpg',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Donation System', 'Accessible UI'],
    features: [
      'Real-Time Funding Progress Meters',
      'One-Click Quick Impact Donation Widget',
      'Beneficiary Video Stories & Case Studies',
      'Full WCAG AA Accessibility Compliance',
    ],
    highlightMetric: '$35M+ Funds Transparently Tracked',
  },
];

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hospitality') return p.id === 'hotel' || p.id === 'restaurant';
    if (activeFilter === 'ecommerce') return p.id === 'ecommerce';
    if (activeFilter === 'creative') return p.id === 'portfolio';
    if (activeFilter === 'social') return p.id === 'ngo' || p.id === 'travel';
    return true;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Code className="w-3.5 h-3.5 text-purple-400" />
          <span>Curated Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          My <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base mb-6">
          Selected works showcasing modern web development, intuitive user interfaces, and responsive engineering.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Projects (6)' },
            { id: 'hospitality', label: 'Hotel & Restaurant' },
            { id: 'ecommerce', label: 'E-Commerce' },
            { id: 'creative', label: '3D Portfolio' },
            { id: 'social', label: 'Travel & NGO' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveFilter(tab.id);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Projects Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            intensity={12}
            glare={true}
            className="rounded-2xl glass-card overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Preview Image Container with Hover Zoom */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d20] via-transparent to-transparent opacity-80" />

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur border border-white/10 text-[11px] font-mono text-purple-300">
                  {project.category}
                </div>

                {/* Top Right: Highlight Metric */}
                {project.highlightMetric && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-purple-950/80 backdrop-blur border border-purple-500/30 text-[11px] font-mono text-cyan-300">
                    {project.highlightMetric}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technology Tags (clean unboxed text or subtle tags) */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Demo Action Bar */}
            <div className="px-6 pb-6 pt-0">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedProject(project);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-xs font-bold text-white shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
              >
                <Eye className="w-4 h-4" />
                <span>Live Demo & Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* In-App Live Demo Interactive Modal */}
      <ProjectDemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
