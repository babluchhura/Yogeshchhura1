import React, { useState } from 'react';
import { X, ExternalLink, Check, ShoppingBag, Calendar, Users, Heart, ArrowRight, Star } from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundManager } from '../utils/soundEffects';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Interactive state for mini simulations
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [donationAmount, setDonationAmount] = useState(50);
  const [donationSuccess, setDonationSuccess] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#090d20] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Live Preview: {project.title}
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Hero Preview Image */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video shadow-xl bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur border border-white/20 text-xs font-mono text-cyan-300">
              Interactive Prototype
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {project.longDescription}
              </p>

              <h5 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                Core Architecture & Features
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-2">Tech Stack Used</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-[11px] font-mono text-purple-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Interactive Demo Sandbox Component */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/20">
                <h6 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Live Sandbox Interaction</span>
                </h6>

                {/* Customized live widget based on project id */}
                {project.id === 'hotel' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Test the room availability engine:</p>
                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        setBookingConfirmed(!bookingConfirmed);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{bookingConfirmed ? 'Dates Reserved! (Check-in Oct 12)' : 'Select Dates (Oct 12 - Oct 18)'}</span>
                    </button>
                    {bookingConfirmed && (
                      <p className="text-[11px] text-emerald-400 text-center animate-fadeIn">
                        ✓ Suite verified available in Bali Resort!
                      </p>
                    )}
                  </div>
                )}

                {project.id === 'restaurant' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Test table reservation for 4 Guests:</p>
                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        setBookingConfirmed(!bookingConfirmed);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{bookingConfirmed ? 'Table Confirmed for 7:30 PM' : 'Book Gourmet Table'}</span>
                    </button>
                    {bookingConfirmed && (
                      <p className="text-[11px] text-amber-300 text-center animate-fadeIn">
                        ✓ Reservation voucher dispatched!
                      </p>
                    )}
                  </div>
                )}

                {project.id === 'ecommerce' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Simulate cart items:</p>
                    <div className="flex items-center justify-between text-xs text-slate-200 bg-black/40 p-2 rounded-lg">
                      <span>Items in Cart:</span>
                      <span className="font-bold text-cyan-400 font-mono text-sm">{cartCount}</span>
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setCartCount((c) => c + 1);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add Neo//Tek Item to Cart</span>
                    </button>
                  </div>
                )}

                {project.id === 'ngo' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Simulate donation impact:</p>
                    <div className="flex gap-2">
                      {[25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            soundManager.playClick();
                            setDonationAmount(amt);
                          }}
                          className={`flex-1 py-1 text-xs rounded font-mono ${
                            donationAmount === amt ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        setDonationSuccess(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{donationSuccess ? `Supported ($${donationAmount})!` : `Donate $${donationAmount}`}</span>
                    </button>
                  </div>
                )}

                {(project.id === 'travel' || project.id === 'portfolio') && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300">Interactive 3D Engine Status:</p>
                    <div className="p-2 rounded bg-black/40 text-xs font-mono text-cyan-300">
                      ✓ WebGL 2.0 Active · 60 FPS
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        setBookingConfirmed(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>{bookingConfirmed ? 'Simulation Loaded!' : 'Run Interactive Demo'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-900/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Designed & Engineered by <strong className="text-white">Yogesh Chhura</strong>
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
