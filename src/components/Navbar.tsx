import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MainCategory } from '../types';
import { 
  CamelIcon, 
  LandFarmIcon, 
  HouseIcon, 
  VehicleIcon, 
  ElectronicsIcon, 
  ClothingIcon, 
  FurnitureIcon, 
  JobsIcon, 
  ServicesIcon, 
  FoodIcon, 
  StoreIcon 
} from './CustomIcons';

export const Navbar: React.FC = () => {
  const { 
    t, 
    currentUser, 
    logoutUser, 
    setActiveModal,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    conversations
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const handleCategoryNav = (cat: MainCategory | 'all') => {
    setSelectedCategory(cat);
    window.scrollTo({ top: 380, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navCategories: { id: MainCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'xoolo', label: t.xoolo, icon: <CamelIcon size={16} /> },
    { id: 'dhul', label: t.dhul, icon: <LandFarmIcon size={16} /> },
    { id: 'guryo', label: t.guryo, icon: <HouseIcon size={16} /> },
    { id: 'gaadiid', label: t.gaadiid, icon: <VehicleIcon size={16} /> },
    { id: 'electronics', label: t.electronics, icon: <ElectronicsIcon size={16} /> },
    { id: 'dharka', label: t.dharka, icon: <ClothingIcon size={16} /> },
    { id: 'alaabta_guriga', label: t.alaabta_guriga, icon: <FurnitureIcon size={16} /> },
    { id: 'shaqooyin', label: t.shaqooyin, icon: <JobsIcon size={16} /> },
    { id: 'adeegyo', label: t.adeegyo, icon: <ServicesIcon size={16} /> },
    { id: 'cunto', label: t.cunto, icon: <FoodIcon size={16} /> },
    { id: 'dukaamo', label: t.dukaamo, icon: <StoreIcon size={16} /> }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo: SUUQSOM */}
          <div className="flex items-center gap-6">
            <button 
              id="brand-logo-btn"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
            >
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#111827] tracking-tight">
                  SUUQ<span className="text-[#D94A0B]">SOM</span>
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-700">
              <button
                id="nav-home-btn"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="hover:text-[#D94A0B] transition-colors py-1 cursor-pointer"
              >
                {t.home}
              </button>
              
              {/* Category Dropdown */}
              <div className="relative group">
                <button
                  id="nav-categories-btn"
                  className="hover:text-[#D94A0B] transition-colors py-1 flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.categories}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 hidden group-hover:block transition-all z-50 max-h-96 overflow-y-auto">
                  <div className="px-3 py-1.5 border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    {t.categories}
                  </div>
                  {navCategories.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => handleCategoryNav(c.id)}
                      className="w-full text-left px-3.5 py-2 text-xs text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <span className="shrink-0 text-neutral-500 group-hover:text-[#D94A0B]">{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="nav-messages-btn"
                onClick={() => {
                  if (!currentUser) {
                    setActiveModal('auth');
                  } else {
                    setActiveModal('chat');
                  }
                }}
                className="hover:text-[#D94A0B] transition-colors py-1 relative flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.messages}</span>
                {unreadMessagesCount > 0 && (
                  <span className="w-4 h-4 bg-[#D94A0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              <button
                id="nav-friends-btn"
                onClick={() => {
                  if (!currentUser) {
                    setActiveModal('auth');
                  } else {
                    setActiveModal('friends');
                  }
                }}
                className="hover:text-[#D94A0B] transition-colors py-1 flex items-center gap-1 cursor-pointer"
              >
                <span>{t.friends}</span>
              </button>

              <button
                id="nav-profile-btn"
                onClick={() => {
                  if (currentUser) {
                    setActiveModal('settings');
                  } else {
                    setActiveModal('auth');
                  }
                }}
                className="hover:text-[#D94A0B] transition-colors py-1 cursor-pointer"
              >
                {t.profile}
              </button>
            </nav>
          </div>

          {/* Right Header Controls: Search, Post Ad, Settings, User */}
          <div className="flex items-center gap-3">
            
            {/* Header Search Input */}
            <div className="hidden lg:flex items-center relative w-60">
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchBarHeader}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B] transition-all placeholder:text-neutral-400"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Post Ad Action Button */}
            <button
              id="header-post-ad-btn"
              onClick={() => {
                if (!currentUser) {
                  setActiveModal('auth');
                } else {
                  setActiveModal('create-listing');
                }
              }}
              className="flex items-center gap-1.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.postAd}</span>
            </button>

            {/* Quick Settings Icon */}
            <button
              id="header-settings-toggle-btn"
              onClick={() => setActiveModal('settings')}
              title={t.settings}
              className="p-1.5 text-neutral-600 hover:text-[#D94A0B] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Account / Profile Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 bg-[#FAF9F7] rounded-full hover:ring-1 hover:ring-[#D94A0B] border border-neutral-200 transition-all cursor-pointer"
                >
                  <span className="text-xs font-medium text-[#111827] max-w-[100px] truncate hidden md:inline">
                    {currentUser.fullName}
                  </span>
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                    alt={currentUser.fullName}
                    className="w-6 h-6 rounded-full object-cover border border-neutral-200"
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-[11px] text-neutral-400 font-medium">Ku soo galay</p>
                      <p className="text-xs font-bold text-[#111827] truncate">{currentUser.fullName}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{currentUser.phone || currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveModal('settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-neutral-600" />
                      {t.profileEdit}
                    </button>

                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium border-t border-neutral-100 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => setActiveModal('auth')}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#111827] hover:text-[#D94A0B] hover:bg-neutral-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-neutral-200"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-700 hover:bg-neutral-100 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-5 space-y-3">
          <div className="relative pt-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF9F7] rounded-lg text-xs border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B] text-[#111827]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryNav(cat.id)}
                className="flex items-center gap-2 px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B] transition-colors"
              >
                <span className="shrink-0">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#FAF9F7] text-[#D94A0B] border border-neutral-200">
                Af-Soomaali
              </span>
            </div>

            {currentUser ? (
              <button
                onClick={() => { logoutUser(); setIsMobileMenuOpen(false); }}
                className="text-xs text-red-600 font-medium"
              >
                {t.logout}
              </button>
            ) : (
              <button
                onClick={() => { setActiveModal('auth'); setIsMobileMenuOpen(false); }}
                className="text-xs font-semibold text-[#D94A0B] underline"
              >
                {t.login} / {t.register}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
