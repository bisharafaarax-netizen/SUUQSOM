import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const QuickAuthCard: React.FC = () => {
  const { t, currentUser, registerUser, setActiveModal } = useApp();

  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Fadlan geli magacaaga oo buuxa.');
      return;
    }
    if (!emailOrPhone.trim()) {
      setErrorMessage('Fadlan geli email ama taleefon.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Fadlan geli password ugu yaraan 4 xaraf ah.');
      return;
    }

    const isEmail = emailOrPhone.includes('@');
    registerUser({
      fullName: fullName.trim(),
      email: isEmail ? emailOrPhone.trim() : `${emailOrPhone.replace(/[^0-9]/g, '')}@suuq.so`,
      phone: isEmail ? '+252 61 500 0000' : emailOrPhone.trim(),
      birthYear: 1998,
      birthMonth: 6,
      birthDay: 15,
      gender: 'lab',
      city: 'Muqdisho'
    });

    setIsSuccess(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  if (currentUser) {
    return (
      <section id="quick-auth-logged-in-card" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser.fullName}
              className="w-14 h-14 rounded-full object-cover border border-neutral-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#111827]">
                  Ku soo dhawoow, {currentUser.fullName}!
                </h3>
                <CheckCircle2 className="w-4 h-4 text-[#D94A0B]" />
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                Akoonkaaga Suuqplus wuu furan yahay. Waad daabacan kartaa xayeysiis cusub ama waad la xiriiri kartaa iibiyeyaasha.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('create-listing')}
              className="flex-1 md:flex-none bg-[#D94A0B] hover:bg-[#C23E08] text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              + {t.createPost}
            </button>
            <button
              onClick={() => setActiveModal('settings')}
              className="flex-1 md:flex-none bg-white text-[#111827] border border-neutral-200 px-4 py-2.5 rounded-xl font-semibold text-xs hover:bg-[#FAF9F7] hover:border-neutral-300 transition-colors cursor-pointer"
            >
              {t.profileEdit}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-auth-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 bg-[#FAF9F7]">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text Banner */}
          <div className="lg:col-span-5 space-y-2.5 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              {t.joinBannerTitle}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {t.joinBannerDesc}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-[#D94A0B]" />
              <span>{t.privacyNote}</span>
            </div>
          </div>

          {/* Right Column Registration Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F7] rounded-xl p-5 sm:p-6 border border-neutral-200/80">
              
              {isSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#D94A0B] mx-auto" />
                  <h3 className="text-base font-bold text-[#111827]">Akoonkaaga si guul leh ayaa loo abuuray!</h3>
                  <p className="text-xs text-neutral-600">Hadda waxaad awoodaa inaad wax soo post-gareyso, wax iibsato, ama fariimo dirto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMessage && (
                    <div className="p-2.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Magaca */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t.fullName}</span>
                    </label>
                    <input
                      id="quick-auth-name-input"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Magacaaga oo buuxa"
                      className="w-full px-3.5 py-2.5 bg-white text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    />
                  </div>

                  {/* Email / Telefoon */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t.emailOrPhone}</span>
                    </label>
                    <input
                      id="quick-auth-email-input"
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="Email-kaaga ama lambarkaaga"
                      className="w-full px-3.5 py-2.5 bg-white text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t.password}</span>
                    </label>
                    <input
                      id="quick-auth-password-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-white text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B] tracking-widest"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="quick-auth-submit-btn"
                    type="submit"
                    className="w-full py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer mt-1 shadow-xs"
                  >
                    {t.register}
                  </button>

                  {/* Footer link to modal auth */}
                  <div className="text-center pt-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveModal('auth')}
                      className="text-xs text-neutral-500 hover:text-[#D94A0B] font-medium cursor-pointer transition-colors"
                    >
                      {t.alreadyHaveAccount} <span className="text-[#D94A0B] font-bold underline">{t.login}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

