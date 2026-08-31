import React from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { t, searchQuery, setSearchQuery, setSelectedCategory, setSelectedLivestockSub } = useApp();

  return (
    <section id="hero-banner" className="pt-10 pb-6 text-center max-w-4xl mx-auto px-4 bg-[#FAF9F7]">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-3">
        {t.welcomeTitle}
      </h1>
      <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto mb-6 leading-relaxed">
        {t.heroSubtitle}
      </p>

      {/* Main Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white rounded-xl border border-neutral-200 shadow-xs focus-within:border-[#D94A0B] focus-within:ring-1 focus-within:ring-[#D94A0B] transition-all">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
          <input
            id="main-hero-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-12 py-3.5 bg-white text-[#111827] rounded-xl text-sm sm:text-base focus:outline-none placeholder:text-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs font-semibold text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-neutral-600">
          <span className="font-medium text-neutral-500 mr-1">Qaybaha:</span>
          {[
            { label: 'Xoolo', cat: 'xoolo' },
            { label: 'Geel', cat: 'xoolo', sub: 'geel' },
            { label: 'Lo\'', cat: 'xoolo', sub: 'lo' },
            { label: 'Ari', cat: 'xoolo', sub: 'ari' },
            { label: 'Dhul', cat: 'dhul' },
            { label: 'Guryo', cat: 'guryo' },
            { label: 'Gaadiid', cat: 'gaadiid' },
            { label: 'Adeegyo', cat: 'adeegyo' }
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setSelectedCategory(tag.cat as any);
                if (tag.sub) {
                  setSelectedLivestockSub(tag.sub as any);
                } else {
                  setSelectedLivestockSub('all');
                }
              }}
              className="bg-white hover:bg-[#FAF9F7] hover:border-[#D94A0B]/30 hover:text-[#D94A0B] border border-neutral-200/90 px-3 py-1 rounded-lg text-neutral-700 transition-all cursor-pointer text-xs font-semibold shadow-xs"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

