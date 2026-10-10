import React, { useState } from 'react';
import { Search, Briefcase, ArrowLeft, Filter, Sparkles, DollarSign, Clock } from 'lucide-react';

export default function BrowseBriefsPage({ briefsList, onOpenAuth, currentUser, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredBriefs = briefsList.filter(brief => {
    const matchesQuery = 
      brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.toolsRequired.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || brief.contentType === selectedType;

    return matchesQuery && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <button 
            onClick={() => onNavigate('landing')} 
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mb-2 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            Brand & Agency Creative Briefs <span className="text-purple-400 font-mono text-xl">(50 Campaigns)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse open commercial briefs posted by global tech, fashion, luxury & automotive brands.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            className="form-input pl-10 text-xs"
            placeholder="Search briefs by campaign title, brand name, required tool (Sora, Midjourney, Runway)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="form-input text-xs bg-slate-900 w-full md:w-52"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Content Types</option>
          <option value="AI Video Commercial">AI Video Commercial</option>
          <option value="3D Motion Graphic">3D Motion Graphic</option>
          <option value="Short-Form Social Reel">Short-Form Social Reel</option>
          <option value="Key Art / Poster">Key Art / Poster</option>
          <option value="AI Character Animation">AI Character Animation</option>
        </select>
      </div>

      {/* Briefs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBriefs.map((brief) => (
          <div key={brief.id} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-500/30 flex items-center gap-1.5">
                  <span className="text-base">{brief.brandLogo}</span>
                  {brief.brandName}
                </span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  {brief.budget}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg mb-2">{brief.title}</h3>
              <p className="text-xs text-slate-300 mb-4">{brief.description}</p>

              <div className="space-y-1.5 text-xs text-slate-400 bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
                <div>• Format: <span className="text-slate-200">{brief.aspectRatio}</span></div>
                <div>• Required Tools: <span className="text-indigo-300 font-mono">{brief.toolsRequired.join(', ')}</span></div>
                <div>• Licensing: <span className="text-emerald-400">{brief.commercialUse}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{brief.applicantsCount} Applicants • {brief.createdAt}</span>
              
              <button 
                onClick={() => {
                  if (!currentUser) {
                    onOpenAuth('login', 'creator');
                  } else {
                    alert(`Proposal submitted for brief '${brief.title}'!`);
                  }
                }}
                className="btn-primary py-1.5 px-4 text-xs bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
