import React, { useState } from 'react';
import { Search, Filter, Star, ShieldCheck, Cpu, ArrowLeft, Briefcase, Lock, User, ArrowRight } from 'lucide-react';

export default function BrowseCreatorsPage({ creatorsList, onSelectCreator, onNavigate, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [minRating, setMinRating] = useState('0');

  const filteredCreators = creatorsList.filter(creator => {
    const matchesQuery = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTool = selectedTool === 'All' || creator.tools.includes(selectedTool);
    const matchesSpec = selectedSpec === 'All' || creator.specialization === selectedSpec;
    const matchesRating = creator.rating >= parseFloat(minRating);

    return matchesQuery && matchesTool && matchesSpec && matchesRating;
  });

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 p-6 lg:p-12 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <button 
            onClick={() => onNavigate('landing')} 
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 mb-2 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            Discover Verified AI Creators <span className="text-indigo-400 font-mono text-xl">(50 Profiles)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search & filter world-class AI filmmakers, animators & prompt artists by toolstack, rating & specializations.
          </p>
        </div>
      </div>

      {/* UNAUTHENTICATED GATE BANNER */}
      {!currentUser && (
        <div className="glass-panel-glow p-8 rounded-3xl border border-indigo-500/40 text-center space-y-4 my-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-amber-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Log In to Unlock Full AI Creator Profiles</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            To protect generative artist workflows, complete portfolio recipes, prompt history, and direct brand messaging are accessible after signing in.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('auth-brand')}
              className="btn-primary py-3 px-6 text-xs font-bold"
            >
              Log In as Brand / Agency <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('auth-creator')}
              className="btn-secondary py-3 px-6 text-xs font-bold"
            >
              Sign Up as AI Creator
            </button>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              className="form-input pl-10 text-xs mb-0"
              placeholder="Search by name, username (@alex_ai), skill, tool (Sora, Midjourney, ComfyUI, Runway)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              className="form-input text-xs bg-slate-900 w-full md:w-44 mb-0"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              <option value="All">All AI Tools</option>
              <option value="Runway Gen-3">Runway Gen-3</option>
              <option value="OpenAI Sora">OpenAI Sora</option>
              <option value="Midjourney v6">Midjourney v6</option>
              <option value="ComfyUI">ComfyUI Workflows</option>
              <option value="ElevenLabs">ElevenLabs Audio</option>
              <option value="Flux.1 Dev">Flux.1 Dev</option>
            </select>

            <select
              className="form-input text-xs bg-slate-900 w-full md:w-44 mb-0"
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
            >
              <option value="All">All Specializations</option>
              <option value="AI Commercials">AI Commercials</option>
              <option value="Fashion & Luxury">Fashion & Luxury</option>
              <option value="Product Visualization">Product Visualization</option>
              <option value="Synthetic Humans">Synthetic Humans</option>
              <option value="AI Music Videos">AI Music Videos</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
          <span>Displaying <strong className="text-white">{filteredCreators.length}</strong> of 50 Creators</span>
          <button
            onClick={() => { setSearchQuery(''); setSelectedTool('All'); setSelectedSpec('All'); setMinRating('0'); }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Grid of Creators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCreators.map((creator) => (
          <div 
            key={creator.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    className="w-14 h-14 rounded-2xl object-cover border border-indigo-500/30"
                  />
                  <div>
                    <div className="font-bold text-white text-base flex items-center gap-1.5">
                      {creator.name}
                      {creator.verified && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-mono text-indigo-300 mt-0.5">{creator.username}</div>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {creator.rating}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-semibold mb-2">{creator.title}</p>
              
              {currentUser ? (
                <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{creator.bio}</p>
              ) : (
                <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-[11px] text-indigo-300 flex items-center gap-2 mb-3">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Log in to view complete AI portfolio & prompt recipes.</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 flex-wrap">
                {creator.tools.map((tool, idx) => (
                  <span key={idx} className="badge badge-tool text-[10px]">{tool}</span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-slate-400">Rate: </span>
                <span className="font-bold text-emerald-400 text-sm">${creator.hourlyRate}/hr</span>
              </div>

              <button
                onClick={() => {
                  if (!currentUser) {
                    onNavigate('auth-brand');
                  } else {
                    onSelectCreator(creator);
                  }
                }}
                className="btn-primary text-xs py-2 px-4"
              >
                {currentUser ? 'Inspect Portfolio →' : 'Log In to View →'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
