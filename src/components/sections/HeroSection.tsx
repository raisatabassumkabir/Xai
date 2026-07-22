"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSystem } from "@/components/3d/ParticleSystem";
import { Section, Container } from "@/components/layout";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MousePointerClick } from "lucide-react";

export const HeroSection = () => {
  const scrollToFlow = () => {
    const el = document.getElementById("insight-flow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section className="h-screen p-0 flex items-center justify-center relative bg-background overflow-hidden">
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
          <Suspense fallback={null}>
            <ParticleSystem />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2 + 0.3}
              minPolarAngle={Math.PI / 2 - 0.3}
              maxAzimuthAngle={0.4}
              minAzimuthAngle={-0.4}
            />
          </Suspense>
        </Canvas>
        
        {/* Ambient Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none" />
      </div>

      {/* Hero Overlay Content */}
      <Container className="relative z-10 pointer-events-none">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wide text-indigo-200">
              Xai Intelligence Workspace 4.0
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400"
          >
            Transform Raw Data into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
              Structured Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-normal leading-relaxed"
          >
            Hover or click the 3D data matrix below to align chaos into clarity. 
            Xai normalizes complex datasets into autonomous AI workflows at light speed.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
          >
            <button 
              onClick={scrollToFlow}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-slate-200 transition-all duration-200 shadow-[0_0_50px_rgba(99,102,241,0.4)]"
            >
              <span>Explore Intelligence Flow</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-slate-400">
              <MousePointerClick className="w-4 h-4 text-purple-400 animate-bounce" />
              <span>Hover & Click 3D Sphere to Morph</span>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </Section>
  );
};
