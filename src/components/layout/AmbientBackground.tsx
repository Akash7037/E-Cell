"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const spacing = 56;
    let cols = Math.ceil(width / spacing) + 1;
    let rows = Math.ceil(height / spacing) + 1;

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Warm Luxury Paper Background
      ctx.fillStyle = "#F7F3E9";
      ctx.fillRect(0, 0, width, height);

      // 2. Soft Ambient Lighting Orbs
      const crimsonOrb = ctx.createRadialGradient(
        width * 0.15 + Math.sin(time * 0.5) * 50,
        height * 0.2 + Math.cos(time * 0.6) * 40,
        0,
        width * 0.15,
        height * 0.2,
        width * 0.4
      );
      crimsonOrb.addColorStop(0, "rgba(130, 17, 30, 0.06)");
      crimsonOrb.addColorStop(0.7, "rgba(130, 17, 30, 0.01)");
      crimsonOrb.addColorStop(1, "transparent");
      ctx.fillStyle = crimsonOrb;
      ctx.fillRect(0, 0, width, height);

      const amberOrb = ctx.createRadialGradient(
        width * 0.82 + Math.cos(time * 0.4) * 45,
        height * 0.78 + Math.sin(time * 0.5) * 45,
        0,
        width * 0.82,
        height * 0.78,
        width * 0.45
      );
      amberOrb.addColorStop(0, "rgba(212, 139, 40, 0.08)");
      amberOrb.addColorStop(0.7, "rgba(212, 139, 40, 0.01)");
      amberOrb.addColorStop(1, "transparent");
      ctx.fillStyle = amberOrb;
      ctx.fillRect(0, 0, width, height);

      if (prefersReducedMotion) return;

      // 3. Subtle Kinetic Sand Grid with Cursor Deflection
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * spacing;
          const originY = j * spacing - (scrollY % spacing);

          const dx = mouseX - originX;
          const dy = mouseY - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 160;
          let drawX = originX;
          let drawY = originY;
          let alpha = 0.05;
          let dotRadius = 1;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            drawX -= (dx / (dist || 1)) * factor * 10;
            drawY -= (dy / (dist || 1)) * factor * 10;
            alpha = 0.05 + factor * 0.25;
            dotRadius = 1 + factor * 1.5;
            ctx.fillStyle = `rgba(130, 17, 30, ${alpha.toFixed(2)})`;
          } else {
            ctx.fillStyle = `rgba(18, 19, 22, ${alpha.toFixed(2)})`;
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
