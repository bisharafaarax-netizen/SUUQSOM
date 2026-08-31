import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  PhoneCall, 
  Video, 
  Trash2, 
  CheckCircle, 
  Calendar, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CamelIcon, CattleIcon, GoatIcon, LandIcon, HouseIcon, VehicleIcon } from './CustomIcons';

export const ListingDetailModal: React.FC = () => {
  const { 
    t, 
    selectedListing, 
    setSelectedListing, 
    activeModal, 
    setActiveModal, 
    toggleLike, 
    likedListingIds,
    deleteListing,
    currentUser,
    startChatWithSeller,
    startCall
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (activeModal !== 'listing-detail' || !selectedListing) return null;

  const isLiked = likedListingIds.includes(selectedListing.id);
  const isOwner = currentUser?.id === selectedListing.userId;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDelete = () => {
    deleteListing(selectedListing.id);
  };

  const getCategoryIcon = () => {
    if (selectedListing.category === 'xoolo') {
      if (selectedListing.livestockSubCategory === 'geel') return <CamelIcon size={18} />;
      if (selectedListing.livestockSubCategory === 'lo') return <CattleIcon size={18} />;
      return <GoatIcon size={18} />;
    }
    if (selectedListing.category === 'dhul') return <LandIcon size={18} />;
    if (selectedListing.category === 'guryo') return <HouseIcon size={18} />;
    if (selectedListing.category === 'gaadiid') return <VehicleIcon size={18} />;
    return <MapPin size={18} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-4">
        
        {/* Close Button */}
        <button
          id="listing-detail-close-btn"
          onClick={() => { setSelectedListing(null); setActiveModal('none'); }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-sm border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content Scroll Area */}
        <div className="max-h-[85vh] overflow-y-auto bg-white">
          
          {/* Main Image Slider */}
          <div className="relative aspect-16/10 w-full bg-[#FAF9F7] overflow-hidden border-b border-neutral-200">
            <img
              src={selectedListing.images[activeImageIndex] || selectedListing.images[0]}
              alt={selectedListing.title}
              className="w-full h-full object-cover"
            />

            {/* Next/Prev Image navigation if multiple */}
            {selectedListing.images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedListing.images.length - 1 : prev - 1))}
                  className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-sm transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === selectedListing.images.length - 1 ? 0 : prev + 1))}
                  className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center border border-neutral-200 shadow-sm transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 bg-[#111827]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                {getCategoryIcon()}
                <span className="capitalize">
                  {selectedListing.livestockSubCategory
                    ? (selectedListing.livestockSubCategory === 'geel' ? t.geel : selectedListing.livestockSubCategory === 'lo' ? t.lo : t.ari)
                    : (selectedListing.listingType === 'iib' ? t.forSale : selectedListing.listingType === 'kiro' ? t.forRent : t.service)}
                </span>
              </span>
            </div>

            {/* Price Tag Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/95 text-[#D94A0B] px-3 py-1.5 rounded-xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] text-neutral-500 font-semibold">{t.price}</p>
              <p className="text-base sm:text-lg font-black text-[#D94A0B]">
                ${selectedListing.price.toLocaleString()} {selectedListing.currency}
              </p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Title, Location & Quick Social (Like/Share/Delete) */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-200 pb-5">
              <div className="space-y-1">
                <h1 className="text-lg sm:text-xl font-black text-[#111827] leading-tight">
                  {selectedListing.title}
                </h1>
                <p className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#D94A0B] shrink-0" />
                  <span>{selectedListing.location}</span>
                </p>
              </div>

              {/* Like, Share, Delete Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="detail-like-btn"
                  onClick={() => toggleLike(selectedListing.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    isLiked
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-white text-neutral-700 hover:bg-[#FAF9F7] border-neutral-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isLiked ? t.liked : t.like} ({selectedListing.likesCount})</span>
                </button>

                <button
                  id="detail-share-btn"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-neutral-700 hover:bg-[#FAF9F7] border border-neutral-200 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-neutral-600" />}
                  <span>{copiedLink ? 'La guriyay!' : t.share}</span>
                </button>

                {/* Delete button */}
                <button
                  id="detail-delete-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                  title={t.deletePost}
                  className="p-1.5 rounded-lg text-xs font-semibold text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-neutral-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Delete Confirmation Alert */}
            {showDeleteConfirm && (
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-2">
                <h4 className="text-xs font-bold text-red-800">{t.deleteConfirmTitle}</h4>
                <p className="text-xs text-red-700">{t.deleteConfirmText}</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {t.confirmDelete}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1.5 bg-white text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                {t.description}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {selectedListing.description}
              </p>
            </div>

            {/* Specifications / Features */}
            {selectedListing.features && selectedListing.features.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                  {t.specifications}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedListing.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF9F7] text-neutral-800 text-xs font-medium border border-neutral-200"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information Card */}
            <div className="bg-[#FAF9F7] rounded-xl p-4 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedListing.sellerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={selectedListing.sellerName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#111827]">
                      {selectedListing.sellerName}
                    </h4>
                    {selectedListing.sellerVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#D94A0B]" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {selectedListing.sellerPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#D94A0B] font-semibold bg-white px-2.5 py-1 rounded-full border border-neutral-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D94A0B]" />
                <span>Iibiye la Xaqiijiyay</span>
              </div>
            </div>

            {/* ACTION BUTTONS: Chat, Voice Call, Video Call */}
            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {t.contactSeller}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* 1. Chat (Qoraal) */}
                <button
                  id="detail-start-chat-btn"
                  onClick={() => {
                    if (!currentUser) {
                      setActiveModal('auth');
                    } else {
                      startChatWithSeller(selectedListing);
                    }
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#D94A0B] hover:bg-[#C23E08] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.chat}</span>
                </button>

                {/* 2. Voice Call */}
                <button
                  id="detail-voice-call-btn"
                  onClick={() => {
                    startCall('voice', selectedListing.sellerName, selectedListing.sellerPhone, selectedListing.sellerAvatar);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-[#FAF9F7] text-[#111827] rounded-xl font-bold text-xs border border-neutral-300 transition-colors cursor-pointer shadow-xs"
                >
                  <PhoneCall className="w-4 h-4 text-[#D94A0B]" />
                  <span>{t.voiceCall}</span>
                </button>

                {/* 3. Video Call */}
                <button
                  id="detail-video-call-btn"
                  onClick={() => {
                    startCall('video', selectedListing.sellerName, selectedListing.sellerPhone, selectedListing.sellerAvatar);
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-[#FAF9F7] text-[#111827] rounded-xl font-bold text-xs border border-neutral-300 transition-colors cursor-pointer shadow-xs"
                >
                  <Video className="w-4 h-4 text-[#D94A0B]" />
                  <span>{t.videoCall}</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
