"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 overflow-hidden">
      <div 
        className="text-center relative"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="relative">
          <h1 className="text-[180px] font-bold text-blue-200 opacity-50 select-none md:text-[250px]">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h2 className="text-4xl font-bold text-blue-600 mb-4 glitch-text" data-text="Page Not Found">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg
                transition-transform hover:scale-105 hover:shadow-lg hover:from-blue-500 hover:to-purple-500
                relative overflow-hidden group"
            >
              <span className="relative z-10">Return Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
