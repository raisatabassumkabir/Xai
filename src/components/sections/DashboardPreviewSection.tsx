"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, Container } from "@/components/layout";
import { 
  Activity, 
  BarChart3, 
  Users, 
  Zap, 
  LayoutDashboard, 
  Settings, 
  Bot, 
  Sparkles, 
  Key, 
  TrendingUp
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "automations", label: "AI Agents", icon: Bot },
  { id: "settings", label: "Settings", icon: Settings },
];

const metrics = [
  { id: 1, title: "Total Throughput", value: "$148,920", change: "+18.5%", icon: Activity, trend: "up" },
  { id: 2, title: "Active Telemetry Streams", value: "48,210", change: "+24.2%", icon: Users, trend: "up" },
  { id: 3, title: "Cluster Health", value: "99.98%", change: "+0.1%", icon: Zap, trend: "up" },
];

const mockLogs = [
  { id: "1", time: "12:04:12", source: "Kafka Telemetry", event: "Normalized 14,200 events/sec", status: "success" },
  { id: "2", time: "12:04:09", source: "Vector Engine", event: "Generated 1536-D embeddings", status: "success" },
  { id: "3", time: "12:04:02", source: "Agent Dispatch", event: "Triggered fraud prevention webhook", status: "active" },
];

export const DashboardPreviewSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [agentStatuses, setAgentStatuses] = useState<{ [key: string]: boolean }>({
    "agent-1": true,
    "agent-2": true,
    "agent-3": false,
  });

  const toggleAgent = (id: string) => {
    setAgentStatuses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Section id="dashboard" className="py-24 bg-background min-h-screen flex items-center border-t border-white/5">
      <Container>
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-4 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Workspace Preview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-white">
            Intelligent Dashboard
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Experience the high-density command center powered by predictive analytics and real-time agent dispatch.
          </p>
        </div>

        {/* Product UI Shell */}
        <GlassCard className="max-w-5xl mx-auto p-1.5 md:p-2 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row min-h-[620px] rounded-xl overflow-hidden bg-[#07080e]/95">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 border-r border-white/10 p-4 flex flex-col gap-2 bg-black/30">
              <div className="px-3 py-4 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-extrabold text-base text-white tracking-tight">Xai Workspace</span>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      v4.2 Production
                    </div>
                  </div>
                </div>
              </div>
              
              <nav className="flex flex-col gap-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-dashboard-tab"
                          className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-indigo-400" : ""}`} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Footer Info */}
              <div className="mt-auto p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 flex flex-col gap-1">
                <div className="text-[11px] font-mono text-slate-300">Cluster Latency</div>
                <div className="text-emerald-400 font-mono font-bold text-sm">3.8 ms avg</div>
              </div>
            </div>

            {/* Main Workspace Content Area */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: OVERVIEW */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <h3 className="text-xl font-bold text-white">System Overview</h3>
                        <p className="text-xs text-slate-400">Real-time throughput telemetry</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">Last updated: Just now</span>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {metrics.map((m) => {
                        const Icon = m.icon;
                        return (
                          <div key={m.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:border-white/20 transition-all">
                            <div className="flex justify-between items-center text-slate-400">
                              <span className="text-xs font-medium">{m.title}</span>
                              <Icon className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div className="text-2xl font-extrabold text-white">{m.value}</div>
                            <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                              <TrendingUp className="w-3 h-3" />
                              <span>{m.change} vs last 24h</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Performance Trajectory Graph Mock */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                          Signal Trajectory & Throughput
                        </span>
                        <div className="flex gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                          <span className="text-xs text-slate-400">Model Inference</span>
                        </div>
                      </div>

                      {/* Bar chart representation */}
                      <div className="h-32 flex items-end gap-2 pt-4">
                        {[45, 65, 30, 80, 55, 90, 75, 100, 85, 95, 70, 88].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                            <div
                              style={{ height: `${h}%` }}
                              className="w-full rounded-t bg-gradient-to-t from-indigo-600/30 to-indigo-400 group-hover:from-purple-500 group-hover:to-emerald-400 transition-all duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Event Telemetry Stream */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-3">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Live Event Stream Ticker
                      </div>
                      <div className="flex flex-col gap-2">
                        {mockLogs.map((log) => (
                          <div key={log.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5 border border-white/5 font-mono">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-slate-400">[{log.time}]</span>
                              <span className="text-indigo-300 font-semibold">{log.source}:</span>
                              <span className="text-slate-200">{log.event}</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                              {log.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* TAB 2: ANALYTICS */}
                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <h3 className="text-xl font-bold text-white">Advanced Model Analytics</h3>
                        <p className="text-xs text-slate-400">Vector distance & latency distribution</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                        <div className="text-xs text-slate-400">Embedding Recall Accuracy</div>
                        <div className="text-3xl font-bold text-emerald-400 font-mono">99.94%</div>
                        <div className="text-xs text-slate-400">Tested across 50M query vectors</div>
                      </div>
                      <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                        <div className="text-xs text-slate-400">P99 Inference Latency</div>
                        <div className="text-3xl font-bold text-indigo-400 font-mono">1.82 ms</div>
                        <div className="text-xs text-slate-400">GPU TensorRT optimized</div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-3">
                      <span className="text-xs font-mono font-bold text-slate-300">Semantic Drift Distribution</span>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden flex">
                        <div className="bg-indigo-500 h-full w-[65%]" />
                        <div className="bg-purple-500 h-full w-[25%]" />
                        <div className="bg-emerald-400 h-full w-[10%]" />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-mono pt-1">
                        <span>Exact Matches (65%)</span>
                        <span>Near Neighbors (25%)</span>
                        <span>Outliers (10%)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: AUTOMATIONS */}
                {activeTab === "automations" && (
                  <motion.div
                    key="automations"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <h3 className="text-xl font-bold text-white">Autonomous AI Agents</h3>
                        <p className="text-xs text-slate-400">Active background workflows & webhooks</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {[
                        { id: "agent-1", name: "Anomaly Detector Agent", trigger: "On Kafka Payload Ingest", status: "Active" },
                        { id: "agent-2", name: "Auto-Remediation Workflow", trigger: "On Risk Score > 0.85", status: "Active" },
                        { id: "agent-3", name: "Weekly Executive Digest Generator", trigger: "Cron: Mon 08:00 UTC", status: "Paused" },
                      ].map((ag) => {
                        const isEnabled = agentStatuses[ag.id];
                        return (
                          <div key={ag.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isEnabled ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-slate-500"}`}>
                                <Bot className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-white">{ag.name}</div>
                                <div className="text-xs text-slate-400 font-mono">{ag.trigger}</div>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleAgent(ag.id)}
                              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                                isEnabled 
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : "bg-white/5 text-slate-400 border border-white/10"
                              }`}
                            >
                              {isEnabled ? "ACTIVE" : "PAUSED"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: SETTINGS */}
                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <h3 className="text-xl font-bold text-white">Workspace Configuration</h3>
                        <p className="text-xs text-slate-400">API credentials & model preferences</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-3">
                      <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                        <Key className="w-4 h-4 text-indigo-400" />
                        Workspace API Secret Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          readOnly
                          value="xai_live_89f3a9d821e04a91b"
                          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                        />
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all">
                          Copy Key
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </GlassCard>

      </Container>
    </Section>
  );
};
