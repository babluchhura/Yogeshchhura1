/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');

  const handleOpenContact = (subject = '') => {
    setContactSubject(subject);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    handleOpenContact(`Service Inquiry: ${serviceTitle}`);
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden selection:bg-purple-600/30 selection:text-purple-200">
      {/* 3D Three.js Interactive Cosmic Particles & Geometries Background */}
      <CanvasBackground />

      {/* Interactive Glowing Cursor */}
      <CustomCursor />

      {/* Top Navigation Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => handleOpenContact('General Project Inquiry')}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col space-y-8 sm:space-y-16">
        {/* 1. Hero Section with 3D Laptop Model & Typewriter */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => handleOpenContact('Hire Me — New Project')}
        />

        {/* 2. About Me Section */}
        <About
          onOpenContact={() => handleOpenContact('Collaboration Inquiry')}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Projects Section with Live Interactive Demos */}
        <Projects />

        {/* 6. Experience Timeline */}
        <Experience />

        {/* 7. Contact Section */}
        <Contact initialSubject={contactSubject} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
