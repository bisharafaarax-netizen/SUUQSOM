import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { LivestockSubcategories } from './components/LivestockSubcategories';
import { ListingCard } from './components/ListingCard';
import { QuickAuthCard } from './components/QuickAuthCard';
import { SettingsWidget } from './components/SettingsWidget';

// Modals
import { AuthModal } from './components/AuthModal';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ChatModal } from './components/ChatModal';
import { CallModal } from './components/CallModal';
import { SocialFriendsModal } from './components/SocialFriendsModal';
import { SettingsModal } from './components/SettingsModal';

import { Sparkles, ArrowRight, Filter, RefreshCw, PlusCircle, Megaphone, Tag } from 'lucide-react';

const MainMarketplaceContent: React.FC = () => {
  const { 
    t, 
    listings, 
    selectedCategory, 
    setSelectedCategory, 
    selectedLivestockSub, 
    setSelectedLivestockSub, 
    searchQuery,
    setSearchQuery,
    currentUser,
    setActiveModal
  } = useApp();

  // Filter listings by category, livestock subcategory, and search query
  const filteredListings = listings.filter((item) => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // 2. Livestock Subcategory Filter
    if (
      selectedCategory === 'xoolo' &&
      selectedLivestockSub !== 'all' &&
      item.livestockSubCategory !== selectedLivestockSub
    ) {
      return false;
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchSub = item.livestockSubCategory?.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchLocation || matchCategory || matchSub;
    }

    return true;
  });

  const handlePostAdClick = () => {
    if (!currentUser) {
      setActiveModal('auth');
    } else {
      setActiveModal('create-listing');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#111827] flex flex-col antialiased">
      
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-12 bg-[#FAF9F7]">
        
        {/* Hero Welcome & Search */}
        <HeroSection />

        {/* 5 Main Category Cards */}
        <CategoryGrid />

        {/* Livestock Subcategory Pills (Geel, Lo', Ari) */}
        {(selectedCategory === 'xoolo' || selectedCategory === 'all') && (
          <LivestockSubcategories />
        )}

        {/* Recent Items / Listings Grid (Waxyaabaha Cusub) */}
        <section id="listings-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-200/80">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                {t.recentItems}
              </h2>
              {selectedCategory !== 'all' && (
                <span className="text-xs font-semibold bg-[#D94A0B]/10 text-[#D94A0B] border border-[#D94A0B]/20 px-2.5 py-0.5 rounded-full capitalize">
                  {selectedCategory === 'xoolo' && selectedLivestockSub !== 'all' 
                    ? `${t.xoolo}: ${selectedLivestockSub}` 
                    : t[selectedCategory as keyof typeof t] || selectedCategory}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLivestockSub('all');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-1 text-xs text-neutral-600 hover:text-[#D94A0B] font-medium cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.clearFilters}</span>
                </button>
              )}

              {listings.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLivestockSub('all');
                    setSearchQuery('');
                  }}
                  className="text-xs sm:text-sm font-semibold text-[#111827] hover:text-[#D94A0B] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{t.viewAll}</span>
                  <ArrowRight className="w-4 h-4 text-[#D94A0B]" />
                </button>
              )}
            </div>
          </div>

          {/* Listings Cards Grid or Empty State */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : listings.length === 0 ? (
            /* Clean Empty Marketplace State for real user advertisements */
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-neutral-200/90 shadow-xs max-w-xl mx-auto">
              <div className="w-14 h-14 bg-[#D94A0B]/10 text-[#D94A0B] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D94A0B]/20">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-1.5">
                {t.emptyMarketplaceTitle}
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                {t.emptyMarketplaceDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="empty-state-post-ad-btn"
                  onClick={handlePostAdClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D94A0B] hover:bg-[#C23E08] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.postAd}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Search/Filter specific empty state */
            <div className="bg-white rounded-2xl p-10 text-center border border-neutral-200/90 shadow-xs max-w-md mx-auto">
              <p className="text-sm font-bold text-[#111827] mb-1">
                {t.noItemsFound}
              </p>
              <p className="text-xs text-neutral-500 mb-4">
                Isku day inaad baarto erey kale ama aad tirtirto shaandhaynta.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLivestockSub('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </section>

        {/* Quick Registration Card */}
        <QuickAuthCard />

        {/* Quick Settings Widget */}
        <SettingsWidget />

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 bg-[#FAF9F7] py-8 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-6 font-medium text-neutral-700">
            <span className="font-extrabold text-[#111827] tracking-tight">Suuq<span className="text-[#D94A0B]">plus</span></span>
            <span className="hover:text-[#D94A0B] transition-colors cursor-pointer" onClick={() => setSelectedCategory('xoolo')}>Xoolo</span>
            <span className="hover:text-[#D94A0B] transition-colors cursor-pointer" onClick={() => setSelectedCategory('dhul')}>Dhul</span>
            <span className="hover:text-[#D94A0B] transition-colors cursor-pointer" onClick={() => setSelectedCategory('guryo')}>Guryo</span>
            <span className="hover:text-[#D94A0B] transition-colors cursor-pointer" onClick={() => setSelectedCategory('gaadiid')}>Gaadiid</span>
            <span className="hover:text-[#D94A0B] transition-colors cursor-pointer" onClick={() => setSelectedCategory('adeegyo')}>Adeegyo</span>
          </div>
          <p className="text-neutral-400">{t.footerCopyright}</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Interactive Modals */}
      <AuthModal />
      <ListingDetailModal />
      <CreateListingModal />
      <ChatModal />
      <CallModal />
      <SocialFriendsModal />
      <SettingsModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainMarketplaceContent />
    </AppProvider>
  );
}
