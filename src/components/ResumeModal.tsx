import React from 'react';
import { X, Download, Printer, MapPin, Mail, Phone, Calendar, Check, ExternalLink, Award } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundManager.playSuccess();
    // Create a plain text or formatted markdown file download
    const resumeText = `
YOGESH CHHURA - Web Developer & Designer
Location: Odisha, India
Email: yogeshchhura@gmail.com
Phone/WhatsApp: +91 9668612323

PROFESSIONAL SUMMARY
Passionate Web Developer and Designer from Odisha, India. Specializes in creating modern, responsive, and visually stunning websites. 1 year of dedicated experience in Java development and strong proficiency in React, JavaScript, HTML5/CSS3, and UI/UX design.

CORE TECHNICAL SKILLS
- Programming Languages: Java (1 Year), JavaScript (ES6+), Python, HTML5, CSS3
- Frontend & UI: React, Tailwind CSS, Bootstrap, Responsive Web Design, Three.js
- CMS & Tools: WordPress, WooCommerce, Git, VS Code, Figma
- Methodologies: Object-Oriented Programming (OOP), Data Structures, REST APIs, SEO

PROFESSIONAL EXPERIENCE
1. Web Developer & Designer | Independent Solutions (2024 - Present)
   - Built 10+ modern responsive client web applications with 95%+ performance scores.
   - Designed engaging user journeys, responsive layouts, and interactive components.

2. Java Software Developer | Systems Development (2023 - 2024, 1 Year)
   - Engineered scalable backend modules using Core Java, OOP, Collections, and JDBC.
   - Implemented database schemas, SQL queries, and API endpoints.

3. Frontend Development Specialist (2023 - Present)
   - Created mobile-first web interfaces with high-fidelity animations and dark mode styling.

FEATURED PROJECTS
- Aethelsea Luxury Resort & Hotel Platform
- Aurora Gourmet Fine Dining & Table Reservation System
- Neo//Tek Futuristic Streetwear E-Commerce
- Chronos 3D Interactive Portfolio Website
- PeakQuest Adventure Travel Expedition Portal
- Unity Reach Humanitarian NGO & Donation Platform

EDUCATION
Bachelor of Science / Computer Applications | Odisha, India
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yogesh_Chhura_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0b0f24] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Curriculum Vitae · Yogesh Chhura</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#090d20] text-slate-200">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                YOGESH CHHURA
              </h1>
              <div className="text-sm font-semibold text-purple-400 font-mono mt-1">
                Web Developer & Designer · Java Specialist
              </div>
            </div>
            <div className="flex flex-col text-xs text-slate-400 space-y-1 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" /> Limpara, Bolangir, Odisha
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> yogeshchhura@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9668612323
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Passionate Web Developer and Designer from Limpara, Bolangir, Odisha, India. Specializes in building modern, responsive, and visually stunning web applications with creative visual identities. Brings 1 full year of software development experience in Java (Core Java, OOP, data structures), alongside deep modern web mastery with React, JavaScript, Tailwind CSS, WordPress, and responsive design.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="block text-white mb-1">Frontend</strong>
                <span className="text-slate-400">HTML5, CSS3, JavaScript (ES6+), React, Bootstrap</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="block text-white mb-1">Backend & Java</strong>
                <span className="text-slate-400">Java (1 Year), OOP, Collections, JDBC, Python</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="block text-white mb-1">Styling & 3D</strong>
                <span className="text-slate-400">Tailwind CSS, Three.js, WebGL, UI/UX Design</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="block text-white mb-1">CMS & Tools</strong>
                <span className="text-slate-400">WordPress, WooCommerce, Git, REST APIs, Figma</span>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-white">Web Developer & Designer</h3>
                  <span className="text-xs font-mono text-purple-400">2024 — Present</span>
                </div>
                <div className="text-xs text-cyan-400 mb-2">Independent & Freelance Projects · Odisha, India</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Designed and built 10+ custom web platforms across hospitality, dining, e-commerce, and non-profits.</li>
                  <li>Ensured 100% responsive cross-device performance and high Google Lighthouse benchmarks.</li>
                  <li>Integrated interactive booking workflows, cart drawers, and contact pipelines.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-white">1 Year Java Software Development</h3>
                  <span className="text-xs font-mono text-purple-400">2023 — 2024</span>
                </div>
                <div className="text-xs text-cyan-400 mb-2">Systems & Application Engineering · Odisha, India</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Developed software components adhering to object-oriented programming (OOP) principles.</li>
                  <li>Designed and debugged core Java data structure implementations and database communication.</li>
                  <li>Collaborated on modular REST API endpoints and data validation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">
              Key Project Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="text-white">Aethelsea Resort:</strong> Luxury hospitality site with date booking engine and suite visualizer.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="text-white">Aurora Gourmet:</strong> Fine dining portal with table reservation system and wine list.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="text-white">Neo//Tek Store:</strong> Modern cyberpunk techwear store with slide-out cart.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <strong className="text-white">Unity Reach NGO:</strong> Humanitarian non-profit platform with impact tracking.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-900/90 flex justify-between items-center">
          <span className="text-xs text-slate-400">
            Available for immediate contract and full-time hiring.
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            Download Text CV
          </button>
        </div>
      </div>
    </div>
  );
};
