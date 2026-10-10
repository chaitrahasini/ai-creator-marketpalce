import React, { useState } from 'react';
import { 
  User, LayoutDashboard, Film, Award, Cpu, Briefcase, MessageSquare, Settings, 
  Plus, Star, DollarSign, ShieldCheck, Eye, ArrowUpRight, Send, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function CreatorDashboard({ 
  currentUser, 
  creatorsList, 
  briefsList, 
  selectionMessages = [], 
  onOpenAIQualityModal 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const myProfileData = creatorsList.find(c => c.username === currentUser.username) || creatorsList[0];

  const [portfolioItems, setPortfolioItems] = useState(myProfileData.portfolio || []);
  const [newProject, setNewProject] = useState({
    title: '',
    type: 'AI Commercial Video',
    toolsUsed: 'Runway Gen-3, Midjourney v6',
    promptSnippet: '',
    aspectRatio: '16:9',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    description: ''
  });
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Combine initial demo messages with live brand selection notifications
  const allMessages = [
    ...selectionMessages,
    { id: 'demo-1', sender: 'Aura Tech Brand Studios', username: '@auratech_brand', time: '10:42 AM', text: 'Hi! We loved your Sora hypercar video. Are you available for a 30s cyber-themed spot?', unread: true },
    { id: 'demo-2', sender: 'Luxe Vibe Fashion', username: '@luxevibe_brand', time: 'Yesterday', text: 'Your Midjourney v6 key art proposal has been accepted! Please check contract terms.', unread: false }
  ];

  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [customMessages, setCustomMessages] = useState(allMessages);

  const [settingsForm, setSettingsForm] = useState({
    name: currentUser.name || myProfileData.name,
    username: currentUser.username || myProfileData.username,
    email: currentUser.email || myProfileData.email,
    title: myProfileData.title,
    bio: myProfileData.bio,
    hourlyRate: myProfileData.hourlyRate,
    location: myProfileData.location
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    const createdItem = {
      id: `port-custom-${Date.now()}`,
      title: newProject.title || 'Untitled AI Generation',
      image: newProject.image,
      type: newProject.type,
      toolsUsed: newProject.toolsUsed.split(',').map(t => t.trim()),
      promptSnippet: newProject.promptSnippet || 'Custom prompt lineage verified.',
      aspectRatio: newProject.aspectRatio,
      renderTime: '1.8 hrs',
      aiQualityScore: 96,
      licensing: 'Full Commercial License',
      description: newProject.description || 'Generative AI artwork with verified prompt structure.'
    };

    setPortfolioItems([createdItem, ...portfolioItems]);
    setShowAddProjectModal(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: currentUser.name,
      username: currentUser.username,
      time: 'Just now',
      text: chatInput,
      isMe: true
    };
    setCustomMessages([...customMessages, newMsg]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR WITH EXPLICIT PADDING AND FLEX BOX LAYOUT */}
      <aside 
        className="bg-[#0f1422] border-r border-white/10 p-7 shrink-0 flex flex-col justify-between"
        style={{ width: '310px', flexShrink: 0 }}
      >
        <div className="space-y-8">
          {/* USER WELCOME CARD */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/90 to-purple-950/60 border border-indigo-500/40 mb-8 shadow-xl">
            <div className="flex items-center gap-4">
              <img 
                src={currentUser.avatar || myProfileData.avatar} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
              />
              <div className="overflow-hidden space-y-1">
                <div className="text-base font-extrabold text-white truncate">{currentUser.name}</div>
                <div className="text-xs font-mono text-cyan-300 truncate font-bold">{currentUser.username}</div>
                <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Creator Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* DASHBOARD NAV BUTTONS WITH GENEROUS SPACING */}
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`nav-item-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                Overview
              </span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`nav-item-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Film className="w-4 h-4 text-purple-400" />
                The Portfolio
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 font-mono font-extrabold">{portfolioItems.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`nav-item-btn ${activeTab === 'experience' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Award className="w-4 h-4 text-amber-400" />
                Experience
              </span>
            </button>

            <button
              onClick={() => setActiveTab('expertise')}
              className={`nav-item-btn ${activeTab === 'expertise' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Expertise In
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`nav-item-btn ${activeTab === 'projects' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Projects & Briefs
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-extrabold">5 Active</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`nav-item-btn ${activeTab === 'messages' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <MessageSquare className="w-4 h-4 text-pink-400" />
                Messages
              </span>
              {selectionMessages.length > 0 && (
                <span className="text-[10px] px-3 py-1 rounded-full bg-pink-500 text-white font-extrabold animate-pulse">
                  {selectionMessages.length} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3.5">
                <Settings className="w-4 h-4 text-slate-400" />
                Profile Settings
              </span>
            </button>
          </div>
        </div>

        {/* AI Inspector Button */}
        <div className="pt-8 border-t border-white/10 mt-8">
          <button
            onClick={onOpenAIQualityModal}
            className="w-full btn-outline-glow text-xs py-3.5 px-4 justify-center text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 font-extrabold"
          >
            <ShieldCheck className="w-4 h-4" /> AI Quality Inspector
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA WITH SPACIOUS PADDING & GAPS */}
      <main className="flex-1 p-8 lg:p-14 overflow-y-auto space-y-10">
        
        {/* HEADER WELCOME BANNER WITH TOP SPACING */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Welcome back, <span className="text-indigo-400 font-mono">{currentUser.username}</span>! 🚀
            </h1>
            <p className="text-sm text-slate-300 font-semibold">
              Creator Dashboard • Managing your AI Portfolio, Bids & Brand Selection Notices
            </p>
          </div>

          <button
            onClick={() => setShowAddProjectModal(true)}
            className="btn-primary text-xs py-3.5 px-6 shadow-xl shadow-indigo-600/30 font-bold shrink-0"
          >
            <Plus className="w-4 h-4" /> Add AI Work to Portfolio
          </button>
        </div>

        {/* BRAND SELECTION NOTIFICATION ALERT WITH SPACIOUS MARGINS */}
        {selectionMessages.length > 0 && (
          <div className="glass-panel-glow p-8 rounded-3xl border border-indigo-500/50 space-y-4 animate-fade-in shadow-2xl my-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
                <h3 className="font-extrabold text-white text-lg">
                  🎉 Brand Selection Notification Received!
                </h3>
              </div>
              <button 
                onClick={() => setActiveTab('messages')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-extrabold underline"
              >
                Open Messages Inbox →
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-black/30 p-5 rounded-2xl border border-white/10">
              {selectionMessages[0].text}
            </p>
          </div>
        )}

        {/* SECTION 1: OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Total Earnings</span>
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">$18,450</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-3 font-bold">
                  <ArrowUpRight className="w-4 h-4" /> +24% vs last month
                </div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Creator Rating</span>
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">{myProfileData.rating} / 5.0</div>
                <div className="text-xs text-slate-300 font-medium mt-3">
                  Based on {myProfileData.reviewCount} client reviews
                </div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Completed Briefs</span>
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">{myProfileData.projectsCompleted}</div>
                <div className="text-xs text-cyan-300 mt-3 font-bold">
                  100% On-Time Delivery Rate
                </div>
              </div>

              <div className="glass-panel p-7 rounded-3xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Profile Visits</span>
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-heading">1,420</div>
                <div className="text-xs text-purple-300 mt-3 font-bold">
                  48 Brand Profile Searches
                </div>
              </div>
            </div>

            {/* Recommended Briefs */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-indigo-400" /> Recommended Brand Briefs for You
                </h3>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-extrabold"
                >
                  View All Briefs ({briefsList.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {briefsList.slice(0, 4).map((brief) => (
                  <div key={brief.id} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 shadow-xl">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-extrabold text-indigo-300 bg-indigo-500/20 px-4 py-1.5 rounded-xl border border-indigo-500/30">
                          {brief.brandName}
                        </span>
                        <span className="text-sm font-extrabold text-emerald-400 font-mono">
                          {brief.budget}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-white text-xl mb-3">{brief.title}</h4>
                      <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">{brief.description}</p>
                    </div>

                    <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-semibold">Tools: {brief.toolsRequired.join(', ')}</span>
                      <button className="btn-outline-glow py-2 px-5 text-xs font-bold">
                        Submit Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: THE PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Your AI Creative Portfolio</h2>
                <p className="text-sm text-slate-300 font-semibold mt-2">Showcase your AI videos, prompt recipes, and tool workflows to brands.</p>
              </div>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="btn-primary text-xs py-3.5 px-6 font-bold"
              >
                <Plus className="w-4 h-4" /> Add AI Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div key={item.id} className="glass-panel p-7 rounded-3xl border border-white/10 flex flex-col justify-between space-y-5 shadow-xl">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video group">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5" /> Score: {item.aiQualityScore}/100
                      </div>
                    </div>

                    <h4 className="font-extrabold text-white text-xl mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {item.toolsUsed.map((tool, idx) => (
                        <span key={idx} className="badge badge-tool text-[10px] font-bold">{tool}</span>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl text-[11px] font-mono text-indigo-300 italic mb-3 leading-relaxed border border-white/5">
                      "{item.promptSnippet}"
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10 text-slate-300 font-semibold">
                    <span>{item.aspectRatio} • {item.renderTime}</span>
                    <span className="text-emerald-400 font-extrabold">{item.licensing}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <h2 className="text-3xl font-extrabold text-white mb-4">Experience & Industry Track Record</h2>
            <div className="space-y-6">
              {myProfileData.experience.map((exp, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-indigo-300 text-xl">{exp.role}</h3>
                    <span className="text-xs text-slate-300 font-mono font-bold px-4 py-1.5 rounded-xl bg-white/10">{exp.year}</span>
                  </div>
                  <div className="text-base font-bold text-white">{exp.company}</div>
                  <p className="text-sm text-slate-300 leading-relaxed">{exp.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: EXPERTISE IN TAB */}
        {activeTab === 'expertise' && (
          <div className="space-y-10 animate-fade-in max-w-4xl">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Generative AI Expertise & Stack</h2>
              <p className="text-sm text-slate-300 font-semibold mb-8">Tools, workflows, and specializations verified for your profile.</p>

              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-5">
                AI Models & Tools Stack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {myProfileData.tools.map((tool, idx) => (
                  <div key={idx} className="glass-panel p-7 rounded-2xl border border-indigo-500/30 flex items-center gap-4">
                    <Cpu className="w-8 h-8 text-cyan-400 shrink-0" />
                    <div>
                      <div className="font-extrabold text-sm text-white">{tool}</div>
                      <div className="text-[11px] text-emerald-400 font-bold mt-1">Mastery: 98%</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-5">
                Specialized Production Skills
              </h3>
              <div className="flex flex-wrap gap-4">
                {myProfileData.skills.map((skill, idx) => (
                  <span key={idx} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-indigo-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: PROJECTS / BRIEFS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-white mb-6">Active Brand Briefs & Contracts</h2>

            <div className="grid grid-cols-1 gap-8">
              {briefsList.slice(0, 8).map((brief) => (
                <div key={brief.id} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-extrabold text-indigo-300 bg-indigo-500/20 px-4 py-1.5 rounded-xl border border-indigo-500/30">
                        {brief.brandName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Posted {brief.createdAt}</span>
                    </div>
                    <h3 className="font-extrabold text-white text-2xl">{brief.title}</h3>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">{brief.description}</p>
                  </div>

                  <div className="flex items-center gap-8 shrink-0 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-emerald-400 font-mono">{brief.budget}</div>
                      <div className="text-xs text-slate-400 font-bold mt-1">{brief.applicantsCount} Applicants</div>
                    </div>
                    <button className="btn-primary text-xs py-3.5 px-6 font-bold">
                      Submit Proposal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: MESSAGES TAB WITH EXTRA SPACIOUS & UNCLUTTERED LAYOUT */}
        {activeTab === 'messages' && (
          <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] shadow-2xl p-0">
            
            {/* Left Contacts List */}
            <div className="lg:col-span-4 border-r border-white/10 bg-slate-950/90 p-8 space-y-6">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Brand Inbox</span>
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-mono text-xs">{customMessages.length} Messages</span>
              </h3>
              
              <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2">
                {customMessages.map((msg, idx) => (
                  <button
                    key={msg.id}
                    onClick={() => setActiveChatIndex(idx)}
                    className={`w-full text-left p-5 rounded-2xl transition-all space-y-2 ${
                      activeChatIndex === idx 
                        ? 'bg-gradient-to-r from-indigo-600/40 to-purple-600/30 border border-indigo-500/60 shadow-lg scale-[1.01]' 
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-white flex items-center gap-2">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{msg.time}</span>
                    </div>
                    {msg.isSelectionNotice && (
                      <span className="inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ⚡ SELECTED CREATOR
                      </span>
                    )}
                    <p className="text-xs sm:text-sm text-slate-300 truncate leading-relaxed font-medium">{msg.text}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Active Conversation Area */}
            <div className="lg:col-span-8 p-8 md:p-10 flex flex-col justify-between bg-[#080b11] min-h-[580px]">
              <div className="pb-6 border-b border-white/15 flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <div className="font-extrabold text-xl text-white tracking-wide">{customMessages[activeChatIndex]?.sender}</div>
                  <div className="text-sm text-indigo-300 font-mono font-extrabold">{customMessages[activeChatIndex]?.username}</div>
                </div>
                <span className="badge badge-verified text-xs px-4 py-1.5 shadow-md">Verified Brand Studio</span>
              </div>

              {/* Message Content Area with generous vertical space & card margins */}
              <div className="py-6 my-auto space-y-6 overflow-y-auto max-h-[380px] flex-1">
                <div className="bg-gradient-to-r from-indigo-950/90 to-purple-950/80 p-8 rounded-3xl max-w-2xl text-sm sm:text-base text-slate-100 leading-relaxed border border-indigo-500/50 shadow-2xl space-y-4">
                  <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2 pb-3 border-b border-indigo-500/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Official Brand Campaign Selection Notice
                  </div>
                  <p className="text-slate-100 font-medium leading-relaxed">{customMessages[activeChatIndex]?.text}</p>
                  <div className="pt-3 border-t border-indigo-500/30 flex items-center gap-4 text-xs text-indigo-300 font-mono">
                    <span>Status: Accepted for Campaign</span> • <span>Budget Cleared</span>
                  </div>
                </div>
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-4 pt-6 border-t border-white/15 mt-6 items-center">
                <input
                  type="text"
                  className="form-input text-sm mb-0 flex-1 py-4 px-6 rounded-2xl"
                  placeholder="Reply to brand or confirm campaign project details..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" className="btn-primary py-4 px-8 text-sm font-extrabold shrink-0 rounded-2xl shadow-xl">
                  <Send className="w-4 h-4" /> Send Reply
                </button>
              </form>
            </div>

          </div>
        )}

        {/* SECTION 7: PROFILE SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-3xl">
            <h2 className="text-3xl font-extrabold text-white mb-6">Creator Profile Settings</h2>

            <form onSubmit={(e) => { e.preventDefault(); alert("Profile settings saved successfully!"); }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input text-sm"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Username (Displayed on Dashboard)</label>
                  <input
                    type="text"
                    className="form-input text-sm font-mono text-indigo-300"
                    value={settingsForm.username}
                    onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input text-sm"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Creator Title / Tagline</label>
                <input
                  type="text"
                  className="form-input text-sm"
                  value={settingsForm.title}
                  onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Bio & Work Overview</label>
                <textarea
                  className="form-input text-sm h-32 resize-none"
                  value={settingsForm.bio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary text-sm py-3.5 px-8">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

      </main>

      {/* ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c111d] border border-white/10 rounded-3xl p-8 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Add AI Work to Portfolio</h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Cyberpunk Commercial"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">AI Tools Used</label>
                <input
                  type="text"
                  className="form-input font-mono"
                  placeholder="e.g. Sora, Runway Gen-3, Midjourney v6"
                  value={newProject.toolsUsed}
                  onChange={(e) => setNewProject({ ...newProject, toolsUsed: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Generative Prompt Snippet</label>
                <textarea
                  className="form-input font-mono h-20 resize-none"
                  placeholder="Prompt recipe..."
                  value={newProject.promptSnippet}
                  onChange={(e) => setNewProject({ ...newProject, promptSnippet: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="btn-secondary py-2.5 px-5"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2.5 px-5">
                  Add to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
