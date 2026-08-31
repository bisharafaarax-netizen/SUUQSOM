import React from 'react';
import { Settings, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsWidget: React.FC = () => {
  const { t, language, setLanguage } = useApp();

  return (
    <div id="quick-settings-widget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8 bg-[#FAF9F7]">
      <div className="inline-flex flex-col sm:flex-row sm:items-center gap-4 p-3.5 bg-white rounded-xl border border-neutral-200/90 shadow-xs">
        
        {/* Title */}
        <div className="flex items-center gap-2 pr-3 sm:border-r sm:border-neutral-200">
          <Settings className="w-4 h-4 text-[#D94A0B]" />
          <span className="text-xs font-bold text-[#111827]">
            {t.settingsTitle}
          </span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-xs font-medium text-neutral-600">
            {t.language}:
          </span>
          <div className="flex items-center bg-[#FAF9F7] p-0.5 rounded-lg border border-neutral-200">
            <button
              id="widget-lang-so-btn"
              onClick={() => setLanguage('so')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                language === 'so'
                  ? 'bg-[#D94A0B] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-[#111827]'
              }`}
            >
              {t.somali}
            </button>
            <button
              id="widget-lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#D94A0B] text-white shadow-xs'
                  : 'text-neutral-700 hover:text-[#111827]'
              }`}
            >
              {t.english}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

