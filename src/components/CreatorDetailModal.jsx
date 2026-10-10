import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, DollarSign, Award, CheckCircle2, MessageSquare, Briefcase, Sparkles, ExternalLink, Cpu } from 'lucide-react';

export default function CreatorDetailModal({ creator, isOpen, onClose, onInviteToBrief }) {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'experience' | 'expertise' | 'reviews'

  if (!isOpen || !creator) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f1424] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* PROFILE HEADER HERO */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-[#0f1424] border-b border-white/10 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl" 
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-2xl font-extrabold text-white font-heading">{creator.name}</h2>
                <span className="text-sm font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  {creator.username}
                </span>
                {creator.verified && (
                  <span className="badge badge-verified">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified AI Pro
                  </span>
                )}
              </div>

              <p className="text-sm text-cyan-300 font-medium mb-2">{creator.title}</p>

              <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {creator.rating} <span className="text-slate-400">({creator.reviewCount} reviews)</span>
                </span>

                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" /> {creator.location}
                </span>

                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <DollarSign className="w-3.5 h-3.5" /> ${creator.hourlyRate}/hr
                </span>

                <span className="flex items-center gap-1 text-slate-400">
                  <Briefcase className="w-3.5 h-3.5" /> {creator.projectsCompleted} Projects
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={() => {
                  onInviteToBrief(creator);
                  onClose();
                }}
                className="flex-1 btn-primary text-xs py-2 px-4 justify-center"
              >
                <Briefcase className="w-3.5 h-3.5" /> Invite to Brief
              </button>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex border-b border-white/10 bg-slate-900/80 px-6 gap-2">
          {['portfolio', 'experience', 'expertise', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-xs font-bold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'portfolio' ? 'AI Portfolio Work' : tab}
            </button>
          ))}
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0f1424]">
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="text-xs text-slate-400 mb-4">
                Explore AI-generated work, tools used, prompt snippets, and verification scores.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creator.portfolio.map((item) => (
                  <div key={item.id} className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="relative rounded-xl overflow-hidden mb-3 aspect-video group">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                          <ShieldCheck className="w-3 h-3" /> Score: {item.aiQualityScore}/100
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/75 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded">
                          {item.aspectRatio} • {item.renderTime}
                        </div>
                      </div>

                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-300 mb-3 line-clamp-2">{item.description}</p>

                      {/* Tools Used */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Tools:</span>
                        {item.toolsUsed.map((tool, idx) => (
                          <span key={idx} className="badge badge-tool text-[10px]">
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Prompt Recipe Snippet */}
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5 mb-3">
                        <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1 flex items-center justify-between">
                          <span>Prompt Lineage</span>
                          <span className="text-[9px] text-slate-400">Verified Node</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-300 italic line-clamp-2">
                          "{item.promptSnippet}"
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 pt-2 border-t border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {item.licensing}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Work Experience & Track Record
              </h3>
              {creator.experience.map((exp, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-indigo-300 text-sm">{exp.role}</h4>
                    <span className="text-xs text-slate-400 font-mono">{exp.year}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mb-2">{exp.company}</div>
                  <p className="text-xs text-slate-400">{exp.notes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  AI Tool Mastery & Workflows
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {creator.tools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Specialized Skills
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {creator.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white mb-2">Client Reviews & Testimonials</h4>
              {creator.reviews.map((rev, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-cyan-300">{rev.client}</span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {rev.rating}.0
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                  <div className="text-[10px] text-slate-500 text-right">{rev.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
