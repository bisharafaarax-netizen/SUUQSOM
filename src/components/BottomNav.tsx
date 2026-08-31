import React from 'react';
import { Home, Grid, PlusCircle, MessageSquare, User, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { 
    t, 
    currentUser, 
    setActiveModal, 
    setSelectedCategory, 
    conversations,
    selectedCategory 
  } = useApp();

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <nav id="mobile-bottom-navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-sm safe-area-pb">
      <div className="flex items-center justify-around h-14 px-2">
        
        {/* Home */}
        <button
          id="tab-home"
          onClick={() => {
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors ${
            selectedCategory === 'all' 
              ? 'text-[#D94A0B] font-bold' 
              : 'text-neutral-500 hover:text-[#111827]'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t.home}</span>
        </button>

        {/* Categories */}
        <button
          id="tab-categories"
          onClick={() => {
            setSelectedCategory('xoolo');
            window.scrollTo({ top: 260, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-colors ${
            selectedCategory !== 'all' 
              ? 'text-[#D94A0B] font-bold' 
              : 'text-neutral-500 hover:text-[#111827]'
          }`}
        >
          <Grid className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t.categories}</span>
        </button>

        {/* Center Floating Post Ad Button */}
        <div className="flex-1 flex justify-center -mt-4">
          <button
            id="tab-post-ad"
            onClick={() => {
              if (!currentUser) {
                setActiveModal('auth');
              } else {
                setActiveModal('create-listing');
              }
            }}
            className="w-10 h-10 rounded-full bg-[#D94A0B] hover:bg-[#C23E08] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
            aria-label={t.postAd}
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <button
          id="tab-messages"
          onClick={() => {
            if (!currentUser) {
              setActiveModal('auth');
            } else {
              setActiveModal('chat');
            }
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 relative cursor-pointer text-neutral-500 hover:text-[#111827] transition-colors"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 mb-0.5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#D94A0B] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">{t.messages}</span>
        </button>

        {/* Profile / Account */}
        <button
          id="tab-profile"
          onClick={() => {
            if (currentUser) {
              setActiveModal('settings');
            } else {
              setActiveModal('auth');
            }
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer text-neutral-500 hover:text-[#111827] transition-colors"
        >
          <User className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">
            {currentUser ? t.account : t.login}
          </span>
        </button>

      </div>
    </nav>
  );
};
