import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MainCategory, LivestockSubCategory, ListingType } from '../types';
import { 
  CamelIcon, 
  CowIcon, 
  GoatIcon, 
  HorseIcon, 
  ChickenIcon, 
  LivestockIcon, 
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
    { label: "Lo'", url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80' },
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
        : livestockSub === 'ari'
        ? 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80'
        : livestockSub === 'fardo'
        ? 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80'
        : livestockSub === 'digaag'
        ? 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      guryo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      dhul: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      gaadiid: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      electronics: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      dharka: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      alaabta_guriga: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      shaqooyin: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      adeegyo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      cunto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      dukaamo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
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
      sellerName: currentUser?.fullName || 'Iibiye SUUQSOM',
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

  const allMainCategories: { id: MainCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'xoolo', label: t.xoolo, icon: <CamelIcon size={16} /> },
    { id: 'dhul', label: t.dhul, icon: <LandFarmIcon size={16} /> },
    { id: 'guryo', label: t.guryo, icon: <HouseIcon size={16} /> },
    { id: 'gaadiid', label: t.gaadiid, icon: <VehicleIcon size={16} /> },
    { id: 'electronics', label: t.electronics, icon: <ElectronicsIcon size={16} /> },
    { id: 'dharka', label: t.dharka, icon: <ClothingIcon size={16} /> },
    { id: 'alaabta_guriga', label: t.alaabta_guriga, icon: <FurnitureIcon size={16} /> },
    { id: 'shaqooyin', label: t.shaqooyin, icon: <JobsIcon size={16} /> },
    { id: 'adeegyo', label: t.adeegyo, icon: <ServicesIcon size={16} /> },
    { id: 'cunto', label: t.cunto, icon: <FoodIcon size={16} /> },
    { id: 'dukaamo', label: t.dukaamo, icon: <StoreIcon size={16} /> }
  ];

  const livestockSubs: { id: LivestockSubCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'geel', label: t.geel, icon: <CamelIcon size={15} /> },
    { id: 'lo', label: t.lo, icon: <CowIcon size={15} /> },
    { id: 'ari', label: t.ari, icon: <GoatIcon size={15} /> },
    { id: 'fardo', label: t.fardo, icon: <HorseIcon size={15} /> },
    { id: 'digaag', label: t.digaag, icon: <ChickenIcon size={15} /> },
    { id: 'kale', label: t.livestockOther, icon: <LivestockIcon size={15} /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-neutral-200">
          <div>
            <h2 className="text-base font-black text-[#111827]">{t.createPost}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Soo geli xayeysiiskaaga SUUQSOM si macaamiishu kuula soo xiriiraan</p>
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
              <p className="text-xs text-neutral-500">Xayeysiiskaaga wuxuu hadda ka muuqdaa bogga hore ee SUUQSOM.</p>
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
                  placeholder="Tusaale: Awr Geel ah, Boos Dhul ah, ama Toyota Land Cruiser"
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {allMainCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        category === cat.id
                          ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                          : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                      }`}
                    >
                      <span className="shrink-0">{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* If Xoolo is selected -> Livestock Subcategories */}
              {category === 'xoolo' && (
                <div className="p-3.5 bg-[#FAF9F7] rounded-xl border border-neutral-200 space-y-2">
                  <label className="block text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                    <span>{t.selectLivestockSubCategory}:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {livestockSubs.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setLivestockSub(sub.id)}
                        className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          livestockSub === sub.id
                            ? 'bg-[#D94A0B] text-white border-[#D94A0B] shadow-xs'
                            : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                        }`}
                      >
                        <span className="shrink-0">{sub.icon}</span>
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
                    <option value="Beledweyne, Hiiraan">Beledweyne, Hiiraan</option>
                    <option value="Afgooye, Shabeellada Hoose">Afgooye, Shabeellada Hoose</option>
                    <option value="Jowhar, Shabeellada Dhexe">Jowhar, Shabeellada Dhexe</option>
                    <option value="Galkacyo, Mudug">Galkacyo, Mudug</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D94A0B]" />
                    <span>{t.phone}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+252 61 ..."
                    className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.descriptionLabel}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Sharax xaaladda, faahfaahinta, iyo meesha laguugu imaan karo..."
                  className="w-full px-3 py-2 bg-[#FAF9F7] text-[#111827] rounded-lg border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                />
              </div>

              {/* Quick Image Presets */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Sawirro Diyaar ah (Dooro mid degdeg ah):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                        imageUrl === preset.url
                          ? 'bg-[#D94A0B] text-white border-[#D94A0B]'
                          : 'bg-[#FAF9F7] text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image Upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ama soo geli sawir (Upload / URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#FAF9F7] file:text-neutral-700 hover:file:bg-neutral-100 border border-neutral-200 rounded-lg p-1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.publishButton}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
