import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Theme, 
  User, 
  Listing, 
  MainCategory, 
  LivestockSubCategory, 
  Conversation, 
  Message, 
  Friend, 
  CallSession 
} from '../types';
import { initialListings, initialFriends, initialConversations } from '../data/initialData';
import { getT } from '../translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: ReturnType<typeof getT>;
  
  currentUser: User | null;
  registerUser: (userData: Omit<User, 'id' | 'joinedDate'>) => { success: boolean; error?: string };
  loginUser: (emailOrPhone: string, password?: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  updateProfile: (updated: Partial<User>) => void;
  
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'likesCount' | 'viewsCount'>) => Listing;
  deleteListing: (id: string) => void;
  toggleLike: (id: string) => void;
  likedListingIds: string[];
  
  selectedCategory: MainCategory | 'all';
  setSelectedCategory: (cat: MainCategory | 'all') => void;
  selectedLivestockSub: LivestockSubCategory | 'all';
  setSelectedLivestockSub: (sub: LivestockSubCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals & Navigation
  activeModal: 'none' | 'auth' | 'create-listing' | 'listing-detail' | 'chat' | 'friends' | 'settings';
  setActiveModal: (modal: 'none' | 'auth' | 'create-listing' | 'listing-detail' | 'chat' | 'friends' | 'settings') => void;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  
  // Social & Friends
  friends: Friend[];
  addFriend: (friend: Omit<Friend, 'status'>) => void;
  removeFriend: (friendId: string) => void;
  
  // Chat
  conversations: Conversation[];
  activeChatPartner: { id: string; name: string; avatar?: string; phone: string; listingId?: string; listingTitle?: string } | null;
  setActiveChatPartner: (partner: { id: string; name: string; avatar?: string; phone: string; listingId?: string; listingTitle?: string } | null) => void;
  messages: Record<string, Message[]>;
  sendMessage: (convId: string, text: string) => void;
  sendVoiceMessage: (convId: string, audioUrl: string, durationSeconds: number) => void;
  startChatWithSeller: (listing: Listing) => void;
  
  // Calls
  callSession: CallSession;
  startCall: (type: 'voice' | 'video', name: string, phone: string, avatar?: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleSpeaker: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme & Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('suuq_lang') as Language) || 'so';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('suuq_theme') as Theme) || 'light';
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('suuq_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Listings - pure empty start for real user ads
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('suuq_v3_listings');
    return saved ? JSON.parse(saved) : initialListings;
  });

  // Liked Listings
  const [likedListingIds, setLikedListingIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('suuq_v3_likes');
    return saved ? JSON.parse(saved) : [];
  });

  // Category & Filter
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | 'all'>('all');
  const [selectedLivestockSub, setSelectedLivestockSub] = useState<LivestockSubCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [activeModal, setActiveModal] = useState<'none' | 'auth' | 'create-listing' | 'listing-detail' | 'chat' | 'friends' | 'settings'>('none');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Friends
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('suuq_v3_friends');
    return saved ? JSON.parse(saved) : initialFriends;
  });

  // Chat & Messages
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('suuq_v3_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [activeChatPartner, setActiveChatPartner] = useState<{ id: string; name: string; avatar?: string; phone: string; listingId?: string; listingTitle?: string } | null>(null);

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('suuq_v3_messages');
    return saved ? JSON.parse(saved) : {};
  });

  // Calls
  const [callSession, setCallSession] = useState<CallSession>({
    isOpen: false,
    type: 'voice',
    recipientName: '',
    recipientPhone: '',
    status: 'calling',
    durationSeconds: 0,
    isMuted: false,
    isVideoOff: false,
    isSpeakerOn: true
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('suuq_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('suuq_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('suuq_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('suuq_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('suuq_v3_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('suuq_v3_likes', JSON.stringify(likedListingIds));
  }, [likedListingIds]);

  useEffect(() => {
    localStorage.setItem('suuq_v3_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('suuq_v3_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('suuq_v3_messages', JSON.stringify(messages));
  }, [messages]);

  // Call timer effect
  useEffect(() => {
    let timer: any;
    if (callSession.isOpen && callSession.status === 'connected') {
      timer = setInterval(() => {
        setCallSession(prev => ({ ...prev, durationSeconds: prev.durationSeconds + 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callSession.isOpen, callSession.status]);

  // Connect call after 2.5s simulation
  useEffect(() => {
    if (callSession.isOpen && callSession.status === 'calling') {
      const ringTimer = setTimeout(() => {
        setCallSession(prev => ({ ...prev, status: 'connected' }));
      }, 2400);
      return () => clearTimeout(ringTimer);
    }
  }, [callSession.isOpen, callSession.status]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Registration & Auth
  const registerUser = (userData: Omit<User, 'id' | 'joinedDate'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      avatar: userData.avatar || (userData.gender === 'lab' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80')
    };
    setCurrentUser(newUser);
    return { success: true };
  };

  const loginUser = (emailOrPhone: string, _password?: string) => {
    // If there's an existing registered user matching, or create a quick session
    const user: User = {
      id: `user-${Date.now()}`,
      fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Isticmaale Suuq',
      phone: emailOrPhone.includes('@') ? '+252 61 500 0000' : emailOrPhone,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone.replace(/[^0-9]/g, '')}@suuq.so`,
      birthYear: 1996,
      birthMonth: 5,
      birthDay: 15,
      gender: 'lab',
      city: 'Muqdisho',
      joinedDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(user);
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      ...updated
    });
  };

  // Listings CRUD
  const addListing = (listingData: Omit<Listing, 'id' | 'createdAt' | 'likesCount' | 'viewsCount'>) => {
    const newListing: Listing = {
      ...listingData,
      id: `list-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      viewsCount: 1,
      userId: currentUser?.id || 'guest',
      sellerName: currentUser?.fullName || 'Iibiye Suuq',
      sellerPhone: currentUser?.phone || '+252 61 000 0000',
      sellerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      sellerVerified: true
    };
    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    if (selectedListing?.id === id) {
      setSelectedListing(null);
      setActiveModal('none');
    }
  };

  const toggleLike = (id: string) => {
    setLikedListingIds(prev => {
      const isLiked = prev.includes(id);
      const updated = isLiked ? prev.filter(itemId => itemId !== id) : [...prev, id];
      // update count
      setListings(list =>
        list.map(item => {
          if (item.id === id) {
            return { ...item, likesCount: isLiked ? Math.max(0, item.likesCount - 1) : item.likesCount + 1 };
          }
          return item;
        })
      );
      return updated;
    });
  };

  // Friends / Social
  const addFriend = (newFriend: Omit<Friend, 'status'>) => {
    setFriends(prev => {
      const exists = prev.find(f => f.id === newFriend.id);
      if (exists) {
        return prev.map(f => f.id === newFriend.id ? { ...f, status: 'connected' } : f);
      }
      return [{ ...newFriend, status: 'connected' }, ...prev];
    });
  };

  const removeFriend = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  // Chat
  const startChatWithSeller = (listing: Listing) => {
    let conv = conversations.find(c => c.listingId === listing.id || c.participantId === listing.userId);
    const convId = conv ? conv.id : `conv-${Date.now()}`;

    if (!conv) {
      const newConv: Conversation = {
        id: convId,
        participantId: listing.userId,
        participantName: listing.sellerName,
        participantAvatar: listing.sellerAvatar,
        participantPhone: listing.sellerPhone,
        listingId: listing.id,
        listingTitle: listing.title,
        listingImage: listing.images[0],
        lastMessage: 'Waxaan rabaa inaan wax ka ogaado alaabtan',
        lastTimestamp: 'Hadda',
        unreadCount: 0
      };
      setConversations(prev => [newConv, ...prev]);
    }

    setActiveChatPartner({
      id: listing.userId,
      name: listing.sellerName,
      avatar: listing.sellerAvatar,
      phone: listing.sellerPhone,
      listingId: listing.id,
      listingTitle: listing.title
    });
    setActiveModal('chat');
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser?.id || 'current',
      senderName: currentUser?.fullName || 'Aniga',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    // Update conversation last message
    setConversations(prev =>
      prev.map(c =>
        c.id === convId
          ? { ...c, lastMessage: text.trim(), lastTimestamp: 'Hadda' }
          : c
      )
    );

    // Realistic auto-reply from seller simulation after 1.5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        conversationId: convId,
        senderId: 'seller',
        senderName: activeChatPartner?.name || 'Iibiye',
        text: 'Wcs walaal, mahadsanid. Haa alaabtu wali way jirtaa, diyaar ma u tahay inaad aragto?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), replyMsg]
      }));
    }, 1500);
  };

  const sendVoiceMessage = (convId: string, audioUrl: string, durationSeconds: number) => {
    const newMsg: Message = {
      id: `msg-voice-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser?.id || 'current',
      senderName: currentUser?.fullName || 'Aniga',
      text: '🎤 Farriin Cod ah (Voice Note)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      type: 'audio',
      audioUrl,
      audioDuration: durationSeconds || 5
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    // Update conversation last message
    setConversations(prev =>
      prev.map(c =>
        c.id === convId
          ? { ...c, lastMessage: '🎤 Farriin Cod ah', lastTimestamp: 'Hadda' }
          : c
      )
    );

    // Realistic auto-reply simulation
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        conversationId: convId,
        senderId: 'seller',
        senderName: activeChatPartner?.name || 'Iibiye',
        text: 'Wcs walaal, waan dhageystay codkaaga. Haa, wax walba waa sidii aad sheegtay, xilligee ayaad doonaysaa inaan kulano?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), replyMsg]
      }));
    }, 2000);
  };

  // Calls
  const startCall = (type: 'voice' | 'video', name: string, phone: string, avatar?: string) => {
    setCallSession({
      isOpen: true,
      type,
      recipientName: name,
      recipientPhone: phone,
      recipientAvatar: avatar,
      status: 'calling',
      durationSeconds: 0,
      isMuted: false,
      isVideoOff: false,
      isSpeakerOn: true
    });
  };

  const endCall = () => {
    setCallSession(prev => ({ ...prev, status: 'ended' }));
    setTimeout(() => {
      setCallSession(prev => ({ ...prev, isOpen: false }));
    }, 600);
  };

  const toggleMute = () => {
    setCallSession(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const toggleVideo = () => {
    setCallSession(prev => ({ ...prev, isVideoOff: !prev.isVideoOff }));
  };

  const toggleSpeaker = () => {
    setCallSession(prev => ({ ...prev, isSpeakerOn: !prev.isSpeakerOn }));
  };

  const t = getT(language);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        listings,
        addListing,
        deleteListing,
        toggleLike,
        likedListingIds,
        selectedCategory,
        setSelectedCategory,
        selectedLivestockSub,
        setSelectedLivestockSub,
        searchQuery,
        setSearchQuery,
        activeModal,
        setActiveModal,
        selectedListing,
        setSelectedListing,
        friends,
        addFriend,
        removeFriend,
        conversations,
        activeChatPartner,
        setActiveChatPartner,
        messages,
        sendMessage,
        sendVoiceMessage,
        startChatWithSeller,
        callSession,
        startCall,
        endCall,
        toggleMute,
        toggleVideo,
        toggleSpeaker
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
