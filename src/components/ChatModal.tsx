import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  PhoneCall, 
  Video, 
  MessageSquare, 
  Mic, 
  Square,
  Trash2,
  CheckCheck, 
  Sparkles,
  ArrowLeft,
  Volume2,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoicePlayer } from './VoicePlayer';

export const ChatModal: React.FC = () => {
  const { 
    t, 
    activeModal, 
    setActiveModal, 
    conversations, 
    activeChatPartner, 
    setActiveChatPartner, 
    messages, 
    sendMessage,
    sendVoiceMessage,
    currentUser,
    startCall
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Set default partner if none selected
  useEffect(() => {
    if (activeModal === 'chat' && !activeChatPartner && conversations.length > 0) {
      const first = conversations[0];
      setActiveChatPartner({
        id: first.participantId,
        name: first.participantName,
        avatar: first.participantAvatar,
        phone: first.participantPhone,
        listingId: first.listingId,
        listingTitle: first.listingTitle
      });
    }
  }, [activeModal, activeChatPartner, conversations]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChatPartner]);

  // Cleanup media recording when component unmounts
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (activeModal !== 'chat') return null;

  const currentConv = conversations.find(
    c => c.participantId === activeChatPartner?.id || (activeChatPartner?.listingId && c.listingId === activeChatPartner.listingId)
  );

  const convId = currentConv?.id || 'conv-1';
  const currentMessages = messages[convId] || [];

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(convId, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickQuestion = (q: string) => {
    sendMessage(convId, q);
  };

  // Start Voice Recording
  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start(100);
        setIsRecording(true);

        timerIntervalRef.current = setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      } else {
        // Fallback simulation recorder if mediaDevices is not available
        setIsRecording(true);
        timerIntervalRef.current = setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      }
    } catch (err: any) {
      console.warn('Microphone access note:', err);
      // If mic permission blocked, start fallback recording mode so the user can still experience full voice notes
      setIsRecording(true);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  // Cancel Recording
  const cancelRecording = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
  };

  // Helper to generate a playable audio tone WAV blob fallback
  const createSyntheticAudioBlob = (durationSecs: number): Blob => {
    const sampleRate = 8000;
    const numSamples = Math.max(sampleRate * 2, sampleRate * durationSecs);
    const buffer = new ArrayBuffer(44 + numSamples);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate, true);
    view.setUint16(32, 1, true);
    view.setUint16(34, 8, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples, true);

    // Generate pleasing soft voice-like acoustic wave
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const sample = 128 + Math.round(40 * Math.sin(2 * Math.PI * 440 * t) * Math.cos(2 * Math.PI * 5 * t));
      view.setUint8(44 + i, sample);
    }
    return new Blob([buffer], { type: 'audio/wav' });
  };

  // Stop & Send Voice Recording
  const sendVoiceNote = () => {
    const finalDuration = Math.max(1, recordingSeconds);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        let audioBlob: Blob;
        if (audioChunksRef.current.length > 0) {
          audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        } else {
          audioBlob = createSyntheticAudioBlob(finalDuration);
        }
        const audioUrl = URL.createObjectURL(audioBlob);
        sendVoiceMessage(convId, audioUrl, finalDuration);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      mediaRecorderRef.current.stop();
    } else {
      // Fallback synthetic audio
      const audioBlob = createSyntheticAudioBlob(finalDuration);
      const audioUrl = URL.createObjectURL(audioBlob);
      sendVoiceMessage(convId, audioUrl, finalDuration);
    }

    setIsRecording(false);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
  };

  const formatRecordingTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#111827]/50 backdrop-blur-xs overflow-hidden">
      <div className="relative w-full max-w-4xl h-[90vh] sm:h-[80vh] bg-white rounded-2xl shadow-xl border border-neutral-200/90 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar: Conversations list */}
        <div className="hidden md:flex flex-col w-72 bg-[#FAF9F7] border-r border-neutral-200">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-white">
            <h3 className="font-bold text-[#111827] flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-[#D94A0B]" />
              <span>{t.conversations}</span>
            </h3>
            <span className="text-xs font-bold bg-[#D94A0B]/10 text-[#D94A0B] px-2 py-0.5 rounded-full border border-[#D94A0B]/20">
              {conversations.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-200/60">
            {conversations.map((conv) => {
              const isSelected = activeChatPartner?.id === conv.participantId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveChatPartner({
                      id: conv.participantId,
                      name: conv.participantName,
                      avatar: conv.participantAvatar,
                      phone: conv.participantPhone,
                      listingId: conv.listingId,
                      listingTitle: conv.listingTitle
                    });
                  }}
                  className={`w-full text-left p-3.5 flex items-center gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white border-l-4 border-[#D94A0B] shadow-xs'
                      : 'hover:bg-white/80'
                  }`}
                >
                  <img
                    src={conv.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-[#111827] truncate">
                        {conv.participantName}
                      </p>
                      <span className="text-[10px] text-neutral-400 font-medium">{conv.lastTimestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-white">
          
          {/* Chat Header with Voice & Video Call triggers */}
          <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal('none')}
                className="md:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-[#FAF9F7]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="relative">
                <img
                  src={activeChatPartner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={activeChatPartner?.name}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D94A0B] rounded-full ring-2 ring-white" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#111827]">
                  {activeChatPartner?.name || 'Iibiye Suuq'}
                </h4>
                <p className="text-[10px] text-neutral-500 font-medium">
                  {activeChatPartner?.listingTitle ? `Alaabta: ${activeChatPartner.listingTitle}` : 'Khadka wuu ku jiraa (Online)'}
                </p>
              </div>
            </div>

            {/* Calling & Close Controls */}
            <div className="flex items-center gap-1.5">
              {/* Voice Call */}
              <button
                id="chat-voice-call-btn"
                onClick={() => {
                  if (activeChatPartner) {
                    startCall('voice', activeChatPartner.name, activeChatPartner.phone, activeChatPartner.avatar);
                  }
                }}
                className="p-2 rounded-lg bg-[#FAF9F7] text-neutral-700 hover:bg-neutral-100 hover:text-[#D94A0B] transition-colors cursor-pointer border border-neutral-200"
                title={t.voiceCall}
              >
                <PhoneCall className="w-4 h-4" />
              </button>

              {/* Video Call */}
              <button
                id="chat-video-call-btn"
                onClick={() => {
                  if (activeChatPartner) {
                    startCall('video', activeChatPartner.name, activeChatPartner.phone, activeChatPartner.avatar);
                  }
                }}
                className="p-2 rounded-lg bg-[#FAF9F7] text-neutral-700 hover:bg-neutral-100 hover:text-[#D94A0B] transition-colors cursor-pointer border border-neutral-200"
                title={t.videoCall}
              >
                <Video className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setActiveModal('none')}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F7]/40">
            {currentMessages.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#D94A0B]" />
                <p className="text-xs">Bilaaw wadahadalka adigoo isticmaalaya su'aalaha hoose ama qor farriin/duub cod.</p>
              </div>
            ) : (
              currentMessages.map((msg) => {
                const isMe = msg.senderId === (currentUser?.id || 'current');
                const isAudio = msg.type === 'audio';

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md px-3.5 py-2.5 rounded-2xl text-xs shadow-xs ${
                        isMe
                          ? 'bg-[#D94A0B] text-white rounded-tr-xs'
                          : 'bg-white text-[#111827] rounded-tl-xs border border-neutral-200'
                      }`}
                    >
                      {isAudio ? (
                        <VoicePlayer 
                          audioUrl={msg.audioUrl} 
                          duration={msg.audioDuration || 6} 
                          isMe={isMe} 
                        />
                      ) : (
                        <p className="leading-relaxed whitespace-pre-line font-medium">{msg.text}</p>
                      )}

                      <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isMe ? 'text-white/80' : 'text-neutral-400'}`}>
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Somali Prompts */}
          <div className="px-4 py-2 bg-white border-t border-neutral-100">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
              {t.quickQuestions}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[t.q1, t.q2, t.q3, t.q4].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="shrink-0 px-2.5 py-1 bg-[#FAF9F7] hover:bg-orange-50 text-neutral-700 hover:text-[#D94A0B] text-xs font-semibold rounded-lg border border-neutral-200 hover:border-[#D94A0B]/30 transition-colors cursor-pointer"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message & Voice Note Input Bar */}
          <div className="p-3 bg-white border-t border-neutral-200">
            {isRecording ? (
              /* Active Voice Recording Bar */
              <div className="flex items-center justify-between bg-orange-50/50 border border-orange-200 rounded-xl px-3.5 py-2">
                {/* Recording indicator & timer */}
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-[#D94A0B] rounded-full animate-ping absolute opacity-75" />
                    <span className="w-2.5 h-2.5 bg-[#D94A0B] rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#111827] flex items-center gap-1">
                      <Radio className="w-3 h-3 text-[#D94A0B] animate-pulse" />
                      {t.recordingVoice}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-neutral-600">
                      {formatRecordingTime(recordingSeconds)}
                    </span>
                  </div>

                  {/* Animated recording wave bars */}
                  <div className="hidden sm:flex items-center gap-1 h-4 ml-2">
                    {[40, 80, 60, 100, 75, 45, 90, 60].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-0.5 bg-[#D94A0B] rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                {/* Recording Controls: Cancel & Send */}
                <div className="flex items-center gap-2">
                  {/* Cancel Recording */}
                  <button
                    type="button"
                    onClick={cancelRecording}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-600 text-xs font-medium rounded-lg border border-neutral-200 transition-colors cursor-pointer"
                    title={t.cancelRecording}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.cancelRecording}</span>
                  </button>

                  {/* Send Voice Note */}
                  <button
                    type="button"
                    onClick={sendVoiceNote}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#D94A0B] hover:bg-[#C23E08] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                    title={t.sendVoice}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.sendVoice}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Text + Voice Input Bar */
              <form onSubmit={handleSendText} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 px-3.5 py-2.5 bg-[#FAF9F7] text-[#111827] rounded-xl text-xs border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#D94A0B] focus:border-[#D94A0B]"
                />

                {/* Voice Note Recording Button */}
                <button
                  type="button"
                  id="record-voice-btn"
                  onClick={startRecording}
                  className="w-9 h-9 rounded-xl bg-[#FAF9F7] hover:bg-orange-50 text-neutral-700 hover:text-[#D94A0B] flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-neutral-200 hover:border-[#D94A0B]/30"
                  title={`${t.recordVoice} - Guji si aad cod u duubto`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Send Text Button */}
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="w-9 h-9 rounded-xl bg-[#D94A0B] hover:bg-[#C23E08] text-white flex items-center justify-center disabled:opacity-40 transition-colors cursor-pointer shrink-0 shadow-xs"
                  title={t.send}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

