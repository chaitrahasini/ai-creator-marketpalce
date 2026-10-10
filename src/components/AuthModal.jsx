import React, { useState } from 'react';
import { Sparkles, User, Briefcase, Mail, Lock, AtSign, CheckCircle2, AlertCircle, X, Shield, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup', initialRole = 'creator', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState(initialRole); // 'creator' | 'brand'
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    companyOrTitle: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    // Validate Username (Mandatory for dashboard display)
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required (e.g. @alex_ai)';
    } else if (!formData.username.startsWith('@')) {
      newErrors.username = 'Username must start with @ (e.g. @creative_mind)';
    }

    // Email validation (Strict check ensuring @ and standard domain like gmail.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address ending with @gmail.com or valid domain';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = role === 'creator' ? 'Creator Name is required' : 'Brand / Company Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userObj = {
      id: `user-${Date.now()}`,
      name: formData.name || (role === 'creator' ? 'AI Creator Pro' : 'Brand Studio'),
      username: formData.username.startsWith('@') ? formData.username : `@${formData.username}`,
      email: formData.email,
      role: role, // 'creator' or 'brand'
      companyOrTitle: formData.companyOrTitle || (role === 'creator' ? 'Master Generative Artist' : 'Marketing & Creative Agency'),
      avatar: role === 'creator' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' 
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      createdAt: new Date().toISOString()
    };

    onAuthSuccess(userObj);
    onClose();
  };

  const fillDemoAccount = (demoRole) => {
    if (demoRole === 'creator') {
      setRole('creator');
      setFormData({
        name: 'Elena Rostova',
        username: '@elena_ai',
        email: 'elena.ai.creator@gmail.com',
        password: 'password123',
        companyOrTitle: 'Master AI Filmmaker & VFX Specialist'
      });
    } else {
      setRole('brand');
      setFormData({
        name: 'Aura Tech Brand Studios',
        username: '@auratech_brand',
        email: 'marketing.auratech@gmail.com',
        password: 'password123',
        companyOrTitle: 'Global Creative Marketing Director'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container with Left Side Form Design */}
      <div className="relative w-full max-w-4xl bg-[#0f1422] border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Role Selector & Auth Form (As requested: Left side login/signup) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#0b0e18] border-r border-white/10">
          <div>
            {/* Header Title */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
                AI Marketplace Authentication
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Connect with top GenAI creators & brands on NexusAI.
            </p>

            {/* SEPARATE CREATOR / BRAND TOGGLE (Explicit Requirement #2) */}
            <div className="mb-5 bg-slate-900/90 p-1 rounded-xl border border-white/10 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  role === 'creator'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4 text-cyan-300" />
                AI Creator Account
              </button>

              <button
                type="button"
                onClick={() => setRole('brand')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  role === 'brand'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Briefcase className="w-4 h-4 text-amber-300" />
                Brand / Agency Account
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="form-label">
                    {role === 'creator' ? 'Creator Full Name' : 'Brand / Company Name'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-input pl-10"
                      placeholder={role === 'creator' ? 'e.g. Elena Rostova' : 'e.g. Aura Tech Global'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                  {errors.name && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
              )}

              {/* USERNAME FIELD (Explicit Requirement #5: Username login & displayed on dashboard) */}
              <div>
                <label className="form-label flex justify-between">
                  <span>Username (Displayed on Dashboard)</span>
                  <span className="text-[10px] text-indigo-400">Must start with @</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-input pl-10 font-mono text-indigo-300"
                    placeholder={role === 'creator' ? '@alex_ai' : '@nike_creative'}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                  <AtSign className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                </div>
                {errors.username && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.username}</p>}
              </div>

              {/* EMAIL FIELD (Explicit Requirement #3: Email proper way ending in @gmail.com or valid domain) */}
              <div>
                <label className="form-label flex justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-emerald-400">Valid format (@gmail.com)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="form-input pl-10"
                    placeholder="creator@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
                {errors.email && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="form-input pl-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
                {errors.password && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 justify-center text-sm font-bold shadow-lg shadow-indigo-600/30 mt-2"
              >
                {mode === 'login' ? `Log In as ${role === 'creator' ? 'AI Creator' : 'Brand'}` : `Create ${role === 'creator' ? 'Creator' : 'Brand'} Account`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Toggle Login vs Signup */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              {mode === 'login' ? "Don't have an account?" : "Already registered?"}
            </span>
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrors({});
              }}
              className="text-indigo-400 hover:text-indigo-300 font-bold underline"
            >
              {mode === 'login' ? 'Sign Up Now' : 'Log In Here'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Feature Highlights & Quick Fill Demo Buttons */}
        <div className="hidden md:col-span-5 p-6 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-[#0f1422] p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 border border-indigo-500/30">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Verified AI Marketplace
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              {role === 'creator' ? 'For AI Creators & Filmmakers' : 'For Brands & Creative Agencies'}
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Showcase video portfolios with Sora, Runway, Midjourney & ComfyUI workflows.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified ratings and commercial licensing badges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>AI-Assisted Brief generator & direct escrow contracts.</span>
              </li>
            </ul>
          </div>

          {/* DEMO ONE-CLICK FILL BUTTONS */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              ⚡ Quick Demo One-Click Login
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('creator')}
                className="w-full text-left text-xs bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl p-2.5 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-indigo-300 flex items-center gap-1">
                    Demo Creator: @elena_ai
                  </div>
                  <div className="text-[10px] text-slate-400">elena.ai.creator@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                  Load
                </span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('brand')}
                className="w-full text-left text-xs bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl p-2.5 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-purple-300 flex items-center gap-1">
                    Demo Brand: @auratech_brand
                  </div>
                  <div className="text-[10px] text-slate-400">marketing.auratech@gmail.com</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                  Load
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
