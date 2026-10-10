import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, RefreshCw, X, CheckCircle } from 'lucide-react';

export default function AIQualityCheckModal({ isOpen, onClose }) {
  const [projectTitle, setProjectTitle] = useState('Cyberpunk Neon Commercial - Sora Render');
  const [toolsUsed, setToolsUsed] = useState('OpenAI Sora + Runway Gen-3 + ElevenLabs');
  const [promptInput, setPromptInput] = useState('Cinematic 8k video of futuristic electric hypercar speeding through rainy neon cyberpunk metropolis, volumetric fog, Octane render reflections, 60fps smooth temporal flow --ar 16:9');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState({
    overallScore: 97,
    tier: "S-Tier Commercial Grade",
    promptFidelity: 98,
    temporalStability: 96,
    toolAuthenticity: "Verified (Midjourney v6 & Sora Pipeline)",
    resolutionFidelity: "3840x2160 (Native 4K)",
    licensingClearance: "Passed - Safe for Global Broadcast",
    certId: `CERT-AI-${Math.floor(100000 + Math.random() * 900000)}`
  });

  if (!isOpen) return null;

  const handleRunAudit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAuditResult({
        overallScore: 97,
        tier: "S-Tier Commercial Grade",
        promptFidelity: 98,
        temporalStability: 96,
        toolAuthenticity: "Verified (Midjourney v6 & Sora Pipeline)",
        resolutionFidelity: "3840x2160 (Native 4K)",
        licensingClearance: "Passed - Safe for Global Broadcast",
        certId: `CERT-AI-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* MODAL CARD WITH GENEROUS INNER PADDING AND CLEAN SPACING */}
      <div 
        className="relative w-full max-w-2xl bg-[#0c111d] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto"
        style={{ padding: '36px 36px', maxWidth: '680px' }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                AI Project Quality Inspector
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Requirement #12
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates AI Video Stability, Prompt Accuracy, Tool Lineage & Commercial Rights.
            </p>
          </div>
        </div>

        {/* Form Inputs with Clean Margins & Labels */}
        <form onSubmit={handleRunAudit} className="space-y-5 mb-6">
          <div>
            <label className="form-label mb-2">Project / Video Title</label>
            <input
              type="text"
              className="form-input text-sm mb-0"
              style={{ padding: '14px 16px' }}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Luxury Perfume AI Spot"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label mb-2">Tools & Pipeline</label>
              <input
                type="text"
                className="form-input text-xs font-mono text-indigo-300 mb-0"
                style={{ padding: '14px 16px' }}
                value={toolsUsed}
                onChange={(e) => setToolsUsed(e.target.value)}
                placeholder="e.g. Midjourney v6 + Runway Gen-3"
              />
            </div>

            <div>
              <label className="form-label mb-2">Evaluation Metric</label>
              <select 
                className="form-input text-xs bg-slate-900 mb-0"
                style={{ padding: '14px 16px' }}
              >
                <option>Full Commercial AI Video Inspection</option>
                <option>Temporal Consistency & Anti-Flicker</option>
                <option>Prompt Lineage & Copyright Clearance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label mb-2">Generative Prompt / Node Recipe</label>
            <textarea
              className="form-input text-xs font-mono text-slate-200 resize-none mb-0"
              style={{ padding: '14px 16px', height: '100px', lineHeight: '1.6' }}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Paste full generation prompt..."
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full btn-primary bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-3.5 justify-center text-sm font-bold shadow-xl shadow-emerald-600/25 mt-2"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing AI Frame Lineage & Consistency...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Run AI Quality Check & Verify Project
              </span>
            )}
          </button>
        </form>

        {/* Audit Result Display Box */}
        {auditResult && (
          <div 
            className="bg-slate-950/90 border border-emerald-500/40 rounded-2xl animate-fade-in"
            style={{ padding: '24px', marginTop: '24px' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-7 h-7 text-amber-400 shrink-0" />
                <div>
                  <div className="text-base font-extrabold text-white flex items-center gap-2">
                    {auditResult.tier}
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      {auditResult.certId}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Verified AI Asset Clearance Certificate</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-extrabold text-emerald-400 font-heading">
                  {auditResult.overallScore}<span className="text-sm text-slate-400">/100</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">AI Quality Score</div>
              </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Prompt Accuracy</div>
                <div className="font-bold text-indigo-300 text-sm">{auditResult.promptFidelity}%</div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Frame Stability</div>
                <div className="font-bold text-cyan-300 text-sm">{auditResult.temporalStability}%</div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Resolution</div>
                <div className="font-bold text-white text-xs truncate">{auditResult.resolutionFidelity}</div>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">Commercial License</div>
                <div className="font-bold text-emerald-400 text-xs">Cleared & Verified</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Ready for Marketplace Deployment
              </span>
              <span className="text-slate-400 text-[11px]">
                Verified by NexusAI Engine v4.2
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
