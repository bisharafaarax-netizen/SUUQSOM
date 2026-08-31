import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  MessageSquare, 
  Users, 
  User as UserIcon, 
  Settings, 
  Sun, 
  Moon, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MainCategory } from '../types';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
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
    window.scrollTo({ top: 400, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button 
              id="brand-logo-btn"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
            >
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#111827] tracking-tight">
                  Suuq<span className="text-[#D94A0B] font-bold">plus</span>
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
              
              <div className="relative group">
                <button
                  id="nav-categories-btn"
                  className="hover:text-[#D94A0B] transition-colors py-1 flex items-center gap-1 cursor-pointer"
                >
                  {t.categories}
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-md border border-neutral-200 py-1.5 hidden group-hover:block transition-all z-50">
                  <button 
                    onClick={() => handleCategoryNav('xoolo')}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium"
                  >
                    🐪 {t.xoolo} (Geel, Lo', Ari)
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('dhul')}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium"
                  >
                    ⛰️ {t.dhul}
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('guryo')}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium"
                  >
                    🏡 {t.guryo}
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('gaadiid')}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium"
                  >
                    🚗 {t.gaadiid}
                  </button>
                  <button 
                    onClick={() => handleCategoryNav('adeegyo')}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] cursor-pointer font-medium"
                  >
                    ⚡ {t.adeegyo}
                  </button>
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
                        setActiveModal('friends');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Users className="w-3.5 h-3.5 text-neutral-600" />
                      {t.friends}
                    </button>

                    <button
                      onClick={() => {
                        setActiveModal('chat');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF9F7] hover:text-[#D94A0B] flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
                      {t.messages}
                    </button>

                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t.logout}
                      </button>
                    </div>
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
            <button
              onClick={() => { setSelectedCategory('all'); setIsMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              🏠 {t.home}
            </button>
            <button
              onClick={() => { handleCategoryNav('xoolo'); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              🐪 {t.xoolo}
            </button>
            <button
              onClick={() => { handleCategoryNav('dhul'); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              ⛰️ {t.dhul}
            </button>
            <button
              onClick={() => { handleCategoryNav('guryo'); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              🏡 {t.guryo}
            </button>
            <button
              onClick={() => { handleCategoryNav('gaadiid'); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              🚗 {t.gaadiid}
            </button>
            <button
              onClick={() => { handleCategoryNav('adeegyo'); }}
              className="px-3 py-2 text-left rounded-lg text-xs font-medium bg-[#FAF9F7] text-[#111827] border border-neutral-200 hover:text-[#D94A0B]"
            >
              ⚡ {t.adeegyo}
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'so' ? 'en' : 'so')}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#FAF9F7] text-[#111827] border border-neutral-200"
              >
                🌐 {language === 'so' ? 'Soomaali' : 'English'}
              </button>
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
