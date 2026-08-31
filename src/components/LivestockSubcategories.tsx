import React from 'react';
import { useApp } from '../context/AppContext';
import { LivestockSubCategory } from '../types';
import { 
  CamelIcon, 
  CowIcon, 
  GoatIcon, 
  HorseIcon, 
  ChickenIcon, 
  LivestockIcon 
} from './CustomIcons';
import { Layers } from 'lucide-react';

export const LivestockSubcategories: React.FC = () => {
  const { 
    t, 
    selectedCategory, 
    setSelectedCategory, 
    selectedLivestockSub, 
    setSelectedLivestockSub 
  } = useApp();

  const subcategories: { id: LivestockSubCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    {
      id: 'geel',
      label: t.geel,
      icon: <CamelIcon size={16} />
    },
    {
      id: 'lo',
      label: t.lo,
      icon: <CowIcon size={16} />
    },
    {
      id: 'ari',
      label: t.ari,
      icon: <GoatIcon size={16} />
    },
    {
      id: 'fardo',
      label: t.fardo,
      icon: <HorseIcon size={16} />
    },
    {
      id: 'digaag',
      label: t.digaag,
      icon: <ChickenIcon size={16} />
    },
    {
      id: 'kale',
      label: t.livestockOther,
      icon: <LivestockIcon size={16} />
    },
    {
      id: 'all',
      label: t.allLivestock,
      icon: <Layers size={14} />
    }
  ];

  const handleSubSelect = (subId: LivestockSubCategory | 'all') => {
    setSelectedCategory('xoolo');
    setSelectedLivestockSub(subId);
  };

  return (
    <section id="livestock-subcategories-section" className="py-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAF9F7]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-[#111827]">
            <span>{t.livestockTypes}:</span>
          </h2>
        </div>

        {/* Subcategory Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {subcategories.map((sub) => {
            const isActive = selectedCategory === 'xoolo' && selectedLivestockSub === sub.id;

            return (
              <button
                key={sub.id}
                id={`subcat-pill-${sub.id}`}
                onClick={() => handleSubSelect(sub.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-xs ${
                  isActive
                    ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                    : 'bg-white text-neutral-700 hover:text-[#D94A0B] hover:border-[#D94A0B]/30 border-neutral-200/90'
                }`}
              >
                <span className="shrink-0">
                  {sub.icon}
                </span>
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
