import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Maximize2 } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface LaptopModelProps {
  className?: string;
}

export const LaptopModel: React.FC<LaptopModelProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCodeMode, setActiveCodeMode] = useState<'react' | 'java' | 'fullstack'>('react');
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x312e81, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x818cf8, 0x0f172a, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xa855f7, 2.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const screenLight = new THREE.PointLight(0xa855f7, 2.5, 6);
    screenLight.position.set(0, 1.8, 1);
    scene.add(screenLight);

    // Root Group for complete Laptop
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.25,
    });

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      metalness: 0.9,
      roughness: 0.35,
    });

    const keyboardKeyMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.5,
      roughness: 0.4,
    });

    const glowLogoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
    });

    // 1. Base Chassis
    const baseGeo = new THREE.BoxGeometry(5.2, 0.2, 3.6);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
    baseMesh.position.set(0, -0.1, 0.4);
    baseMesh.castShadow = !isSoftwareGl;
    baseMesh.receiveShadow = !isSoftwareGl;
    laptopGroup.add(baseMesh);

    // Base bottom chamfer/feet
    const feetGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 16);
    const feetMat = new THREE.MeshStandardMaterial({ color: 0x05070a, roughness: 0.8 });
    const footPositions = [
      [-2.2, -0.22, -1.1],
      [2.2, -0.22, -1.1],
      [-2.2, -0.22, 1.9],
      [2.2, -0.22, 1.9],
    ];
    footPositions.forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(feetGeo, feetMat);
      foot.position.set(x, y, z);
      laptopGroup.add(foot);
    });

    // 2. Keyboard recess
    const kbWellGeo = new THREE.BoxGeometry(4.4, 0.02, 1.8);
    const kbWellMesh = new THREE.Mesh(kbWellGeo, darkAccentMat);
    kbWellMesh.position.set(0, 0.005, 0.1);
    laptopGroup.add(kbWellMesh);

    // Keyboard Keys (Procedural Grid)
    const keysGroup = new THREE.Group();
    const rows = 5;
    const cols = 14;
    const keyWidth = 0.27;
    const keyDepth = 0.28;
    const keyGeo = new THREE.BoxGeometry(keyWidth, 0.04, keyDepth);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Spacebar condition on bottom row
        if (r === 0 && c >= 4 && c <= 9) {
          if (c === 4) {
            const spaceGeo = new THREE.BoxGeometry(keyWidth * 6 + 0.05 * 5, 0.04, keyDepth);
            const spaceKey = new THREE.Mesh(spaceGeo, keyboardKeyMat);
            spaceKey.position.set(0, 0.025, 0.7);
            keysGroup.add(spaceKey);
          }
          continue;
        }
        const key = new THREE.Mesh(keyGeo, keyboardKeyMat);
        const kx = (c - cols / 2 + 0.5) * (keyWidth + 0.035);
        const kz = 0.7 - r * (keyDepth + 0.05);
        key.position.set(kx, 0.025, kz);
        keysGroup.add(key);
      }
    }
    laptopGroup.add(keysGroup);

    // 3. Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.8, 0.015, 1.2);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.2,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.01, 1.45);
    laptopGroup.add(trackpad);

    // 4. Hinge mechanism
    const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.2, 16);
    const hingeMesh = new THREE.Mesh(hingeGeo, darkAccentMat);
    hingeMesh.rotation.z = Math.PI / 2;
    hingeMesh.position.set(0, 0.05, -1.38);
    laptopGroup.add(hingeMesh);

    // 5. Display Lid Group (Angled ~105 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, -1.38);
    lidGroup.rotation.x = -Math.PI * 0.58; // Open angle
    laptopGroup.add(lidGroup);

    // Lid chassis
    const lidGeo = new THREE.BoxGeometry(5.2, 3.4, 0.12);
    const lidMesh = new THREE.Mesh(lidGeo, chassisMat);
    lidMesh.position.set(0, 1.7, -0.06);
    lidMesh.castShadow = !isSoftwareGl;
    lidGroup.add(lidMesh);

    // Glowing logo on back of lid
    const logoGeo = new THREE.RingGeometry(0.18, 0.35, 32);
    const logoMesh = new THREE.Mesh(logoGeo, glowLogoMat);
    logoMesh.position.set(0, 1.7, -0.125);
    logoMesh.rotation.y = Math.PI;
    lidGroup.add(logoMesh);

    // 6. Screen Canvas Texture (Live dynamic animated code editor!)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 680;
    const sCtx = screenCanvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });

    const screenGeo = new THREE.PlaneGeometry(4.8, 3.1);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.7, 0.005);
    lidGroup.add(screenMesh);

    // 7. Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(7.5, 5.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const shadowGrad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    shadowGrad.addColorStop(0.5, 'rgba(88, 28, 135, 0.25)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    shadowCtx.fillStyle = shadowGrad;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, -0.22, 0.4);
    laptopGroup.add(contactShadow);

    // 8. Orbiting Technology Rings & Floating Tech Badges
    const orbitGroup = new THREE.Group();
    laptopGroup.add(orbitGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.02, 16, 64), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    orbitGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.02, 16, 64), ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    orbitGroup.add(ring2);

    // Floating Gem / Cube Orbs
    const orbMat1 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x581c87,
      emissiveIntensity: 0.4,
    });
    const orb1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), orbMat1);
    orb1.position.set(-3.2, 2.2, 1.2);
    orbitGroup.add(orb1);

    const orbMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
    });
    const orb2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), orbMat2);
    orb2.position.set(3.4, 2.5, -0.8);
    orbitGroup.add(orb2);

    const orbMat3 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xb45309,
      emissiveIntensity: 0.4,
    });
    const orb3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), orbMat3);
    orb3.position.set(2.8, -0.5, 2.2);
    orbitGroup.add(orb3);

    // Code lines to render on the screen
    const codeSnippets = {
      react: [
        '// Yogesh Chhura | Full-Stack & UI Portfolio',
        'import React, { useState, useEffect } from "react";',
        'import { Motion, Canvas, ThreeScene } from "@portfolio/3d";',
        '',
        'export function YogeshPortfolio() {',
        '  const [status, setStatus] = useState("Innovating");',
        '  const stack = ["React", "TypeScript", "Tailwind", "Java"];',
        '',
        '  return (',
        '    <Canvas interactive={true} fps={60}>',
        '      <Hero name="Yogesh Chhura" role="Web Developer & Designer" />',
        '      <Experience location="Odisha, India" exp="1+ Yr Java" />',
        '      <InteractiveShowcase projects={6} rating={5.0} />',
        '    </Canvas>',
        '  );',
        '}',
        '// Status: Ready for new challenging opportunities 🚀',
      ],
      java: [
        '// Yogesh Chhura - Java Backend & System Design',
        'package com.yogesh.portfolio;',
        '',
        'public class DeveloperProfile {',
        '    private String name = "Yogesh Chhura";',
        '    private String location = "Odisha, India";',
        '    private int javaExperienceYears = 1;',
        '',
        '    public void buildScalableWebSolutions() {',
        '        System.out.println("Executing clean OOP Architecture...");',
        '        connectDatabase();',
        '        optimizeRestEndpoints();',
        '    }',
        '    // 1 Year dedicated Java development experience',
        '}',
      ],
      fullstack: [
        'const developer = {',
        '  name: "Yogesh Chhura",',
        '  titles: ["Web Developer", "UI/UX Designer", "Java Dev"],',
        '  origin: "Odisha, India",',
        '  skills: ["HTML5", "CSS3", "JavaScript", "Java", "Tailwind", "WordPress"],',
        '  hireable: true,',
        '  contact: {',
        '    email: "yogeshchhura@gmail.com",',
        '    whatsapp: "+91 9668612323"',
        '  }',
        '};',
        'console.log("Welcome to Yogesh Chhura\'s 3D Experience!");',
      ],
    };

    let lineOffset = 0;
    let lastCodeUpdate = 0;

    function renderScreenCanvas(timestamp: number) {
      if (timestamp - lastCodeUpdate < 60) return; // limit canvas redraws
      lastCodeUpdate = timestamp;

      sCtx.fillStyle = '#080c1e';
      sCtx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);

      // Window bar
      sCtx.fillStyle = '#0e172a';
      sCtx.fillRect(0, 0, screenCanvas.width, 42);

      // Mac buttons
      sCtx.fillStyle = '#ef4444';
      sCtx.beginPath();
      sCtx.arc(24, 21, 6, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = '#f59e0b';
      sCtx.beginPath();
      sCtx.arc(44, 21, 6, 0, Math.PI * 2);
      sCtx.fill();

      sCtx.fillStyle = '#10b981';
      sCtx.beginPath();
      sCtx.arc(64, 21, 6, 0, Math.PI * 2);
      sCtx.fill();

      // Window Title
      sCtx.fillStyle = '#94a3b8';
      sCtx.font = '14px "Space Mono", monospace';
      sCtx.fillText('yogesh-portfolio.tsx — VS Code Studio', 100, 26);

      // Terminal breadcrumb
      sCtx.fillStyle = '#1e293b';
      sCtx.fillRect(0, 42, screenCanvas.width, 30);
      sCtx.fillStyle = '#38bdf8';
      sCtx.font = '12px "Space Mono", monospace';
      sCtx.fillText('src > components > Hero > YogeshChhura.tsx > render()', 20, 62);

      // Lines of code
      const currentLines = codeSnippets[activeCodeMode];
      sCtx.font = '18px "Space Mono", monospace';

      const lineStep = 32;
      const startY = 110;

      currentLines.forEach((line, idx) => {
        const y = startY + idx * lineStep;
        if (y > screenCanvas.height - 30) return;

        // Line number
        sCtx.fillStyle = '#475569';
        sCtx.fillText(String(idx + 1).padStart(2, '0'), 24, y);

        // Syntax coloring
        if (line.trim().startsWith('//')) {
          sCtx.fillStyle = '#6ee7b7';
        } else if (line.includes('import ') || line.includes('export ') || line.includes('package ') || line.includes('public class')) {
          sCtx.fillStyle = '#c084fc';
        } else if (line.includes('const ') || line.includes('let ') || line.includes('private ') || line.includes('return')) {
          sCtx.fillStyle = '#60a5fa';
        } else if (line.includes('"') || line.includes("'")) {
          sCtx.fillStyle = '#fde047';
        } else if (line.includes('<') || line.includes('>')) {
          sCtx.fillStyle = '#f472b6';
        } else {
          sCtx.fillStyle = '#f8fafc';
        }

        sCtx.fillText(line, 68, y);
      });

      // Animated glowing cursor
      const cursorPulse = Math.sin(timestamp * 0.006) > 0;
      if (cursorPulse) {
        const activeY = startY + (currentLines.length - 1) * lineStep;
        const lastLineWidth = sCtx.measureText(currentLines[currentLines.length - 1] || '').width;
        sCtx.fillStyle = '#a855f7';
        sCtx.fillRect(72 + lastLineWidth, activeY - 16, 10, 20);
      }

      screenTexture.needsUpdate = true;
    }

    // Interaction handling: Mouse drag or hover rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.005;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX)); // Clamp vertical tilt
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Initial positioning
    laptopGroup.position.set(0, -0.6, 0);
    laptopGroup.rotation.y = -Math.PI * 0.12;

    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Screen animation
      renderScreenCanvas(time * 1000);

      // Auto rotation when enabled and not dragging
      if (isRotatingRef.current && !isDragging) {
        targetRotY += delta * 0.25;
      }

      // Smooth damping interpolation
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.08;
      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.08;

      // Floating gentle hover animation
      laptopGroup.position.y = -0.6 + Math.sin(time * 1.5) * 0.12;

      // Orbit tech objects
      orbitGroup.rotation.y = -time * 0.4;
      orb1.rotation.y += delta * 1.5;
      orb2.rotation.x += delta * 1.2;
      orb3.rotation.z += delta * 1.4;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      baseGeo.dispose();
      chassisMat.dispose();
      darkAccentMat.dispose();
      keyboardKeyMat.dispose();
      glowLogoMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      renderer.dispose();
    };
  }, [activeCodeMode]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[360px] sm:h-[440px] lg:h-[480px] cursor-grab active:cursor-grabbing relative"
        title="Click & Drag to rotate Yogesh's 3D Workstation"
      >
        {/* Subtle Interactive Instruction Pill */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur border border-white/10 text-xs text-slate-300 pointer-events-none">
          <RotateCw className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Interactive 3D Workstation · Drag to spin</span>
        </div>
      </div>

      {/* Sleek bottom control dock (Collapsible/compact, compliant with Three.js skill) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur shadow-xl max-w-md w-full">
        {/* Code mode switchers */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => {
              setActiveCodeMode('react');
              soundManager.playClick();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeCodeMode === 'react'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            React
          </button>
          <button
            onClick={() => {
              setActiveCodeMode('java');
              soundManager.playClick();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeCodeMode === 'java'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Java (1 Yr)
          </button>
          <button
            onClick={() => {
              setActiveCodeMode('fullstack');
              soundManager.playClick();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeCodeMode === 'fullstack'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full-Stack
          </button>
        </div>

        {/* Spin auto toggle */}
        <button
          onClick={() => {
            setIsRotating(!isRotating);
            soundManager.playClick();
          }}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
            isRotating
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
              : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle automatic rotation"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>{isRotating ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
        </button>
      </div>
    </div>
  );
};
