import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  MapPin, 
  DollarSign, 
  FileText, 
  Image as ImageIcon, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MainCategory, LivestockSubCategory, ListingType } from '../types';
import { CamelIcon, CattleIcon, GoatIcon, LandIcon, HouseIcon, VehicleIcon, ServicesIcon } from './CustomIcons';

export const CreateListingModal: React.FC = () => {
  const { t, activeModal, setActiveModal, addListing, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MainCategory>('xoolo');
  const [livestockSub, setLivestockSub] = useState<LivestockSubCategory>('geel');
  const [listingType, setListingType] = useState<ListingType>('iib');
  const [price, setPrice] = useState<string>('');
  const [currency, setCurrency] = useState<'USD' | 'SOS'>('USD');
  const [location, setLocation] = useState('Muqdisho');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '+252 ');
  const [imageUrl, setImageUrl] = useState('');
  const [features, setFeatures] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (activeModal !== 'create-listing') return null;

  // Sample image presets for quick selection
  const imagePresets = [
    { label: 'Geel', url: 'https://images.unsplash.com/photo-1549419131-aa9b02aa9654?auto=format&fit=crop&w=800&q=80' },
    { label: 'Lo\'', url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Ari', url: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80' },
    { label: 'Baabuur V8', url: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80' },
    { label: 'Guri Villa', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dhul Boos', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Fadlan geli magaca alaabta.');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setErrorMessage('Fadlan geli qiimo sax ah.');
      return;
    }

    const defaultImageMap: Record<MainCategory, string> = {
      xoolo: livestockSub === 'geel' 
        ? 'https://images.unsplash.com/photo-1549419131-aa9b02aa9654?auto=format&fit=crop&w=800&q=80'
        : livestockSub === 'lo'
        ? 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
      guryo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      dhul: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      gaadiid: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      adeegyo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    };

    const finalImage = imageUrl.trim() || defaultImageMap[category] || defaultImageMap.adeegyo;

    addListing({
      title: title.trim(),
      description: description.trim() || `${title} oo ku taal ${location}. Xaalad aad u wanaagsan.`,
      category,
      livestockSubCategory: category === 'xoolo' ? livestockSub : undefined,
      listingType,
      price: numPrice,
      currency,
      location: location.trim(),
      images: [finalImage],
      userId: currentUser?.id || 'user-1',
      sellerName: currentUser?.fullName || 'Iibiye Suuq',
      sellerPhone: phone.trim(),
      sellerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      sellerVerified: true,
      features: features.split(',').map(s => s.trim()).filter(Boolean)
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal('none');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-neutral-200">
          <div>
            <h2 className="text-base font-black text-[#111827]">{t.createPost}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Soo geli xayeysiiskaaga si dadku u arkaan</p>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#FAF9F7] hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto bg-white">
          {isSuccess ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#D94A0B] mx-auto" />
              <h3 className="text-lg font-bold text-[#111827]">{t.postSuccess}</h3>
              <p className="text-xs text-neutral-500">Xayeysiiskaaga wuxuu hadda ka muuqdaa bogga hore ee suuqa.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.postTitle}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Tusaale: Geel Hal ah ama Baabuur Land Cruiser"
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  required
                />
              </div>

              {/* Main Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.selectCategory}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'xoolo', label: t.xoolo, icon: <CamelIcon size={16} /> },
                    { id: 'dhul', label: t.dhul, icon: <LandIcon size={16} /> },
                    { id: 'guryo', label: t.guryo, icon: <HouseIcon size={16} /> },
                    { id: 'gaadiid', label: t.gaadiid, icon: <VehicleIcon size={16} /> },
                    { id: 'adeegyo', label: t.adeegyo, icon: <ServicesIcon size={16} /> }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as MainCategory)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        category === cat.id
                          ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                          : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                      }`}
                    >
                      <span className="mb-1">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* If Xoolo is selected -> Livestock Subcategories (Geel / Lo' / Ari) */}
              {category === 'xoolo' && (
                <div className="p-3.5 bg-[#FAF9F7] rounded-xl border border-neutral-200 space-y-2">
                  <label className="block text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                    <span>{t.selectLivestockSubCategory}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'geel', label: t.geel, icon: <CamelIcon size={16} /> },
                      { id: 'lo', label: t.lo, icon: <CattleIcon size={16} /> },
                      { id: 'ari', label: t.ari, icon: <GoatIcon size={16} /> }
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setLivestockSub(sub.id as LivestockSubCategory)}
                        className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          livestockSub === sub.id
                            ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                            : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                        }`}
                      >
                        {sub.icon}
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Listing Type & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Type (Iib / Kiro / Adeeg) */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Nooca Ganacsiga
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'iib', label: t.forSale },
                      { id: 'kiro', label: t.forRent },
                      { id: 'adeeg', label: t.service }
                    ].map((tp) => (
                      <button
                        key={tp.id}
                        type="button"
                        onClick={() => setListingType(tp.id as ListingType)}
                        className={`py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-all ${
                          listingType === tp.id
                            ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                            : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                        }`}
                      >
                        {tp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>{t.priceLabel} ($ USD)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="1000"
                      className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* City / Location & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>{t.cityLabel}</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                  >
                    <option value="Muqdisho, Banaadir">Muqdisho, Banaadir</option>
                    <option value="Hargeysa, Maroodi Jeex">Hargeysa, Maroodi Jeex</option>
                    <option value="Garowe, Nugaal">Garowe, Nugaal</option>
                    <option value="Boosaaso, Bari">Boosaaso, Bari</option>
                    <option value="Kismaayo, Jubbada Hoose">Kismaayo, Jubbada Hoose</option>
                    <option value="Baydhabo, Baay">Baydhabo, Baay</option>
                    <option value="Burco, Togdheer">Burco, Togdheer</option>
                    <option value="Borama, Awdal">Borama, Awdal</option>
                    <option value="Afgooye, Shabeellada Hoose">Afgooye, Shabeellada Hoose</option>
                    <option value="Jowhar, Shabeellada Dhexe">Jowhar, Shabeellada Dhexe</option>
                    <option value="Galkacyo, Mudug">Galkacyo, Mudug</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>Lambarka lagala soo xiriirayo</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+252 61 XXX XXXX"
                    className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.descriptionLabel}</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Faahfaahi xaaladda alaabta, da'da, tayada, dukumiintiyada..."
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                />
              </div>

              {/* Photo Upload & Presets */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#D94A0B]" />
                  <span>{t.uploadImages}</span>
                </label>
                
                <div className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl bg-[#FAF9F7]">
                  <img
                    src={imageUrl || 'https://images.unsplash.com/photo-1549419131-aa9b02aa9654?auto=format&fit=crop&w=200&q=80'}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Xulo Sawir Qalabkaaga</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-neutral-500">
                      ama dooro sawirrada diyaarka ah ee hoose:
                    </p>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {imagePresets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className="px-2 py-1 text-[10px] font-semibold bg-white hover:bg-[#FAF9F7] text-neutral-700 hover:text-[#D94A0B] border border-neutral-200 hover:border-[#D94A0B]/40 rounded-md transition-colors cursor-pointer"
                    >
                      📷 {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-create-listing-btn"
                type="submit"
                className="w-full py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer mt-3 shadow-xs"
              >
                {t.publishButton}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
