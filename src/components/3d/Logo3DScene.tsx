"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Logo3DProps {
  variant?: "header" | "hero";
  className?: string;
}

export default function Logo3DScene({ variant = "header", className = "" }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHero = variant === "hero";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth || (isHero ? 460 : 50);
    const height = container.clientHeight || (isHero ? 460 : 50);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isHero ? 38 : 42, width / height, 0.1, 100);
    camera.position.z = isHero ? 5.8 : 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Warm Ambient Lighting for Beige Luxury Aesthetic
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(3, 4, 5);
    scene.add(dirLight1);

    const warmLight = new THREE.PointLight(0xd48b28, 3.5, 12);
    warmLight.position.set(-3, -2, 3);
    scene.add(warmLight);

    const crimsonLight = new THREE.PointLight(0x82111e, 2.8, 12);
    crimsonLight.position.set(3, 3, 2);
    scene.add(crimsonLight);

    // Load authentic E-Cell Logo texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/photos/ecell-logo-trans.png");
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const goldRimMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc4933f,
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
    });

    const crimsonInnerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x82111e,
      metalness: 0.4,
      roughness: 0.3,
      clearcoat: 0.5,
    });

    const badgeFaceMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      metalness: 0.15,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });

    // 1. 3D Medallion Disc Base
    const radius = isHero ? 1.85 : 1.6;
    const thickness = isHero ? 0.22 : 0.18;

    const discGeo = new THREE.CylinderGeometry(radius, radius, thickness, 48, 1);
    discGeo.rotateX(Math.PI / 2);
    const discMesh = new THREE.Mesh(discGeo, goldRimMaterial);
    rootGroup.add(discMesh);

    // 2. Front & Back Logo Emblems (Authentic Two Hands Cradling Cap)
    const faceGeo = new THREE.CircleGeometry(radius * 0.96, 48);
    
    // Front face
    const frontFaceMesh = new THREE.Mesh(faceGeo, badgeFaceMaterial);
    frontFaceMesh.position.z = thickness / 2 + 0.005;
    rootGroup.add(frontFaceMesh);

    // Back face
    const backFaceMesh = new THREE.Mesh(faceGeo, badgeFaceMaterial);
    backFaceMesh.position.z = -thickness / 2 - 0.005;
    backFaceMesh.rotation.y = Math.PI;
    rootGroup.add(backFaceMesh);

    // 3. Central Levitating 3D Graduation Cap in the Air (Between the Hands!)
    const capGroup = new THREE.Group();

    const capTopGeo = new THREE.BoxGeometry(0.85, 0.05, 0.85);
    const capTopMesh = new THREE.Mesh(capTopGeo, goldRimMaterial);
    capTopMesh.rotation.y = Math.PI / 4;
    capTopMesh.rotation.x = 0.2;
    capGroup.add(capTopMesh);

    const capBaseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.16, 24);
    const capBaseMesh = new THREE.Mesh(capBaseGeo, crimsonInnerMaterial);
    capBaseMesh.position.y = -0.1;
    capGroup.add(capBaseMesh);

    const tasselKnot = new THREE.SphereGeometry(0.04, 12, 12);
    const knotMesh = new THREE.Mesh(tasselKnot, goldRimMaterial);
    knotMesh.position.set(0, 0.035, 0);
    capGroup.add(knotMesh);

    const tasselString = new THREE.CylinderGeometry(0.015, 0.03, 0.28, 12);
    const tasselMesh = new THREE.Mesh(tasselString, goldRimMaterial);
    tasselMesh.position.set(0.32, -0.12, 0.28);
    tasselMesh.rotation.z = -0.3;
    capGroup.add(tasselMesh);

    capGroup.position.set(0, 0, isHero ? 0.35 : 0.22);
    rootGroup.add(capGroup);

    // 4. Hero Particles Orbit (Warm Champagne & Gold Sparks)
    let particlesMesh: THREE.Points | null = null;
    if (isHero) {
      const pCount = 90;
      const pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 2.1 + Math.random() * 0.7;
        pPositions[i * 3] = Math.cos(theta) * rad;
        pPositions[i * 3 + 1] = Math.sin(theta) * rad;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xd48b28,
        size: 0.045,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      particlesMesh = new THREE.Points(pGeo, pMat);
      rootGroup.add(particlesMesh);
    }

    // Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseX = THREE.MathUtils.clamp(x, -1, 1);
      mouseY = THREE.MathUtils.clamp(y, -1, 1);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      scrollSpeed = Math.min(delta * 0.007, 0.18);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleClick = () => {
      if (!isHero) return;
      targetRotY += Math.PI * 2;
    };
    container.addEventListener("click", handleClick);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous gentle rotation + scroll spin acceleration
        const baseSpeed = isHero ? 0.35 : 0.5;
        rootGroup.rotation.y += (baseSpeed + scrollSpeed * 4) * 0.01;

        // Smooth cursor tilt lerping
        targetRotX = mouseY * 0.4;
        targetRotY = mouseX * 0.5;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;
        rootGroup.rotation.z += (-mouseX * 0.15 - rootGroup.rotation.z) * 0.06;

        // Floating hover
        rootGroup.position.y = Math.sin(elapsedTime * 2) * (isHero ? 0.07 : 0.03);

        // Cap levitation in the air between the hands
        capGroup.position.y = Math.cos(elapsedTime * 2.5) * 0.04;
        capGroup.rotation.y = Math.sin(elapsedTime * 1.5) * 0.12;

        if (particlesMesh) {
          particlesMesh.rotation.z -= 0.0025;
        }

        scrollSpeed *= 0.92;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || (isHero ? 460 : 50);
      const h = container.clientHeight || (isHero ? 460 : 50);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleClick);
      renderer.dispose();
      discGeo.dispose();
      faceGeo.dispose();
      capTopGeo.dispose();
      capBaseGeo.dispose();
      goldRimMaterial.dispose();
      crimsonInnerMaterial.dispose();
      badgeFaceMaterial.dispose();
    };
  }, [isHero]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto cursor-pointer ${
        isHero
          ? "w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] mx-auto"
          : "w-11 h-11 sm:w-12 sm:h-12"
      } ${className}`}
      aria-label="3D Interactive E-Cell VSBCETC Emblem"
      role="img"
    />
  );
}
