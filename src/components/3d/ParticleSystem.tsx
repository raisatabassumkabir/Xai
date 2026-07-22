"use client";

import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [formationMode, setFormationMode] = useState<number>(0); // 0: Chaos, 1: Grid, 2: Ring

  const count = 3500;
  const radius = 3.5;
  const gridSize = Math.ceil(Math.pow(count, 1 / 3));
  const spacing = 0.45;
  const offset = (gridSize * spacing) / 2;

  // Generate particle positions for 3 distinct geometries
  const { positionsChaos, positionsGrid, positionsRing } = useMemo(() => {
    const chaos = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const ring = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 1. Chaotic Random Sphere (Raw Data)
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * Math.cbrt(Math.random());

      chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      chaos[i * 3 + 2] = r * Math.cos(phi);

      // 2. Structured 3D Grid Matrix (Structured Intelligence)
      const x = (i % gridSize) * spacing - offset;
      const y = (Math.floor(i / gridSize) % gridSize) * spacing - offset;
      const z = (Math.floor(i / (gridSize * gridSize))) * spacing - offset;

      grid[i * 3] = x;
      grid[i * 3 + 1] = y;
      grid[i * 3 + 2] = z;

      // 3. Torus / Neural Ring Topology (Actionable Insight)
      const u = (i / count) * Math.PI * 2 * 3;
      const ringR = 2.5 + Math.sin(u * 5) * 0.3;
      const tubeR = 0.6 * Math.cos(i);

      ring[i * 3] = (ringR + tubeR * Math.cos(u)) * Math.cos(u * 0.5);
      ring[i * 3 + 1] = (ringR + tubeR * Math.cos(u)) * Math.sin(u * 0.5);
      ring[i * 3 + 2] = tubeR * Math.sin(u * 2);
    }

    return {
      positionsChaos: chaos,
      positionsGrid: grid,
      positionsRing: ring,
    };
  }, [count, gridSize, spacing, offset, radius]);

  // Animated position buffer
  const currentPositions = useMemo(() => new Float32Array(positionsChaos), [positionsChaos]);

  // Interpolated colors
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color("#6366f1"); // Indigo
    const colorB = new THREE.Color("#a855f7"); // Purple
    const colorC = new THREE.Color("#10b981"); // Emerald

    for (let i = 0; i < count; i++) {
      const ratio = i / count;
      const mixedColor = ratio < 0.5 
        ? colorA.clone().lerp(colorB, ratio * 2) 
        : colorB.clone().lerp(colorC, (ratio - 0.5) * 2);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return colors;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttribute = geometry.attributes.position;
    const positionsArray = posAttribute.array as Float32Array;

    // Determine target based on formation mode
    let target = positionsChaos;
    if (formationMode === 1) target = positionsGrid;
    if (formationMode === 2) target = positionsRing;

    // Smooth Lerp towards target positions
    const lerpSpeed = Math.min(delta * 3.5, 0.15);
    for (let i = 0; i < count * 3; i++) {
      positionsArray[i] += (target[i] - positionsArray[i]) * lerpSpeed;
    }

    posAttribute.needsUpdate = true;

    // Interactive Pointer influence
    const { x, y } = state.pointer;
    pointsRef.current.rotation.y += delta * 0.15 + x * 0.005;
    pointsRef.current.rotation.x += delta * 0.08 - y * 0.005;
  });

  const cycleMode = () => {
    setFormationMode((prev) => (prev + 1) % 3);
  };

  return (
    <points
      ref={pointsRef}
      onPointerDown={cycleMode}
      onPointerOver={() => setFormationMode(1)}
      onPointerOut={() => setFormationMode(0)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={currentPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
