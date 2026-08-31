export type Language = 'so' | 'en';
export type Theme = 'light' | 'dark';

export type MainCategory = 
  | 'xoolo' 
  | 'dhul' 
  | 'guryo' 
  | 'gaadiid' 
  | 'electronics' 
  | 'dharka' 
  | 'alaabta_guriga' 
  | 'shaqooyin' 
  | 'adeegyo' 
  | 'cunto' 
  | 'dukaamo';

export type LivestockSubCategory = 'geel' | 'lo' | 'ari' | 'fardo' | 'digaag' | 'kale';
export type ListingType = 'iib' | 'kiro' | 'adeeg';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: 'lab' | 'dheddig';
  avatar?: string;
  city?: string;
  bio?: string;
  joinedDate: string;
  rating?: number;
  isVerified?: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: MainCategory;
  livestockSubCategory?: LivestockSubCategory;
  listingType: ListingType;
  price: number;
  currency: 'USD' | 'SOS';
  location: string;
  images: string[];
  userId: string;
  sellerName: string;
  sellerPhone: string;
  sellerAvatar?: string;
  sellerVerified?: boolean;
  createdAt: string;
  likesCount: number;
  viewsCount: number;
  features?: string[];
  isFeatured?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  type?: 'text' | 'image' | 'audio' | 'offer';
  audioUrl?: string;
  audioDuration?: number;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantPhone: string;
  listingId?: string;
  listingTitle?: string;
  listingImage?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  city: string;
  phone: string;
  isOnline: boolean;
  postsCount: number;
  status: 'connected' | 'pending';
}

export interface CallSession {
  isOpen: boolean;
  type: 'voice' | 'video';
  recipientName: string;
  recipientPhone: string;
  recipientAvatar?: string;
  status: 'calling' | 'connected' | 'ended';
  durationSeconds: number;
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeakerOn: boolean;
}
