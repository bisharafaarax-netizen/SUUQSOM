import React, { useState } from 'react';
import { 
  X, 
  Users, 
  UserPlus, 
  UserCheck, 
  MessageSquare, 
  Search, 
  MapPin, 
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Friend } from '../types';

export const SocialFriendsModal: React.FC = () => {
  const { 
    t, 
    activeModal, 
    setActiveModal, 
    friends, 
    addFriend, 
    removeFriend,
    setActiveChatPartner,
    startCall
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');

  if (activeModal !== 'friends') return null;

  // Potential people to discover/connect with
  const discoverUsers: Omit<Friend, 'status'>[] = [
    {
      id: 'disc-1',
      name: 'Cabdirashiid Xuseen Wardheere',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      city: 'Muqdisho, Banaadir',
      phone: '+252 61 333 4455',
      isOnline: true,
      postsCount: 5
    },
    {
      id: 'disc-2',
      name: 'Sahra Maxamed Cigaal',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      city: 'Hargeysa, Somaliland',
      phone: '+252 63 888 1122',
      isOnline: false,
      postsCount: 9
    },
    {
      id: 'disc-3',
      name: 'Maxamuud Axmed Mire',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      city: 'Garowe, Puntland',
      phone: '+252 90 666 7788',
      isOnline: true,
      postsCount: 14
    }
  ];

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    f.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden my-4">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-xl text-[#D94A0B] border border-orange-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#111827]">{t.socialFriends}</h2>
              <p className="text-xs text-neutral-500">Ku darso saaxiibo cusub si aad ula xiriirto</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#FAF9F7] hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 bg-white">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#D94A0B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={t.findUsers}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F7] text-[#111827] rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
            />
          </div>

          {/* My Friends List */}
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              Saaxiibbadaada ({filteredFriends.length})
            </h3>

            {filteredFriends.length === 0 ? (
              <p className="text-xs text-neutral-500 py-3">{t.noFriendsYet}</p>
            ) : (
              <div className="space-y-2.5">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                        />
                        {friend.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D94A0B] rounded-full ring-2 ring-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#111827]">{friend.name}</h4>
                        <p className="text-[11px] text-neutral-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-[#D94A0B]" /> {friend.city} • {friend.postsCount} Alaab
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setActiveChatPartner({
                            id: friend.id,
                            name: friend.name,
                            avatar: friend.avatar,
                            phone: friend.phone
                          });
                          setActiveModal('chat');
                        }}
                        className="p-2 bg-[#FAF9F7] text-neutral-700 hover:bg-orange-50 hover:text-[#D94A0B] rounded-lg transition-colors cursor-pointer border border-neutral-200 hover:border-[#D94A0B]/30"
                        title={t.chat}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          startCall('voice', friend.name, friend.phone, friend.avatar);
                        }}
                        className="p-2 bg-[#FAF9F7] text-neutral-700 hover:bg-orange-50 hover:text-[#D94A0B] rounded-lg transition-colors cursor-pointer border border-neutral-200 hover:border-[#D94A0B]/30"
                        title={t.voiceCall}
                      >
                        <PhoneCall className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeFriend(friend.id)}
                        className="px-2 py-1 text-xs text-neutral-400 hover:text-red-600 font-medium cursor-pointer"
                      >
                        {t.removeFriend}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discover More Users Section */}
          <div className="pt-3 border-t border-neutral-200">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              Dadka aad ku dari karto (Discover People)
            </h3>

            <div className="space-y-2.5">
              {discoverUsers.map((user) => {
                const isAlreadyFriend = friends.some(f => f.id === user.id);
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#111827]">{user.name}</h4>
                        <p className="text-[11px] text-neutral-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-[#D94A0B]" /> {user.city}
                        </p>
                      </div>
                    </div>

                    {isAlreadyFriend ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#D94A0B] px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
                        <UserCheck className="w-3.5 h-3.5 text-[#D94A0B]" /> {t.following}
                      </span>
                    ) : (
                      <button
                        onClick={() => addFriend(user)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{t.addFriend}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

