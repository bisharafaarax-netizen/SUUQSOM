import React from 'react';
import { ShieldCheck, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsWidget: React.FC = () => {
  const { currentUser, setActiveModal } = useApp();

  return (
    <div id="quick-settings-widget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8 bg-[#FAF9F7]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-neutral-200/90 shadow-xs">
        
        {/* Marketplace status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#111827]">Suuqa Casriga ah ee Soomaaliyeed</p>
            <p className="text-[11px] text-neutral-500">Iibso oo iibi xoolo, dhul, guryo, gaadiid iyo adeegyo kale si toos ah.</p>
          </div>
        </div>

        {/* Action shortcut */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentUser) {
                setActiveModal('create-listing');
              } else {
                setActiveModal('auth');
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Soo Dhig Xayeysiis</span>
          </button>
        </div>

      </div>
    </div>
  );
};


