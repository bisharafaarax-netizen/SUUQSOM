import React from 'react';
import { Heart, MapPin, CheckCircle, Tag } from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';
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

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    t, 
    toggleLike, 
    likedListingIds, 
    setSelectedListing, 
    setActiveModal 
  } = useApp();

  const isLiked = likedListingIds.includes(listing.id);

  const handleCardClick = () => {
    setSelectedListing(listing);
    setActiveModal('listing-detail');
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(listing.id);
  };

  const getCategoryIcon = () => {
    if (listing.category === 'xoolo') {
      if (listing.livestockSubCategory === 'geel') return <CamelIcon size={14} />;
      if (listing.livestockSubCategory === 'lo') return <CowIcon size={14} />;
      if (listing.livestockSubCategory === 'ari') return <GoatIcon size={14} />;
      if (listing.livestockSubCategory === 'fardo') return <HorseIcon size={14} />;
      if (listing.livestockSubCategory === 'digaag') return <ChickenIcon size={14} />;
      return <LivestockIcon size={14} />;
    }
    if (listing.category === 'dhul') return <LandFarmIcon size={14} />;
    if (listing.category === 'guryo') return <HouseIcon size={14} />;
    if (listing.category === 'gaadiid') return <VehicleIcon size={14} />;
    if (listing.category === 'electronics') return <ElectronicsIcon size={14} />;
    if (listing.category === 'dharka') return <ClothingIcon size={14} />;
    if (listing.category === 'alaabta_guriga') return <FurnitureIcon size={14} />;
    if (listing.category === 'shaqooyin') return <JobsIcon size={14} />;
    if (listing.category === 'adeegyo') return <ServicesIcon size={14} />;
    if (listing.category === 'cunto') return <FoodIcon size={14} />;
    if (listing.category === 'dukaamo') return <StoreIcon size={14} />;
    return <Tag size={14} />;
  };

  const getSubcategoryLabel = () => {
    if (listing.livestockSubCategory) {
      switch (listing.livestockSubCategory) {
        case 'geel': return t.geel;
        case 'lo': return t.lo;
        case 'ari': return t.ari;
        case 'fardo': return t.fardo;
        case 'digaag': return t.digaag;
        case 'kale': return t.livestockOther;
        default: return t.xoolo;
      }
    }
    return listing.listingType === 'iib' ? t.forSale : listing.listingType === 'kiro' ? t.forRent : t.service;
  };

  return (
    <div
      id={`listing-card-${listing.id}`}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col cursor-pointer"
    >
      {/* Image Container with Like Button */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-[#FAF9F7]">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />

        {/* Like Heart Button */}
        <button
          id={`like-btn-${listing.id}`}
          onClick={handleLikeClick}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-xs transition-colors cursor-pointer border border-neutral-200 shadow-xs ${
            isLiked
              ? 'text-rose-500'
              : 'text-neutral-600 hover:text-rose-500'
          }`}
          aria-label={t.like}
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Listing Type / Subcategory Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#111827]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-xs">
          <span className="shrink-0">{getCategoryIcon()}</span>
          <span className="capitalize">{getSubcategoryLabel()}</span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-[#D94A0B] text-xs font-black px-2.5 py-1 rounded-lg border border-neutral-200 shadow-xs">
          ${listing.price.toLocaleString()} {listing.currency}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Title */}
          <h3 className="text-sm font-bold text-[#111827] line-clamp-1 group-hover:text-[#D94A0B] transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1 text-xs text-neutral-500 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </p>
        </div>

        {/* Seller Info & Likes Count Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <img
              src={listing.sellerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&q=80'}
              alt={listing.sellerName}
              className="w-5 h-5 rounded-full object-cover shrink-0 border border-neutral-200"
            />
            <span className="truncate text-[#111827] font-semibold text-[11px]">{listing.sellerName}</span>
            {listing.sellerVerified && (
              <CheckCircle className="w-3 h-3 text-[#D94A0B] shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <Heart className={`w-3 h-3 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
            <span>{listing.likesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
