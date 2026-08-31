import React from 'react';
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

export const CategoryGrid: React.FC = () => {
  const { t, selectedCategory, setSelectedCategory, setSelectedLivestockSub } = useApp();

  const categories: { id: MainCategory; label: string; icon: React.ReactNode; subText?: string }[] = [
    {
      id: 'xoolo',
      label: t.xoolo,
      icon: <CamelIcon size={26} />,
      subText: "Geel, Lo', Ari..."
    },
    {
      id: 'dhul',
      label: t.dhul,
      icon: <LandFarmIcon size={26} />
    },
    {
      id: 'guryo',
      label: t.guryo,
      icon: <HouseIcon size={26} />
    },
    {
      id: 'gaadiid',
      label: t.gaadiid,
      icon: <VehicleIcon size={26} />
    },
    {
      id: 'electronics',
      label: t.electronics,
      icon: <ElectronicsIcon size={26} />
    },
    {
      id: 'dharka',
      label: t.dharka,
      icon: <ClothingIcon size={26} />
    },
    {
      id: 'alaabta_guriga',
      label: t.alaabta_guriga,
      icon: <FurnitureIcon size={26} />
    },
    {
      id: 'shaqooyin',
      label: t.shaqooyin,
      icon: <JobsIcon size={26} />
    },
    {
      id: 'adeegyo',
      label: t.adeegyo,
      icon: <ServicesIcon size={26} />
    },
    {
      id: 'cunto',
      label: t.cunto,
      icon: <FoodIcon size={26} />
    },
    {
      id: 'dukaamo',
      label: t.dukaamo,
      icon: <StoreIcon size={26} />
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-black text-[#111827] tracking-tight">{t.categories}</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Dooro qaybta aad rabto inaad ka raadiso ama ka daalacato</p>
        </div>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-bold text-[#D94A0B] hover:underline cursor-pointer"
          >
            {t.clearFilters}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleSelectCategory(cat.id)}
              className={`group flex flex-col items-center justify-center p-4 rounded-2xl transition-all cursor-pointer text-center relative border shadow-xs ${
                isSelected
                  ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-md shadow-[#D94A0B]/20 scale-[1.02]'
                  : 'bg-white text-[#111827] hover:bg-white border-neutral-200/90 hover:border-[#D94A0B]/40 hover:shadow-sm'
              }`}
            >
              {/* Category Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#FAF9F7] text-[#111827] group-hover:text-[#D94A0B] group-hover:bg-[#D94A0B]/10'
              }`}>
                {React.cloneElement(cat.icon as React.ReactElement, {
                  className: isSelected ? 'text-white' : 'text-current'
                })}
              </div>

              {/* Category Label */}
              <span className={`text-xs font-bold tracking-tight line-clamp-1 ${
                isSelected ? 'text-white' : 'text-[#111827] group-hover:text-[#D94A0B]'
              }`}>
                {cat.label}
              </span>

              {/* Sub-label for livestock */}
              {cat.subText && (
                <span className={`text-[10px] mt-0.5 font-medium line-clamp-1 ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>
                  {cat.subText}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
