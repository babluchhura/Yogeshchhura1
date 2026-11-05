import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const _mousePos = new THREE.Vector2(0, 0);
const _targetMousePos = new THREE.Vector2(0, 0);

export const CanvasBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.0012);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Particle field
    const particleCount = isSoftwareGl ? 600 : 1600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x3b82f6), // Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 240;
      positions[i3 + 1] = (Math.random() - 0.5) * 240;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle texture for particle points
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      size: 1.6,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Floating subtle geometric objects around the scene
    const shapesGroup = new THREE.Group();
    const wireMat1 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireMat3 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const shape1 = new THREE.Mesh(new THREE.IcosahedronGeometry(12, 1), wireMat1);
    shape1.position.set(-60, 30, -30);
    shapesGroup.add(shape1);

    const shape2 = new THREE.Mesh(new THREE.TorusGeometry(14, 3, 12, 32), wireMat2);
    shape2.position.set(65, -25, -20);
    shapesGroup.add(shape2);

    const shape3 = new THREE.Mesh(new THREE.OctahedronGeometry(10, 0), wireMat3);
    shape3.position.set(-45, -35, -10);
    shapesGroup.add(shape3);

    const shape4 = new THREE.Mesh(new THREE.DodecahedronGeometry(8, 0), wireMat1);
    shape4.position.set(50, 40, -40);
    shapesGroup.add(shape4);

    scene.add(shapesGroup);

    // Mouse move tracking
    const handleMouseMove = (e: MouseEvent) => {
      _targetMousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
      _targetMousePos.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      _mousePos.x += (_targetMousePos.x - _mousePos.x) * 0.05;
      _mousePos.y += (_targetMousePos.y - _mousePos.y) * 0.05;

      // Rotate particle field slowly
      particles.rotation.y = time * 0.02 + _mousePos.x * 0.15;
      particles.rotation.x = time * 0.01 + _mousePos.y * 0.1;

      // Rotate geometric meshes
      shape1.rotation.x += 0.3 * delta;
      shape1.rotation.y += 0.4 * delta;

      shape2.rotation.x += 0.2 * delta;
      shape2.rotation.z += 0.3 * delta;

      shape3.rotation.y += 0.5 * delta;
      shape3.rotation.z += 0.2 * delta;

      shape4.rotation.x += 0.35 * delta;
      shape4.rotation.y += 0.25 * delta;

      shapesGroup.position.x = _mousePos.x * 5;
      shapesGroup.position.y = _mousePos.y * 5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      wireMat1.dispose();
      wireMat2.dispose();
      wireMat3.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
