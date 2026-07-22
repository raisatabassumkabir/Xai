"use client";

import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Section, Container } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu, Sliders, Zap, ShieldCheck } from "lucide-react";

interface MatrixMeshProps {
  mode: number; // 0: Chaos, 1: Cluster, 2: Lattice, 3: Automation Topology
  density: number;
  speed: number;
  turbulence: number;
}

const InteractiveMatrixCanvas: React.FC<MatrixMeshProps> = ({ mode, density, speed, turbulence }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = density;
  const radius = 3.2;

  // Generate 4 dynamic spatial topologies
  const { positionsChaos, positionsCluster, positionsLattice, positionsTopology } = useMemo(() => {
    const chaos = new Float32Array(count * 3);
    const cluster = new Float32Array(count * 3);
    const lattice = new Float32Array(count * 3);
    const topology = new Float32Array(count * 3);

    const gridSize = Math.ceil(Math.pow(count, 1 / 3));
    const spacing = 0.5;
    const offset = (gridSize * spacing) / 2;

    for (let i = 0; i < count; i++) {
      // 1. Raw Chaos Stream
      chaos[i * 3] = (Math.random() - 0.5) * radius * 2.5;
      chaos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2.5;
      chaos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2.5;

      // 2. Vector Clusters (3 distinct centroids)
      const clusterIdx = i % 3;
      const center = [
        [-1.8, 0.8, 0],
        [1.8, 0.8, 0],
        [0, -1.5, 0],
      ][clusterIdx];

      cluster[i * 3] = center[0] + (Math.random() - 0.5) * 1.2;
      cluster[i * 3 + 1] = center[1] + (Math.random() - 0.5) * 1.2;
      cluster[i * 3 + 2] = center[2] + (Math.random() - 0.5) * 1.2;

      // 3. Crystal Lattice
      lattice[i * 3] = (i % gridSize) * spacing - offset;
      lattice[i * 3 + 1] = (Math.floor(i / gridSize) % gridSize) * spacing - offset;
      lattice[i * 3 + 2] = (Math.floor(i / (gridSize * gridSize))) * spacing - offset;

      // 4. Automation Topology (Double Helix Spiral Network)
      const angle = i * 0.04;
      const hRadius = 2.0;
      const strand = i % 2 === 0 ? 1 : -1;

      topology[i * 3] = Math.cos(angle) * hRadius * strand;
      topology[i * 3 + 1] = (i / count - 0.5) * 5;
      topology[i * 3 + 2] = Math.sin(angle) * hRadius * strand;
    }

    return {
      positionsChaos: chaos,
      positionsCluster: cluster,
      positionsLattice: lattice,
      positionsTopology: topology,
    };
  }, [count]);

  const currentPos = useMemo(() => new Float32Array(positionsChaos), [positionsChaos]);

  // Color gradient
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#818cf8"); // Indigo
    const c2 = new THREE.Color("#c084fc"); // Purple
    const c3 = new THREE.Color("#34d399"); // Emerald

    for (let i = 0; i < count; i++) {
      const pct = i / count;
      const col = pct < 0.5 ? c1.clone().lerp(c2, pct * 2) : c2.clone().lerp(c3, (pct - 0.5) * 2);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return colors;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    let target = positionsChaos;
    if (mode === 1) target = positionsCluster;
    if (mode === 2) target = positionsLattice;
    if (mode === 3) target = positionsTopology;

    const lerpSpeed = Math.min(delta * 4, 0.2);
    const time = state.clock.getElapsedTime() * speed;

    for (let i = 0; i < count * 3; i += 3) {
      // Base morphing
      posArr[i] += (target[i] - posArr[i]) * lerpSpeed;
      posArr[i + 1] += (target[i + 1] - posArr[i + 1]) * lerpSpeed;
      posArr[i + 2] += (target[i + 2] - posArr[i + 2]) * lerpSpeed;

      // Add turbulence noise
      if (turbulence > 0) {
        posArr[i] += Math.sin(time + posArr[i + 1] * 2) * 0.003 * turbulence;
        posArr[i + 1] += Math.cos(time + posArr[i] * 2) * 0.003 * turbulence;
      }
    }

    geo.attributes.position.needsUpdate = true;

    // Smooth rotation
    pointsRef.current.rotation.y += delta * 0.2 * speed;
    pointsRef.current.rotation.x += delta * 0.05 * speed;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={currentPos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colorArray} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const SignatureInteractionSection = () => {
  const [mode, setMode] = useState<number>(2); // Default to Lattice
  const density = 2000;
  const [speed, setSpeed] = useState<number>(1);
  const [turbulence, setTurbulence] = useState<number>(2);

  const modeDescriptions = [
    { name: "01. Raw Chaos", desc: "Unstructured telemetry points ingested from edge streams.", entropy: "94.2%" },
    { name: "02. Vector Cluster", desc: "Semantic embedding grouping into high-dimensional clusters.", entropy: "41.8%" },
    { name: "03. Crystal Lattice", desc: "Zero-loss structured matrix ready for real-time querying.", entropy: "0.05%" },
    { name: "04. AI Topology", desc: "Autonomous graph topology executing agentic workflows.", entropy: "1.2%" },
  ];

  return (
    <Section className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-4 text-xs font-semibold text-emerald-300">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Signature Interaction Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Interactive Data Matrix
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Test Xai&apos;s mathematical geometry morphing algorithms live. Switch topologies and adjust real-time spatial physics parameters.
          </p>
        </div>

        {/* Workspace Canvas & Controls Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Canvas Box (Left / Main) */}
          <div className="lg:col-span-8 relative h-[520px] rounded-3xl border border-white/10 bg-[#07080e]/90 overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)] group">
            
            <Canvas camera={{ position: [0, 0, 6.8], fov: 55 }}>
              <InteractiveMatrixCanvas mode={mode} density={density} speed={speed} turbulence={turbulence} />
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>

            {/* Live HUD Overlay */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-3 text-xs font-mono text-slate-300 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>FPS: 60</span>
              <span className="text-white/20">|</span>
              <span>Vectors: {density}</span>
              <span className="text-white/20">|</span>
              <span>Entropy: {modeDescriptions[mode].entropy}</span>
            </div>

            <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400 pointer-events-none">
              <span>Drag to rotate 3D viewport</span>
            </div>
          </div>

          {/* Controls Panel (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Topologies Selection */}
            <GlassCard className="p-6">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Select Matrix Topology
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {modeDescriptions.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMode(idx)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 ${
                      mode === idx
                        ? "bg-indigo-600/20 border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-white"
                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between">
                      <span>{m.name}</span>
                      {mode === idx && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs text-slate-400 font-normal">{m.desc}</div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Physics Parameters Sliders */}
            <GlassCard className="p-6 flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                Spatial Physics Parameters
              </h3>

              {/* Turbulence */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Quantum Turbulence</span>
                  <span className="font-mono">{turbulence}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={turbulence}
                  onChange={(e) => setTurbulence(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-white/10 rounded-lg cursor-pointer h-1.5"
                />
              </div>

              {/* Rotation Speed */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Field Rotation Velocity</span>
                  <span className="font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-white/10 rounded-lg cursor-pointer h-1.5"
                />
              </div>
            </GlassCard>

          </div>

        </div>

      </Container>
    </Section>
  );
};
