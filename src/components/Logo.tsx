import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  priority?: boolean;
}

export default function Logo({ className = "w-12 h-12", size = 48, priority = false }: LogoProps) {
  return (
    <img 
      src="/Jody_Story_Bailbonds_Logo.jpg" 
      alt="Jody Story Logo" 
      className={`${className} object-contain hover:scale-105 transition-all duration-300 rounded-sm drop-shadow-[0_0_8px_rgba(0,210,255,0.2)]`}
      style={{ width: size, height: size }}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
