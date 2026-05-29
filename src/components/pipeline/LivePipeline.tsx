"use client";

import React, { useEffect, useState } from 'react';
import { Rss, Filter, Tag, FileText, CheckCircle2, Database, Brain, Activity, Sparkles } from 'lucide-react';

interface LivePipelineProps {
  variant?: 'daily' | 'deep-dive' | 'monthly';
}

export function LivePipeline({ variant = 'daily' }: LivePipelineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [counts, setCounts] = useState({ fetch: 0, dedup: 0, class: 0 });
  const [isSyncing, setIsSyncing] = useState(true);

  // Poll backend for real stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const json = await res.json();
        if (json.success) {
          setCounts(json.data.pipeline);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchStats();
    // Poll every 10 seconds for real-time updates
    const pollInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(pollInterval);
  }, []);

  // Simulate pipeline moving for UI activity indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const stepsConfig = {
    'daily': [
      { id: 0, name: 'FETCHER', icon: Rss, stat: `${counts.fetch} articles`, latency: '12.4s' },
      { id: 1, name: 'DEDUP', icon: Filter, stat: `${counts.dedup} removed`, latency: '0.3s' },
      { id: 2, name: 'CLASSIFIER', icon: Tag, stat: `${counts.class} tagged`, latency: '1.8s' },
      { id: 3, name: 'SUMMARISER', icon: FileText, stat: 'Processing', latency: '4.2s' }
    ],
    'deep-dive': [
      { id: 0, name: 'SCRAPER', icon: Database, stat: `40+ sources`, latency: '45.1s' },
      { id: 1, name: 'CROSS-REF', icon: Filter, stat: `${counts.fetch} verified`, latency: '12.3s' },
      { id: 2, name: 'SYNTHESIS', icon: Brain, stat: `${counts.class} parsed`, latency: '24.8s' },
      { id: 3, name: 'PUBLISHER', icon: Sparkles, stat: 'Synthesizing', latency: '8.2s' }
    ],
    'monthly': [
      { id: 0, name: 'DATA MINER', icon: Database, stat: `Macro trends`, latency: '52.1s' },
      { id: 1, name: 'PEER REVIEW', icon: Brain, stat: `Risk analysis`, latency: '34.3s' },
      { id: 2, name: 'COMPILER', icon: FileText, stat: `Structuring Report`, latency: '48.8s' },
      { id: 3, name: 'PUBLISHER', icon: Sparkles, stat: 'Finalizing', latency: '14.2s' }
    ]
  };

  const steps = stepsConfig[variant].map((step, idx) => ({
    ...step,
    status: activeStep === step.id ? 'RUNNING' : activeStep > step.id ? 'DONE' : 'WAITING'
  }));
  
  const currentAgent = steps[activeStep];
  const activeMessage = variant === 'daily' 
    ? `CURRENT ACTION: ${currentAgent.name} Agent processing daily feed...`
    : variant === 'deep-dive'
      ? `CURRENT ACTION: ${currentAgent.name} Agent orchestrating long-form research...`
      : `CURRENT ACTION: ${currentAgent.name} Agent compiling structural monthly reports...`;

  const getThemeClass = (dailyClass: string, deepClass: string, monthlyClass: string) => {
    if (variant === 'daily') return dailyClass;
    if (variant === 'deep-dive') return deepClass;
    return monthlyClass;
  };

  return (
    <div className="glass-panel w-[320px] h-full flex flex-col shrink-0 p-5 relative overflow-hidden">
      
      {/* Background Glows for active state */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[50px] pointer-events-none ${getThemeClass('bg-amber-500/10', 'bg-teal-500/10', 'bg-purple-500/10')}`}></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="font-outfit font-bold text-white text-lg tracking-wide">
          {variant === 'daily' ? 'LIVE PIPELINE' : 'AGENT ORCHESTRATOR'}
        </h2>
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border ${getThemeClass('bg-amber-500/10 border-amber-500/20', 'bg-teal-500/10 border-teal-500/20', 'bg-purple-500/10 border-purple-500/20')}`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${getThemeClass('bg-amber-400', 'bg-teal-400', 'bg-purple-400')}`}></div>
          <span className={`font-space-grotesk text-[10px] tracking-wider uppercase ${getThemeClass('text-amber-400', 'text-teal-400', 'text-purple-400')}`}>
            {isSyncing ? 'Syncing...' : 'System Running'}
          </span>
        </div>
      </div>

      {/* Current Action Header */}
      <div className="mb-8 relative z-10">
        <p className={`font-inter text-sm font-medium leading-relaxed ${getThemeClass('text-amber-400', 'text-teal-400', 'text-purple-400')}`}>
          {activeMessage}
        </p>
      </div>

      {/* Vertical Pipeline Visualization */}
      <div className="flex-1 flex flex-col relative z-10 pl-4">
        {steps.map((step, idx) => {
          const isActive = step.id === activeStep;
          const isPast = step.id < activeStep;

          return (
            <div key={step.name} className="relative flex items-start mb-10 last:mb-0">
              
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className={`absolute left-[22px] top-[45px] w-[2px] h-[calc(100%+15px)] ${isActive || isPast ? getThemeClass('bg-amber-400/30', 'bg-teal-400/30', 'bg-purple-400/30') : 'bg-white/5'}`}>
                  {isActive && (
                    <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-transparent animate-[pulse_1.5s_ease-in-out_infinite] ${getThemeClass('via-amber-400', 'via-teal-400', 'via-purple-400')}`}></div>
                  )}
                </div>
              )}

              {/* Node Icon */}
              <div className={`relative z-10 flex flex-col items-center mr-6`}>
                <div 
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isActive 
                      ? getThemeClass('bg-amber-400/20 border-amber-400 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]', 'bg-teal-400/20 border-teal-400 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]', 'bg-purple-400/20 border-purple-400 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]')
                      : isPast
                        ? 'bg-white/5 border-white/20 text-slate-300'
                        : 'bg-white/5 border-white/10 text-slate-500 opacity-40'
                  }`}
                >
                  <step.icon size={20} />
                </div>
              </div>

              {/* Node Content */}
              <div className={`flex flex-col flex-1 pt-1 ${!isActive && !isPast && 'opacity-40'}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-space-grotesk text-sm font-bold tracking-wider ${isActive ? getThemeClass('text-amber-400', 'text-teal-400', 'text-purple-400') : 'text-slate-300'}`}>
                    {step.name}
                  </h3>
                  <span className={`text-[10px] font-space-grotesk px-2 py-0.5 rounded border ${
                    isActive 
                      ? getThemeClass('bg-amber-400/10 border-amber-400/30 text-amber-400', 'bg-teal-400/10 border-teal-400/30 text-teal-400', 'bg-purple-400/10 border-purple-400/30 text-purple-400')
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}>
                    {step.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-inter text-slate-400">
                  <span>{step.stat}</span>
                  <span className="font-space-grotesk">{step.latency}</span>
                </div>

                {/* Active Processing State */}
                {isActive && (
                  <div className={`mt-3 bg-black/40 rounded-lg p-2 border ${getThemeClass('border-amber-400/20', 'border-teal-400/20', 'border-purple-400/20')}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-space-grotesk animate-pulse ${getThemeClass('text-amber-400', 'text-teal-400', 'text-purple-400')}`}>
                        ⚙️ PROCESSING...
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full w-[45%] rounded-full ${getThemeClass('bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]', 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]', 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]')}`}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Output Node */}
        <div className="relative flex items-start mt-4 opacity-40">
           <div className={`relative z-10 flex flex-col items-center mr-6`}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-500">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <div className="flex flex-col flex-1 pt-2">
                <h3 className="font-space-grotesk text-sm font-bold tracking-wider text-slate-500">
                  {variant === 'daily' ? 'OUTPUT DB' : 'KNOWLEDGE VAULT'}
                </h3>
            </div>
        </div>

      </div>
    </div>
  );
}
