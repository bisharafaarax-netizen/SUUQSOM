import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Globe, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Lock,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const { 
    t, 
    language, 
    setLanguage, 
    currentUser, 
    updateProfile, 
    activeModal, 
    setActiveModal,
    logoutUser 
  } = useApp();

  const [name, setName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [city, setCity] = useState(currentUser?.city || 'Muqdisho');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (activeModal !== 'settings') return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    updateProfile({
      fullName: name,
      phone,
      email,
      city,
      bio
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-4">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-xl text-[#D94A0B] border border-orange-200">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#111827]">{t.settingsTitle}</h2>
              <p className="text-xs text-neutral-500">Habee luqadda iyo macluumaadka profile-kaaga</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#FAF9F7] hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto space-y-6 bg-white">
          
          {/* 1. Language Info (Pure Somali) */}
          <div className="p-3.5 bg-[#FAF9F7] rounded-xl border border-neutral-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#D94A0B]" />
              <div>
                <p className="text-xs font-bold text-[#111827]">Luqadda Rasmiga ah</p>
                <p className="text-[11px] text-neutral-500">Af-Soomaali (Suuqa oo dhan)</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#D94A0B]/10 text-[#D94A0B] border border-[#D94A0B]/20 px-2.5 py-1 rounded-lg">
              🇸🇴 Soomaali
            </span>
          </div>

          {/* 2. Profile Editor (If logged in) */}
          {currentUser ? (
            <div className="pt-4 border-t border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#111827] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D94A0B]" />
                  <span>{t.profileEdit}</span>
                </h3>
                <span className="text-[11px] text-[#D94A0B] font-bold bg-[#D94A0B]/10 border border-[#D94A0B]/20 px-2.5 py-0.5 rounded-full">
                  Akoon Shaqaynaya
                </span>
              </div>

              {savedSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Isbeddelka si guul leh ayaa loo keydiyay!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    required
                  />
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Magaalada
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  />
                </div>

                {/* Password security note */}
                <div className="p-2.5 bg-[#FAF9F7] rounded-lg border border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>Password-kaaga waa qarsan yahay (Encrypted)</span>
                  </div>
                  <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                {/* Save Changes Button */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    {t.saveChanges}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logoutUser();
                      setActiveModal('none');
                    }}
                    className="px-3.5 py-2.5 bg-white text-red-600 hover:bg-red-50 rounded-lg font-semibold text-xs border border-red-200 transition-colors cursor-pointer"
                  >
                    {t.logout}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-4 bg-[#FAF9F7] rounded-xl border border-neutral-200 text-center space-y-2">
              <p className="text-xs text-neutral-600">
                Wali ma aadan soo galin akoon. Soo gal ama is-diiwaangeli si aad wax uga beddesho profile-kaaga.
              </p>
              <button
                onClick={() => setActiveModal('auth')}
                className="px-4 py-2 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              >
                {t.login} / {t.register}
              </button>
            </div>
          )}

          {/* Privacy Note */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-[#D94A0B]" />
            <span>{t.privacyNote}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

