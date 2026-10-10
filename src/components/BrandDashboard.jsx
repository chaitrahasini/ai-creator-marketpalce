import React, { useState } from 'react';
import { 
  Building2, Search, Sparkles, Filter, Plus, Briefcase, UserCheck, DollarSign, 
  Star, ShieldCheck, MapPin, Send, MessageSquare, CheckCircle, SlidersHorizontal, 
  ArrowRight, RefreshCw, ChevronRight, Zap
} from 'lucide-react';

export default function BrandDashboard({ 
  currentUser, 
  creatorsList, 
  briefsList, 
  onSelectCreator, 
  onSelectCreatorForBrief, 
  onOpenAIQualityModal 
}) {
  const [activeTab, setActiveTab] = useState('browse-creators');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [minRating, setMinRating] = useState('0');

  const [roughIdea, setRoughIdea] = useState('Futuristic electric supercar reveal commercial in neon cyberpunk rain');
  const [isAiBuilding, setIsAiBuilding] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState(null);

  const [publishedBriefs, setPublishedBriefs] = useState(briefsList);

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

  const handleAiGenerateBrief = (e) => {
    e.preventDefault();
    if (!roughIdea.trim()) return;

    setIsAiBuilding(true);
    setTimeout(() => {
      setIsAiBuilding(false);
      setGeneratedBrief({
        title: `Generative Spot: ${roughIdea.slice(0, 45)}...`,
        contentType: 'AI Video Commercial',
        aspectRatio: '16:9 Horizontal (4K HDR)',
        style: 'Cinematic Photorealistic, Octane Render, Volumetric Atmosphere',
        budget: '$3,500 - $7,500',
        deadline: '14 Days',
        toolsRequired: ['Runway Gen-3', 'OpenAI Sora', 'ElevenLabs'],
        commercialUse: 'Full Worldwide Perpetual Commercial & Broadcast License',
        description: `Full commercial AI video spot expanded from idea '${roughIdea}'. Requirements include 4K temporal stability, character node consistency, and custom voiceover score.`,
        requirements: [
          'Must provide prompt history and ComfyUI workflow graph',
          'Zero frame flickering across 30-second rendering sequence',
          'Include 100% cleared AI music and vocal dubbing',
          'Full RAW asset ownership and commercial distribution rights'
        ]
      });
    }, 1500);
  };

  const handlePublishBrief = () => {
    if (!generatedBrief) return;
    const newBriefObj = {
      id: `brief-custom-${Date.now()}`,
      brandName: currentUser.name,
      brandUsername: currentUser.username,
      brandLogo: '⚡',
      brandIndustry: 'Creative Marketing',
      ...generatedBrief,
      status: 'Open for Bids',
      applicantsCount: 0,
      createdAt: 'Just now'
    };

    setPublishedBriefs([newBriefObj, ...publishedBriefs]);
    setGeneratedBrief(null);
    setRoughIdea('');
    alert('Creative Brief published live to all 50 Creators!');
    setActiveTab('brief-builder');
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR WITH EXPLICIT PADDING AND FLEX BOX LAYOUT */}
      <aside 
        className="bg-[#0f1422] border-r border-white/10 p-7 shrink-0 flex flex-col justify-between"
        style={{ width: '310px', flexShrink: 0 }}
      >
        <div className="space-y-8">
          {/* USER WELCOME CARD */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/90 to-indigo-950/60 border border-purple-500/40 mb-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xl shadow-lg border border-purple-400/40 shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden space-y-1">
                <div className="text-base font-extrabold text-white truncate">{currentUser.name}</div>
                <div className="text-xs font-mono text-purple-300 truncate font-bold">{currentUser.username}</div>
                <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                  Brand & Agency Suite
                </span>
              </div>
            </div>
          </div>

          {/* DASHBOARD TABS */}
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Building2 className="w-4 h-4 text-purple-400" />
                Brand Overview
              </span>
            </button>

            <button
              onClick={() => setActiveTab('browse-creators')}
              className={`nav-item-btn ${activeTab === 'browse-creators' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Search className="w-4 h-4 text-cyan-400" />
                Find AI Creators
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 font-mono font-extrabold">{creatorsList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('brief-builder')}
              className={`nav-item-btn ${activeTab === 'brief-builder' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI Brief Builder
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`nav-item-btn ${activeTab === 'messages' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <MessageSquare className="w-4 h-4 text-pink-400" />
                Messages
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-extrabold">2 New</span>
            </button>
          </div>
        </div>

        {/* AI Inspector button */}
        <div className="pt-8 border-t border-white/10 mt-8">
          <button
            onClick={onOpenAIQualityModal}
            className="w-full btn-outline-glow text-xs py-3.5 px-4 justify-center text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 font-extrabold"
          >
            <ShieldCheck className="w-4 h-4" /> AI Quality Inspector
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA WITH SPACIOUS PADDING */}
      <main className="flex-1 p-8 lg:p-14 overflow-y-auto space-y-10">
        
        {/* HEADER WELCOME BANNER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Welcome, <span className="text-purple-400 font-mono">{currentUser.username}</span>! 🎨
            </h1>
            <p className="text-sm text-slate-300 font-semibold">
              Brand & Agency Portal • Select Creators, launch briefs & audit generative assets
            </p>
          </div>

          <button
            onClick={() => setActiveTab('brief-builder')}
            className="btn-primary text-xs py-3.5 px-6 shadow-xl shadow-purple-600/30 bg-gradient-to-r from-purple-600 to-indigo-600 font-bold shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> Launch AI Brief Builder
          </button>
        </div>

        {/* SECTION 1: OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Active Briefs</span>
                  <Briefcase className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">{publishedBriefs.length}</div>
                <div className="text-xs text-purple-300 mt-3 font-semibold">Collecting proposals</div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Hired Creators</span>
                  <UserCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">14</div>
                <div className="text-xs text-emerald-400 font-bold mt-3">Verified AI Talent</div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Budget Spent</span>
                  <DollarSign className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">$42,800</div>
                <div className="text-xs text-slate-400 mt-3 font-medium">Across 18 GenAI Spots</div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Quality Clearance</span>
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-heading">98.4%</div>
                <div className="text-xs text-cyan-300 font-bold mt-3">Verified Lineage</div>
              </div>
            </div>

            {/* Featured Creators */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-indigo-400" /> Top Rated AI Creators Available Now
                </h3>
                <button 
                  onClick={() => setActiveTab('browse-creators')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-extrabold"
                >
                  Browse All 50 Creators →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {creatorsList.slice(0, 6).map((creator) => (
                  <div 
                    key={creator.id}
                    className="glass-panel p-7 rounded-3xl border border-white/10 hover:border-purple-500/50 flex flex-col justify-between group space-y-5 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={creator.avatar} 
                          alt={creator.name} 
                          className="w-14 h-14 rounded-2xl object-cover border border-purple-500/40 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <div className="font-extrabold text-white text-base flex items-center gap-2">
                            {creator.name}
                          </div>
                          <div className="text-xs font-mono text-purple-300 font-bold mt-0.5">{creator.username}</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-bold mb-2">{creator.title}</p>
                      <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{creator.bio}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        {creator.tools.slice(0, 3).map((tool, idx) => (
                          <span key={idx} className="badge badge-tool text-[10px] font-bold">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectCreator(creator)}
                        className="btn-secondary text-xs py-2.5 px-4 font-bold"
                      >
                        Portfolio
                      </button>

                      <button
                        onClick={() => onSelectCreatorForBrief(creator)}
                        className="btn-primary text-xs py-2.5 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold shadow-md"
                      >
                        Select Creator ✨
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: BROWSE CREATORS */}
        {activeTab === 'browse-creators' && (
          <div className="space-y-10 animate-fade-in">
            {/* Filter Toolbar */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                  <input
                    type="text"
                    className="form-input pl-12 text-sm mb-0 py-3.5"
                    placeholder="Search 50 creators by name, username (@alex_ai), skill, tool (Sora, Midjourney, ComfyUI)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    className="form-input text-xs bg-slate-900 w-full md:w-48 mb-0 py-3.5"
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
                    className="form-input text-xs bg-slate-900 w-full md:w-48 mb-0 py-3.5"
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

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
                <span>Showing <strong className="text-white font-extrabold">{filteredCreators.length}</strong> of 50 Creators</span>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTool('All'); setSelectedSpec('All'); setMinRating('0'); }}
                  className="text-purple-400 hover:text-purple-300 font-extrabold"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Creators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCreators.map((creator) => (
                <div 
                  key={creator.id}
                  className="glass-panel p-7 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-5 shadow-xl"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={creator.avatar} 
                          alt={creator.name} 
                          className="w-14 h-14 rounded-2xl object-cover border border-purple-500/40"
                        />
                        <div>
                          <div className="font-extrabold text-white text-base flex items-center gap-2">
                            {creator.name}
                            {creator.verified && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                          </div>
                          <div className="text-xs font-mono text-purple-300 font-bold mt-0.5">{creator.username}</div>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20 shrink-0">
                        <Star className="w-4 h-4 fill-amber-400" /> {creator.rating}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-extrabold mb-2">{creator.title}</p>
                    <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{creator.bio}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {creator.tools.map((tool, idx) => (
                        <span key={idx} className="badge badge-tool text-[10px] font-bold">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectCreator(creator)}
                      className="btn-secondary text-xs py-2.5 px-4 font-bold"
                    >
                      Portfolio
                    </button>

                    <button
                      onClick={() => onSelectCreatorForBrief(creator)}
                      className="btn-primary text-xs py-2.5 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold shadow-md"
                    >
                      Select Creator ✨
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: BRIEF BUILDER */}
        {activeTab === 'brief-builder' && (
          <div className="space-y-10 animate-fade-in max-w-4xl">
            <div className="glass-panel p-10 rounded-3xl border border-purple-500/50 space-y-8 shadow-2xl">
              <div className="flex items-center gap-5 pb-4 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-white">AI-Assisted Creative Brief Builder</h2>
                  <p className="text-sm text-slate-300 mt-1">Turn a rough idea into a complete, structured creative brief with tool requirements & licensing.</p>
                </div>
              </div>

              <form onSubmit={handleAiGenerateBrief} className="space-y-6">
                <div>
                  <label className="form-label">Describe Your Campaign Idea or Product Concept</label>
                  <textarea
                    className="form-input text-sm h-32 resize-none mb-0 p-5 leading-relaxed"
                    placeholder="e.g. High fashion commercial spot for luxury sunglasses in neon desert sunset..."
                    value={roughIdea}
                    onChange={(e) => setRoughIdea(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAiBuilding}
                  className="btn-primary py-4 px-8 text-sm font-extrabold w-full justify-center bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-600/40 rounded-2xl"
                >
                  {isAiBuilding ? (
                    <span className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 animate-spin" /> Structuring Commercial Brief with Generative Parameters...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-300" /> ✨ AI Auto-Generate Structured Brief
                    </span>
                  )}
                </button>
              </form>

              {/* GENERATED BRIEF PREVIEW */}
              {generatedBrief && (
                <div className="mt-10 p-8 rounded-3xl bg-slate-950/90 border border-purple-500/50 animate-fade-in space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">AI Generated Brief Preview</span>
                      <h3 className="text-xl font-extrabold text-white mt-1">{generatedBrief.title}</h3>
                    </div>
                    <span className="text-base font-extrabold text-emerald-400 font-mono bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/30">{generatedBrief.budget}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <div className="text-slate-400 text-[11px] font-bold uppercase">Format</div>
                      <div className="font-extrabold text-indigo-300 text-sm">{generatedBrief.contentType}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <div className="text-slate-400 text-[11px] font-bold uppercase">Aspect Ratio</div>
                      <div className="font-extrabold text-cyan-300 text-sm">{generatedBrief.aspectRatio}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <div className="text-slate-400 text-[11px] font-bold uppercase">Deadline</div>
                      <div className="font-extrabold text-amber-300 text-sm">{generatedBrief.deadline}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <div className="text-slate-400 text-[11px] font-bold uppercase">Licensing</div>
                      <div className="font-extrabold text-emerald-400 text-xs">Full Rights Cleared</div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-200 bg-black/50 p-5 rounded-2xl border border-white/10 leading-relaxed font-medium">
                    {generatedBrief.description}
                  </div>

                  <div className="flex justify-end gap-4 pt-3">
                    <button
                      onClick={handlePublishBrief}
                      className="btn-primary py-3.5 px-8 text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 font-extrabold shadow-xl rounded-2xl"
                    >
                      Publish Brief to 50 Creators Live →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Published Briefs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white">Published Briefs ({publishedBriefs.length})</h3>
              <div className="space-y-4">
                {publishedBriefs.slice(0, 10).map((b) => (
                  <div key={b.id} className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                    <div className="space-y-1">
                      <div className="font-extrabold text-white text-base">{b.title}</div>
                      <div className="text-xs text-slate-400 font-semibold">{b.contentType} • {b.budget} • {b.applicantsCount} Applicants</div>
                    </div>
                    <span className="badge badge-cyan text-xs px-3 py-1 font-extrabold">{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: MESSAGES TAB WITH SPACIOUS CHAT LAYOUT */}
        {activeTab === 'messages' && (
          <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] shadow-2xl p-0">
            <div className="lg:col-span-4 border-r border-white/10 bg-slate-950/90 p-8 space-y-6">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
                Creator Messages (2 Threads)
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 shadow-md space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-white">Elena Rostova</span>
                    <span className="text-xs font-mono text-purple-300">Just now</span>
                  </div>
                  <div className="text-xs text-purple-200 font-mono font-bold">@elena_ai</div>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-medium">
                    "Thank you for selecting me for the Sora commercial brief! Work initiated on draft 1."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 p-10 flex flex-col justify-between bg-[#080b11] min-h-[550px]">
              <div className="pb-6 border-b border-white/15 flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <div className="font-extrabold text-xl text-white">Elena Rostova</div>
                  <div className="text-sm text-purple-300 font-mono font-bold">@elena_ai</div>
                </div>
                <span className="badge badge-verified text-xs px-4 py-1.5">Master AI Filmmaker</span>
              </div>

              <div className="py-6 my-auto space-y-6 overflow-y-auto max-h-[360px] flex-1">
                <div className="bg-gradient-to-r from-purple-950/90 to-indigo-950/80 p-8 rounded-3xl max-w-2xl text-sm sm:text-base text-slate-100 leading-relaxed border border-purple-500/50 shadow-2xl space-y-4">
                  <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-2 pb-3 border-b border-purple-500/40">
                    <CheckCircle className="w-5 h-5 text-emerald-400" /> Active Campaign Selection Dispatched
                  </div>
                  <p className="text-slate-100 font-medium leading-relaxed">
                    You selected Elena Rostova (@elena_ai) for your campaign brief. Direct automated notice sent to Creator Messages inbox.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-white/15 mt-6">
                <input
                  type="text"
                  className="form-input text-sm mb-0 flex-1 py-4 px-6 rounded-2xl"
                  placeholder="Send message to @elena_ai regarding contract or project delivery..."
                />
                <button className="btn-primary py-4 px-8 text-sm font-extrabold shrink-0 rounded-2xl shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
