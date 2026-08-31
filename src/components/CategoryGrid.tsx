import React from 'react';
import { useApp } from '../context/AppContext';
import { MainCategory } from '../types';
import { 
  CamelIcon, 
  LandIcon, 
  HouseIcon, 
  VehicleIcon, 
  ServicesIcon 
} from './CustomIcons';

export const CategoryGrid: React.FC = () => {
  const { t, selectedCategory, setSelectedCategory, setSelectedLivestockSub } = useApp();

  const categories: { id: MainCategory; label: string; icon: React.ReactNode }[] = [
    {
      id: 'xoolo',
      label: t.xoolo,
      icon: <CamelIcon size={28} />
    },
    {
      id: 'dhul',
      label: t.dhul,
      icon: <LandIcon size={28} />
    },
    {
      id: 'guryo',
      label: t.guryo,
      icon: <HouseIcon size={28} />
    },
    {
      id: 'gaadiid',
      label: t.gaadiid,
      icon: <VehicleIcon size={28} />
    },
    {
      id: 'adeegyo',
      label: t.adeegyo,
      icon: <ServicesIcon size={28} />
    }
  ];

  const handleSelectCategory = (catId: MainCategory) => {
    if (selectedCategory === catId) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(catId);
      if (catId === 'xoolo') {
        setSelectedLivestockSub('all');
      }
    }
  };

  return (
    <section id="category-grid-section" className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAF9F7]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleSelectCategory(cat.id)}
              className={`group flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl transition-all cursor-pointer text-center relative border shadow-xs ${
                isSelected
                  ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-md shadow-[#D94A0B]/20 scale-[1.02]'
                  : 'bg-white text-[#111827] hover:bg-white border-neutral-200/90 hover:border-[#D94A0B]/40 hover:shadow-sm'
              }`}
            >
              {/* Category Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#FAF9F7] text-[#111827] group-hover:text-[#D94A0B] group-hover:bg-[#D94A0B]/10'
              }`}>
                {React.cloneElement(cat.icon as React.ReactElement, {
                  className: isSelected ? 'text-white' : 'text-current'
                })}
              </div>

              {/* Category Label */}
              <span className={`text-sm font-bold tracking-tight ${
                isSelected ? 'text-white' : 'text-[#111827] group-hover:text-[#D94A0B]'
              }`}>
                {cat.label}
              </span>

              {/* Sub-label for livestock */}
              {cat.id === 'xoolo' && (
                <span className={`text-[11px] mt-0.5 font-medium ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                  Geel, Lo', Ari
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

