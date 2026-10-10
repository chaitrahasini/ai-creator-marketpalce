import React from 'react';
import { 
  Sparkles, ShieldCheck, ArrowRight, Star, Search, Briefcase, Zap, 
  User, Lock 
} from 'lucide-react';

export default function LandingPage({ 
  creatorsList, 
  briefsList, 
  onSelectCreator, 
  onNavigate, 
  onOpenAIQualityModal,
  currentUser 
}) {
  const handleCreatorClick = (creator) => {
    if (!currentUser) {
      alert("🔒 Please log in or sign up to view full AI creator profiles and prompt portfolios!");
      onNavigate('auth-brand');
    } else {
      onSelectCreator(creator);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col justify-between animate-fade-in">
      
      {/* PERFECTLY CENTER-ALIGNED HERO SECTION WITH LARGE & CLEAR TYPOGRAPHY */}
      <section className="relative w-full max-w-5xl mx-auto px-6 pt-20 pb-28 min-h-[82vh] flex flex-col items-center justify-center text-center">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-r from-indigo-600/25 via-purple-600/25 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center space-y-10">
          
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 text-sm font-extrabold tracking-wide shadow-md">
            <Zap className="w-4.5 h-4.5 text-amber-400" />
            The AI Content Creator Marketplace
          </div>

          {/* Large Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto font-heading">
            Connect with World-Class <br />
            <span className="gradient-text">AI Filmmakers & Artists</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-semibold">
            Discover 50+ verified prompt artists, publish structured creative briefs, inspect OpenAI Sora & Runway Gen-3 workflows, and manage commercial licensing.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <button
              onClick={() => onNavigate(currentUser ? (currentUser.role === 'creator' ? 'creator-dashboard' : 'brand-dashboard') : 'auth-creator')}
              className="btn-primary py-4 px-8 text-base font-extrabold shadow-2xl shadow-indigo-600/40 flex items-center gap-3"
            >
              <User className="w-5 h-5 text-cyan-300" /> {currentUser ? 'My Creator Dashboard' : 'Join as AI Creator'}
            </button>

            <button
              onClick={() => onNavigate(currentUser ? (currentUser.role === 'brand' ? 'brand-dashboard' : 'creator-dashboard') : 'auth-brand')}
              className="btn-secondary py-4 px-8 text-base font-extrabold bg-white/15 hover:bg-white/20 border-white/30 flex items-center gap-3"
            >
              <Briefcase className="w-5 h-5 text-purple-300" /> {currentUser ? 'My Brand Dashboard' : 'Post Brief as Brand'}
            </button>

            <button
              onClick={onOpenAIQualityModal}
              className="btn-outline-glow py-4 px-8 text-base font-extrabold text-emerald-400 border-emerald-500/50"
            >
              <ShieldCheck className="w-5 h-5" /> AI Quality Inspector
            </button>
          </div>

          {/* Stats Ticker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 w-full max-w-3xl mx-auto">
            <div className="glass-panel p-7 rounded-3xl border border-white/15 flex flex-col items-center justify-center shadow-xl">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-400 font-heading">50</div>
              <div className="text-xs sm:text-sm text-slate-300 font-extrabold uppercase tracking-wider mt-2">Verified AI Creators</div>
            </div>

            <div className="glass-panel p-7 rounded-3xl border border-white/15 flex flex-col items-center justify-center shadow-xl">
              <div className="text-4xl sm:text-5xl font-extrabold text-purple-400 font-heading">50</div>
              <div className="text-xs sm:text-sm text-slate-300 font-extrabold uppercase tracking-wider mt-2">Active Brand Briefs</div>
            </div>

            <div className="glass-panel p-7 rounded-3xl border border-white/15 flex flex-col items-center justify-center shadow-xl">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-heading">98.4%</div>
              <div className="text-xs sm:text-sm text-slate-300 font-extrabold uppercase tracking-wider mt-2">Quality Clearance</div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED CREATORS SHOWCASE */}
      <section className="px-6 lg:px-14 py-20 max-w-7xl mx-auto w-full border-t border-white/10 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">Verified AI Creators</h2>
              {!currentUser && (
                <span className="badge badge-purple text-xs flex items-center gap-1.5 px-3 py-1">
                  <Lock className="w-3.5 h-3.5" /> Login Required to Access
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {currentUser 
                ? 'Top-rated generative artists with verified toolstacks & prompt lineage.' 
                : 'Log in to your Creator or Brand account to inspect full creator profiles and portfolios.'}
            </p>
          </div>

          <button
            onClick={() => {
              if (!currentUser) {
                onNavigate('auth-brand');
              } else {
                onNavigate('discover-creators');
              }
            }}
            className="text-sm font-extrabold text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
          >
            {currentUser ? 'Explore All 50 Creators →' : 'Log In to Access Profiles →'}
          </button>
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creatorsList.slice(0, 6).map((creator) => (
            <div 
              key={creator.id}
              onClick={() => handleCreatorClick(creator)}
              className="glass-panel p-7 rounded-3xl border border-white/15 hover:border-indigo-500/50 cursor-pointer transition-all flex flex-col justify-between group space-y-5 shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="font-extrabold text-white text-lg flex items-center gap-2">
                        {creator.name}
                        {creator.verified && <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />}
                      </div>
                      <div className="text-sm font-mono text-indigo-300 font-bold mt-0.5">{creator.username}</div>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-amber-400 flex items-center gap-1 bg-amber-400/15 px-3 py-1 rounded-xl border border-amber-400/30">
                    <Star className="w-4 h-4 fill-amber-400" /> {creator.rating}
                  </span>
                </div>

                <p className="text-sm text-cyan-300 font-extrabold mb-2">{creator.title}</p>
                
                {currentUser ? (
                  <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed">{creator.bio}</p>
                ) : (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 text-xs font-semibold text-indigo-300 flex items-center gap-2.5 mb-4">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Log in to view full bio, prompt recipes & hourly rates.</span>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {creator.tools.slice(0, 3).map((tool, idx) => (
                    <span key={idx} className="badge badge-tool text-xs font-extrabold">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="font-extrabold text-emerald-400 text-base">${creator.hourlyRate}/hr</span>
                <span className="text-indigo-400 font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {currentUser ? 'Inspect Portfolio →' : 'Log In to View →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BRIEFS SHOWCASE */}
      <section className="px-6 lg:px-14 py-20 max-w-7xl mx-auto w-full border-t border-white/10 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">Active Brand Briefs</h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium">Open commercial briefs from fashion, tech & automotive agencies.</p>
          </div>
          <button
            onClick={() => onNavigate('discover-briefs')}
            className="text-sm font-extrabold text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            Browse All 50 Briefs <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {briefsList.slice(0, 4).map((brief) => (
            <div key={brief.id} className="glass-panel p-7 rounded-3xl border border-white/15 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-5 shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-purple-300 bg-purple-500/25 px-3.5 py-1.5 rounded-xl border border-purple-500/40">
                    {brief.brandName}
                  </span>
                  <span className="text-base font-mono font-extrabold text-emerald-400">
                    {brief.budget}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-xl mb-2">{brief.title}</h3>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-2">{brief.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm text-slate-300 font-semibold">
                <span>Tools: {brief.toolsRequired.join(', ')}</span>
                <button 
                  onClick={() => {
                    if (!currentUser) onNavigate('auth-creator');
                    else alert(`Proposal submitted for '${brief.title}'!`);
                  }}
                  className="btn-outline-glow py-2 px-5 text-xs font-extrabold"
                >
                  {currentUser ? 'Submit Proposal' : 'Log In to Submit'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06080e] border-t border-white/10 py-14 px-6 lg:px-14 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <span className="font-heading font-extrabold text-white text-xl">NexusAI Marketplace</span>
            </div>
            <div className="text-sm text-slate-300 font-semibold">
              AI Content Creator Marketplace • Connecting AI Creators with Brands & Agencies
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-6 border-t border-white/5">
            © 2026 NexusAI Marketplace Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
