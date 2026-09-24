"use client";

import React, { useEffect, useRef } from "react";

export default function DynamicAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      color: string;
    }

    let particles: Particle[] = [];
    const colors = ["#00F0FF", "#6366F1", "#38BDF8", "#818CF8"];
    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 18000), 75);
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.8 + 0.6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseAlpha: Math.random() * 0.35 + 0.15,
          alpha: Math.random() * 0.35 + 0.15,
          color,
        });
      }
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction: push away smoothly
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
          p.alpha = Math.min(p.baseAlpha + force * 0.5, 0.9);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Ambient Aurora Glows - Seamless without any box borders */}
      <div
        className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw] rounded-full opacity-20 blur-[130px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-[140px] animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(0, 240, 255, 0.1) 50%, transparent 70%)",
          animationDelay: "5s",
        }}
      />

      {/* Subtle Micro-Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Interactive Transparent Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
