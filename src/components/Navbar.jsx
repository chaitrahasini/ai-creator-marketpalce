import React from 'react';
import { Sparkles, Search, ShieldCheck, User, LogOut, Briefcase, Zap } from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onLogout, 
  onNavigate, 
  activeTab, 
  onOpenAIQualityModal,
  onToggleDemoRole
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#080b11]/95 backdrop-blur-xl border-b border-white/10 px-8 lg:px-14 py-4 flex items-center justify-between transition-all">
      
      {/* Brand Logo - Bold & Clear */}
      <div 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-4 cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#080b11] rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-2xl lg:text-3xl tracking-tight text-white">
              Nexus<span className="text-indigo-400">AI</span>
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Marketplace
            </span>
          </div>
          <p className="text-xs text-slate-300 font-semibold hidden sm:block tracking-wide">
            Generative Creator & Brand Platform
          </p>
        </div>
      </div>

      {/* Center Nav Links - Prominent Font Sizes */}
      <nav className="hidden lg:flex items-center gap-2 bg-white/[0.05] p-2 rounded-2xl border border-white/15">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
            activeTab === 'landing' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40' 
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
        >
          Explore Home
        </button>

        <button
          onClick={() => onNavigate('discover-creators')}
          className={`px-5 py-2.5 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'discover-creators' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40' 
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Search className="w-4 h-4 text-cyan-400" />
          Browse AI Creators (50)
        </button>

        <button
          onClick={() => onNavigate('discover-briefs')}
          className={`px-5 py-2.5 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'discover-briefs' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40' 
              : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
        >
          <Briefcase className="w-4 h-4 text-purple-400" />
          Brand Briefs (50)
        </button>

        <button
          onClick={onOpenAIQualityModal}
          className="px-5 py-2.5 rounded-xl text-sm font-extrabold text-emerald-400 hover:bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-2 transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          AI Inspector
        </button>
      </nav>

      {/* Right Side Action Triggers */}
      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDemoRole}
              className="hidden xl:flex items-center gap-2 text-xs font-extrabold px-3.5 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/25 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Switch View
            </button>

            <button
              onClick={() => onNavigate(currentUser.role === 'creator' ? 'creator-dashboard' : 'brand-dashboard')}
              className="flex items-center gap-3 bg-slate-900 border border-indigo-500/50 text-white px-4 py-2.5 rounded-2xl transition-all shadow-md"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-extrabold text-xs text-white uppercase shadow-sm">
                {currentUser.username ? currentUser.username.replace('@', '').charAt(0) : 'U'}
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  {currentUser.name}
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-xs text-cyan-300 font-mono font-bold">
                  {currentUser.username}
                </div>
              </div>
            </button>

            <button
              onClick={onLogout}
              className="p-3 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('auth-creator')}
              className="px-5 py-2.5 rounded-xl text-sm font-extrabold text-slate-100 hover:text-white hover:bg-white/10 border border-white/20 transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4 text-cyan-400" /> Creator Sign In
            </button>
            <button
              onClick={() => onNavigate('auth-brand')}
              className="btn-primary py-2.5 px-5 text-sm font-extrabold rounded-xl flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/35"
            >
              <Briefcase className="w-4 h-4 text-amber-300" /> Brand Sign In
            </button>
          </div>
        )}
      </div>

    </header>
  );
}
