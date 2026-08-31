import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Calendar, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Shield, 
  Sparkles,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { t, activeModal, setActiveModal, registerUser, loginUser } = useApp();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  
  // Registration state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Birth Year, Month, Day selectors
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(1);
  const [gender, setGender] = useState<'lab' | 'dheddig'>('lab');

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  if (activeModal !== 'auth') return null;

  const years = Array.from({ length: 70 }, (_, i) => currentYear - 14 - i);
  const months = [
    { value: 1, label: 'Jannaayo (Jan)' },
    { value: 2, label: 'Febraayo (Feb)' },
    { value: 3, label: 'Maarso (Mar)' },
    { value: 4, label: 'Abriil (Apr)' },
    { value: 5, label: 'May (May)' },
    { value: 6, label: 'Juun (Jun)' },
    { value: 7, label: 'Luuliyo (Jul)' },
    { value: 8, label: 'Ogosto (Aug)' },
    { value: 9, label: 'Sebtembar (Sep)' },
    { value: 10, label: 'Oktoobar (Oct)' },
    { value: 11, label: 'Nofembar (Nov)' },
    { value: 12, label: 'Diseembar (Dec)' }
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().split(' ').length < 2) {
      setErrorMessage('Fadlan geli magacaaga oo saddexan ama laba magac oo buuxa.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Fadlan geli lambarkaaga taleefanka.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Fadlan geli iimayl sax ah.');
      return;
    }
    if (!password || password.length < 5) {
      setErrorMessage('Fadlan geli furaha sirta ah (Password) oo ugu yaraan 5 xaraf ah.');
      return;
    }

    const res = registerUser({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      birthYear,
      birthMonth,
      birthDay,
      gender,
      city: 'Muqdisho'
    });

    if (res.success) {
      setActiveModal('none');
    } else {
      setErrorMessage(res.error || 'Khalad ayaa dhacay.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMessage('Fadlan geli Email-kaaga ama lambarkaaga taleefanka.');
      return;
    }
    loginUser(loginIdentifier.trim(), loginPassword);
    setActiveModal('none');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-6">
        
        {/* Header */}
        <div className="relative bg-white p-6 border-b border-neutral-200">
          <button
            id="auth-modal-close-btn"
            onClick={() => setActiveModal('none')}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF9F7] hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black tracking-tight text-[#111827]">Suuq<span className="text-[#D94A0B]">plus</span></span>
          </div>

          <h2 className="text-base font-bold text-[#111827]">
            {mode === 'register' ? t.createAccount : t.signInPrompt}
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            {mode === 'register' ? t.signUpPrompt : 'Geli xogtaada si aad akoonkaaga u furato'}
          </p>

          {/* Toggle Register / Login */}
          <div className="flex items-center gap-1 mt-4 bg-[#FAF9F7] p-1 rounded-xl border border-neutral-200">
            <button
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-[#D94A0B] text-white shadow-xs' 
                  : 'text-neutral-600 hover:text-[#111827]'
              }`}
            >
              {t.register}
            </button>
            <button
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-[#D94A0B] text-white shadow-xs' 
                  : 'text-neutral-600 hover:text-[#111827]'
              }`}
            >
              {t.login}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto bg-white">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* 1. Magaca oo saddexan (Full Name) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.fullName}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-full-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tusaale: Axmed Cali Nuur"
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  required
                />
              </div>

              {/* 2. Lambarka Taleefanka (Phone Number) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.phone}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+252 61 XXX XXXX ama 061XXXXXXX"
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  required
                />
              </div>

              {/* 3. Da'da (Sanadka, Bisha, Maalinta) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>{t.birthYear} / {t.age}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#D94A0B] bg-[#FAF9F7] border border-neutral-200 px-2 py-0.5 rounded-md">
                    Sanadka: {birthYear}
                  </span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {/* Sanadka */}
                  <select
                    id="reg-birth-year-select"
                    value={birthYear}
                    onChange={(e) => setBirthYear(Number(e.target.value))}
                    className="px-2.5 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>

                  {/* Bisha */}
                  <select
                    id="reg-birth-month-select"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(Number(e.target.value))}
                    className="px-2.5 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  >
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>

                  {/* Maalinta */}
                  <select
                    id="reg-birth-day-select"
                    value={birthDay}
                    onChange={(e) => setBirthDay(Number(e.target.value))}
                    className="px-2.5 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>Maalin {d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Jinsiga: Lab / Dheddig (Gender) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.gender}</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('lab')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      gender === 'lab'
                        ? 'bg-[#111827] text-white border-[#111827] shadow-xs'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <span>👨 {t.male}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('dheddig')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      gender === 'dheddig'
                        ? 'bg-[#111827] text-white border-[#111827] shadow-xs'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <span>👩 {t.female}</span>
                  </button>
                </div>
              </div>

              {/* 5. Iimaylka (Email Address) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.email}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="reg-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tusaale@gmail.com"
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  required
                />
              </div>

              {/* 6. Password (Furaha sirta ah) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.password}</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="reg-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-9 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Register Button */}
              <button
                id="submit-register-btn"
                type="submit"
                className="w-full py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer mt-2 shadow-xs"
              >
                {t.register}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Login Identifier */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.emailOrPhone}</span>
                </label>
                <input
                  id="login-identifier-input"
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Geli Email ama Taleefon"
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  required
                />
              </div>

              {/* Login Password */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.password}</span>
                </label>
                <div className="relative">
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-9 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Login */}
              <button
                id="submit-login-btn"
                type="submit"
                className="w-full py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer mt-2 shadow-xs"
              >
                {t.login}
              </button>
            </form>
          )}

          {/* Privacy footer */}
          <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
            <Shield className="w-3.5 h-3.5 text-[#D94A0B]" />
            <span>{t.privacyNote}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
