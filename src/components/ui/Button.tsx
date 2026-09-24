"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  magnetic = true,
  className = "",
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.22;
    const y = (clientY - (top + height / 2)) * 0.22;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Base styles
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs tracking-wider",
    md: "px-5 py-2.5 text-sm tracking-wide",
    lg: "px-7 py-3.5 text-base tracking-wide font-medium",
  }[size];

  const variantStyles = {
    primary:
      "relative bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 border border-cyan-400/40 overflow-hidden",
    secondary:
      "relative bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-md",
    outline:
      "relative bg-transparent text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10",
    ghost:
      "relative bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.06]",
  }[variant];

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      disabled={disabled}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer transition-colors duration-300 select-none ${sizeStyles} ${variantStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      {...(props as any)}
    >
      {/* Dynamic Border Shimmer on Hover for Primary */}
      {variant === "primary" && (
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{ willChange: "transform" }}
        />
      )}

      {/* Subtle radial glow under cursor */}
      {isHovered && variant !== "ghost" && (
        <span className="absolute inset-0 bg-radial-gradient from-white/15 to-transparent pointer-events-none rounded-full" />
      )}

      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
