import React, { useState } from 'react';
import { 
  Sparkles, User, Briefcase, Mail, Lock, AtSign, ArrowLeft, 
  AlertCircle, Shield, ArrowRight 
} from 'lucide-react';

export default function AuthPage({ 
  initialRole = 'creator', 
  initialMode = 'signup', 
  onAuthSuccess, 
  onNavigate 
}) {
  const [role, setRole] = useState(initialRole); // 'creator' | 'brand'
  const [mode, setMode] = useState(initialMode); // 'signup' | 'login'
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!formData.username.startsWith('@')) {
      newErrors.username = 'Username must start with @ (e.g. @creative_mind)';
    }

    // Email validation
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
      newErrors.name = role === 'creator' ? 'Creator Name is required' : 'Brand Name is required';
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
      role: role,
      avatar: role === 'creator' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' 
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      createdAt: new Date().toISOString()
    };

    onAuthSuccess(userObj);
  };

  const fillDemoAccount = (demoRole) => {
    if (demoRole === 'creator') {
      setRole('creator');
      setFormData({
        name: 'Elena Rostova',
        username: '@elena_ai',
        email: 'elena.ai.creator@gmail.com',
        password: 'password123'
      });
    } else {
      setRole('brand');
      setFormData({
        name: 'Aura Tech Brand Studios',
        username: '@auratech_brand',
        email: 'marketing.auratech@gmail.com',
        password: 'password123'
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col justify-center items-center p-6 lg:p-12 animate-fade-in relative overflow-hidden"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px'
      }}
    >
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* CENTERED CONTAINER */}
      <div 
        className="w-full max-w-xl mx-auto space-y-6 relative z-10"
        style={{ width: '100%', maxWidth: '580px', margin: '0 auto' }}
      >
        
        {/* Top Header Navigation Bar with Explicit Margins */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home Page
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-heading font-extrabold text-white text-base">NexusAI Marketplace</span>
          </div>
        </div>

        {/* CLEAN, SPACIOUS, PERFECTLY CENTERED AUTH CARD */}
        <div 
          className="glass-panel-glow rounded-3xl border border-indigo-500/30 shadow-2xl"
          style={{
            padding: '36px 32px',
            background: 'linear-gradient(135deg, rgba(25, 22, 60, 0.7) 0%, rgba(15, 21, 35, 0.95) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        >
          
          {/* Header Title */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Authentication Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
              {mode === 'signup' ? `Create ${role === 'creator' ? 'AI Creator' : 'Brand'} Account` : `Log In as ${role === 'creator' ? 'AI Creator' : 'Brand'}`}
            </h2>
            <p className="text-xs text-slate-400">
              Access your personalized dashboard with verified username display.
            </p>
          </div>

          {/* SEPARATE CREATOR / BRAND TOGGLE */}
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => setRole('creator')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                role === 'creator'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4 text-cyan-300" />
              AI Creator Account
            </button>

            <button
              type="button"
              onClick={() => setRole('brand')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                role === 'brand'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-300" />
              Brand / Agency Account
            </button>
          </div>

          {/* FORM WITH GUARANTEED INPUT PADDING AND NO ICON OVERLAP */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="form-label mb-2">
                  {role === 'creator' ? 'Creator Full Name' : 'Brand / Company Name'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-input text-sm"
                    style={{ paddingLeft: '44px', marginBottom: '0px' }}
                    placeholder={role === 'creator' ? 'Elena Rostova' : 'Aura Tech Global'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
                </div>
                {errors.name && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>
            )}

            {/* USERNAME FIELD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label mb-0">Username (Displayed on Dashboard)</label>
                <span className="text-[10px] text-indigo-400 font-semibold">Must start with @</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="form-input text-sm font-mono text-indigo-300"
                  style={{ paddingLeft: '44px', marginBottom: '0px' }}
                  placeholder={role === 'creator' ? '@elena_ai' : '@auratech_brand'}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <AtSign className="w-4 h-4 text-indigo-400 absolute left-4 top-3.5 pointer-events-none" />
              </div>
              {errors.username && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.username}</p>}
            </div>

            {/* EMAIL FIELD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label mb-0">Email Address</label>
                <span className="text-[10px] text-emerald-400 font-semibold">Format: user@gmail.com</span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  className="form-input text-sm"
                  style={{ paddingLeft: '44px', marginBottom: '0px' }}
                  placeholder="user@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              </div>
              {errors.email && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label className="form-label mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="form-input text-sm"
                  style={{ paddingLeft: '44px', marginBottom: '0px' }}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              </div>
              {errors.password && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3.5 justify-center text-sm font-bold shadow-xl shadow-indigo-600/30 mt-6"
            >
              {mode === 'login' ? `Log In as ${role === 'creator' ? 'AI Creator' : 'Brand'}` : `Register & Launch ${role === 'creator' ? 'Creator' : 'Brand'} Dashboard`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* TOGGLE MODE & QUICK DEMO FILL BUTTONS */}
          <div className="pt-6 border-t border-white/10 space-y-4 mt-6">
            <div className="text-center text-xs text-slate-400">
              <span>{mode === 'login' ? "Don't have an account?" : "Already registered?"} </span>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setErrors({});
                }}
                className="text-indigo-400 hover:text-indigo-300 font-bold underline ml-1"
              >
                {mode === 'login' ? 'Sign Up Now' : 'Log In Here'}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                ⚡ One-Click Demo Auto-Fill
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('creator')}
                  className="px-3 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all text-center"
                >
                  Fill Demo Creator (@elena_ai)
                </button>

                <button
                  type="button"
                  onClick={() => fillDemoAccount('brand')}
                  className="px-3 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all text-center"
                >
                  Fill Demo Brand (@auratech_brand)
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
