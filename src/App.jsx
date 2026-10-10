import React, { useState, useEffect } from 'react';
import { SEED_CREATORS, SEED_BRIEFS } from './data/seedData';
import { apiService } from './services/api';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import CreatorDashboard from './components/CreatorDashboard';
import BrandDashboard from './components/BrandDashboard';
import AIQualityCheckModal from './components/AIQualityCheckModal';
import CreatorDetailModal from './components/CreatorDetailModal';
import BrowseCreatorsPage from './components/BrowseCreatorsPage';
import BrowseBriefsPage from './components/BrowseBriefsPage';

export default function App() {
  // Navigation State: 'landing' | 'auth-creator' | 'auth-brand' | 'discover-creators' | 'discover-briefs' | 'creator-dashboard' | 'brand-dashboard'
  const [activeTab, setActiveTab] = useState('landing');

  // User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aura_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Global selection messages list (Persisted in Backend Server + LocalStorage)
  const [selectionMessages, setSelectionMessages] = useState(() => {
    const saved = localStorage.getItem('aura_selection_messages');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'msg-init-1', 
        sender: 'Aura Tech Brand Studios', 
        username: '@auratech_brand', 
        targetCreatorUsername: '@elena_ai',
        time: '10:42 AM', 
        text: '🎉 Hi Elena! You have been selected by Aura Tech Brand Studios (@auratech_brand) for our Futuristic Electric Supercar Commercial Brief!', 
        unread: true,
        isSelectionNotice: true 
      },
      { 
        id: 'msg-init-2', 
        sender: 'Luxe Vibe Fashion', 
        username: '@luxevibe_brand', 
        targetCreatorUsername: '@elena_ai',
        time: 'Yesterday', 
        text: '🎉 Hello! You have been selected by Luxe Vibe Fashion (@luxevibe_brand) for our High-Fashion AI Lookbook Campaign.', 
        unread: false,
        isSelectionNotice: true 
      }
    ];
  });

  const [isAIQualityOpen, setIsAIQualityOpen] = useState(false);
  const [selectedCreatorForDetail, setSelectedCreatorForDetail] = useState(null);

  // Sync user state & messages to localstorage and Backend API server
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aura_active_user', JSON.stringify(currentUser));
      apiService.loginUser(currentUser);
    } else {
      localStorage.removeItem('aura_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aura_selection_messages', JSON.stringify(selectionMessages));
  }, [selectionMessages]);

  // Fetch initial messages & server status from backend on mount
  useEffect(() => {
    async function loadBackendData() {
      const serverMsgs = await apiService.getMessages();
      if (serverMsgs && Array.isArray(serverMsgs) && serverMsgs.length > 0) {
        setSelectionMessages(serverMsgs);
      }
    }
    loadBackendData();
  }, []);

  const handleAuthSuccess = async (userObj) => {
    setCurrentUser(userObj);
    await apiService.loginUser(userObj);
    setActiveTab(userObj.role === 'creator' ? 'creator-dashboard' : 'brand-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('landing');
  };

  // Demo toggle role button
  const handleToggleDemoRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === 'creator' ? 'brand' : 'creator';
    const updatedUser = {
      ...currentUser,
      role: newRole,
      name: newRole === 'creator' ? 'Elena Rostova' : 'Aura Tech Brand Studios',
      username: newRole === 'creator' ? '@elena_ai' : '@auratech_brand'
    };
    setCurrentUser(updatedUser);
    setActiveTab(newRole === 'creator' ? 'creator-dashboard' : 'brand-dashboard');
  };

  // TRIGGER CREATOR SELECTION BY BRAND (Send message to creator & persist to backend server)
  const handleSelectCreatorForBrief = async (creator) => {
    if (!currentUser) {
      alert("Please log in as a Brand to select and invite creators!");
      setActiveTab('auth-brand');
      return;
    }

    const brandName = currentUser.name || 'Brand Studio';
    const brandUsername = currentUser.username || '@brand';

    const newSelectionMessage = {
      id: `invite-${Date.now()}`,
      sender: brandName,
      username: brandUsername,
      targetCreatorUsername: creator.username,
      time: 'Just now',
      text: `🎉 CONGRATULATIONS ${creator.name}! You have been selected by ${brandName} (${brandUsername}) for our new Generative Commercial Brief! Please review campaign details in your Creator Messages.`,
      unread: true,
      isSelectionNotice: true
    };

    setSelectionMessages([newSelectionMessage, ...selectionMessages]);

    // Persist to Backend REST API Server (http://localhost:5000/api/messages)
    await apiService.sendMessage(newSelectionMessage);

    alert(`🎉 SELECTION DISPATCHED & PERSISTED TO BACKEND SERVER!\n\nA direct message notification has been sent to ${creator.name} (${creator.username}):\n\n"${newSelectionMessage.text}"\n\nData is saved in backend database (http://localhost:5000/api/messages)!`);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={(tab) => setActiveTab(tab)}
        activeTab={activeTab}
        onOpenAIQualityModal={() => setIsAIQualityOpen(true)}
        onToggleDemoRole={handleToggleDemoRole}
      />

      {/* DEDICATED PAGE ROUTING */}
      <div className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            creatorsList={SEED_CREATORS}
            briefsList={SEED_BRIEFS}
            onSelectCreator={(creator) => setSelectedCreatorForDetail(creator)}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAIQualityModal={() => setIsAIQualityOpen(true)}
            currentUser={currentUser}
          />
        )}

        {/* SEPARATE CREATOR AUTH PAGE */}
        {activeTab === 'auth-creator' && (
          <AuthPage
            initialRole="creator"
            initialMode="signup"
            onAuthSuccess={handleAuthSuccess}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* SEPARATE BRAND AUTH PAGE */}
        {activeTab === 'auth-brand' && (
          <AuthPage
            initialRole="brand"
            initialMode="signup"
            onAuthSuccess={handleAuthSuccess}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* BROWSE 50 CREATORS PAGE */}
        {activeTab === 'discover-creators' && (
          <BrowseCreatorsPage
            creatorsList={SEED_CREATORS}
            onSelectCreator={(creator) => setSelectedCreatorForDetail(creator)}
            onNavigate={(tab) => setActiveTab(tab)}
            currentUser={currentUser}
          />
        )}

        {/* BROWSE 50 BRIEFS PAGE */}
        {activeTab === 'discover-briefs' && (
          <BrowseBriefsPage
            briefsList={SEED_BRIEFS}
            onOpenAuth={() => setActiveTab('auth-creator')}
            currentUser={currentUser}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* CREATOR DASHBOARD PAGE */}
        {activeTab === 'creator-dashboard' && currentUser && (
          <CreatorDashboard
            currentUser={currentUser}
            creatorsList={SEED_CREATORS}
            briefsList={SEED_BRIEFS}
            selectionMessages={selectionMessages}
            onOpenAIQualityModal={() => setIsAIQualityOpen(true)}
          />
        )}

        {/* BRAND DASHBOARD PAGE */}
        {activeTab === 'brand-dashboard' && currentUser && (
          <BrandDashboard
            currentUser={currentUser}
            creatorsList={SEED_CREATORS}
            briefsList={SEED_BRIEFS}
            onSelectCreator={(creator) => setSelectedCreatorForDetail(creator)}
            onSelectCreatorForBrief={handleSelectCreatorForBrief}
            onOpenAIQualityModal={() => setIsAIQualityOpen(true)}
          />
        )}
      </div>

      {/* MODALS */}
      <AIQualityCheckModal
        isOpen={isAIQualityOpen}
        onClose={() => setIsAIQualityOpen(false)}
      />

      <CreatorDetailModal
        creator={selectedCreatorForDetail}
        isOpen={!!selectedCreatorForDetail}
        onClose={() => setSelectedCreatorForDetail(null)}
        onInviteToBrief={(creator) => handleSelectCreatorForBrief(creator)}
      />

    </div>
  );
}
