"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section, Container } from "@/components/layout";
import { Database, Network, LineChart, Bot, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const stages = [
  {
    id: "stage-1",
    step: "01",
    title: "Ingest Raw Data",
    subtitle: "Multi-Source Telemetry",
    description: "Seamlessly ingest unstructured petabytes from S3, Postgres, Kafka, and REST endpoints into high-speed memory buffers.",
    icon: Database,
    metrics: [
      { label: "Stream Latency", value: "< 4.2ms" },
      { label: "Throughput", value: "1.4 TB/s" },
      { label: "Normalization", value: "99.99%" },
    ],
    accent: "from-indigo-500 to-blue-600",
  },
  {
    id: "stage-2",
    step: "02",
    title: "Structured Intelligence",
    subtitle: "Vector Matrix Alignment",
    description: "Transform raw payload bytes into 1536-dimensional semantic embeddings and structured schema trees in real-time.",
    icon: Network,
    metrics: [
      { label: "Vector Dimension", value: "1536-D" },
      { label: "Schema Auto-Detect", value: "Instant" },
      { label: "Clustering Accuracy", value: "99.8%" },
    ],
    accent: "from-blue-500 to-purple-600",
  },
  {
    id: "stage-3",
    step: "03",
    title: "Actionable Insights",
    subtitle: "Predictive Analytics Engine",
    description: "Deep statistical models and LLMs detect anomalies, correlate multi-modal signals, and forecast risk trajectories.",
    icon: LineChart,
    metrics: [
      { label: "Anomaly Detection", value: "Realtime" },
      { label: "Confidence Score", value: "98.4%" },
      { label: "Signal Noise Ratio", value: "+42dB" },
    ],
    accent: "from-purple-500 to-emerald-500",
  },
  {
    id: "stage-4",
    step: "04",
    title: "AI Automations",
    subtitle: "Autonomous Workflow Dispatch",
    description: "Synthesized insights trigger autonomous agentic workflows, API webhooks, and self-healing infrastructure routines.",
    icon: Bot,
    metrics: [
      { label: "Agent Response", value: "12ms" },
      { label: "Execution Reliability", value: "100%" },
      { label: "Actions Triggered", value: "84.2K/m" },
    ],
    accent: "from-emerald-400 to-teal-500",
  },
];

export const InsightFlowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const totalStages = stages.length;

    // Pin section during scroll progression
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalStages * 100}%`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalStages),
            totalStages - 1
          );
          setActiveStageIndex(idx);
        },
      },
    });

    // Animate connecting SVG path
    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      duration: totalStages,
    }, 0);

    // Stagger transition for content stages
    contentRefs.current.forEach((content, index) => {
      if (!content) return;

      const startTime = index;
      gsap.set(content, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 50, scale: index === 0 ? 1 : 0.95 });

      if (index > 0) {
        tl.to(content, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, startTime - 0.4);
      }

      if (index < totalStages - 1) {
        tl.to(content, { opacity: 0, y: -50, scale: 0.95, duration: 0.6, ease: "power3.in" }, startTime + 0.5);
      }
    });
  }, { scope: sectionRef });

  return (
    <Section id="insight-flow" ref={sectionRef} className="h-screen flex items-center bg-background p-0 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 h-full flex flex-col justify-center max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Narrative Pipeline</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
            The Intelligence Flow
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            From raw, messy data streams to autonomous agentic execution in four seamless steps.
          </p>
        </div>

        {/* Stage Progress Bar / Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto w-full">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    : "bg-white/5 border-white/5 opacity-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stage.accent} flex items-center justify-center font-mono text-xs font-bold text-white shrink-0`}>
                  {stage.step}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white leading-tight">{stage.title}</div>
                  <div className="text-[10px] text-slate-400">{stage.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Display Card Container */}
        <div className="relative max-w-4xl mx-auto w-full h-[380px] flex items-center justify-center">
          
          {/* SVG Connecting Path */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <svg width="100%" height="120" className="hidden md:block overflow-visible">
              <path
                d="M 50,60 Q 280,140 500,60 T 950,60"
                fill="transparent"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                ref={pathRef}
                d="M 50,60 Q 280,140 500,60 T 950,60"
                fill="transparent"
                stroke="url(#gradient-line-4stage)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-line-4stage" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="33%" stopColor="#3b82f6" />
                  <stop offset="66%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Stage Cards */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="absolute w-full max-w-xl p-8 rounded-2xl bg-[#0b0c14]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {/* Glowing Icon Header */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.accent} p-0.5 mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]`}>
                    <div className="w-full h-full bg-[#0b0c14] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-1">
                    Stage {stage.step} — {stage.subtitle}
                  </span>
                  
                  <h3 className="text-3xl font-extrabold text-white mb-3">
                    {stage.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    {stage.description}
                  </p>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 w-full pt-4 border-t border-white/10">
                    {stage.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                        <div className="text-xs font-bold text-white">{m.value}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </Section>
  );
};
