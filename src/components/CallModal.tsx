import React, { useEffect, useRef } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Video, 
  VideoOff, 
  PhoneCall, 
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CallModal: React.FC = () => {
  const { 
    t, 
    callSession, 
    endCall, 
    toggleMute, 
    toggleVideo, 
    toggleSpeaker 
  } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);

  // Optional local camera access if video call is chosen and video is on
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (callSession.isOpen && callSession.type === 'video' && !callSession.isVideoOff) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          // Fallback silently to simulated video
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [callSession.isOpen, callSession.type, callSession.isVideoOff]);

  if (!callSession.isOpen) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white text-[#111827] rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col items-center justify-between p-6 min-h-[440px]">
        
        {/* Top Bar Status */}
        <div className="w-full flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
            <Radio className="w-3 h-3 text-[#D94A0B] animate-pulse" />
            <span className="font-bold text-[#D94A0B] text-[11px]">
              {callSession.type === 'video' ? 'Wicitaan Muuqaal (Video)' : 'Wicitaan Cod ah (Voice)'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D94A0B]" />
            <span>Xiran (Encrypted)</span>
          </div>
        </div>

        {/* Center Content: Avatar / Video */}
        <div className="flex flex-col items-center text-center my-auto space-y-4">
          
          {callSession.type === 'video' && !callSession.isVideoOff ? (
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-[#FAF9F7] border border-neutral-300 shadow-sm">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 text-center text-xs font-semibold text-white bg-[#111827]/70 py-1 rounded-md backdrop-blur-xs">
                {callSession.recipientName}
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Subtle Pulse animation ring */}
              {callSession.status === 'connected' && (
                <div className="absolute -inset-2 rounded-full bg-orange-200 animate-ping opacity-75" />
              )}
              
              <img
                src={callSession.recipientAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={callSession.recipientName}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#D94A0B]/30 shadow-sm"
              />
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-[#111827] tracking-tight">
              {callSession.recipientName}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 font-medium">
              {callSession.recipientPhone}
            </p>
          </div>

          {/* Call Status / Timer */}
          <div className="text-xs font-semibold">
            {callSession.status === 'calling' ? (
              <span className="text-[#D94A0B] animate-pulse">{t.calling}</span>
            ) : callSession.status === 'connected' ? (
              <span className="text-[#111827] font-mono tracking-widest text-sm font-black">
                {formatDuration(callSession.durationSeconds)}
              </span>
            ) : (
              <span className="text-red-600">{t.callEnded}</span>
            )}
          </div>

          {/* Audio Soundwave bars */}
          {callSession.status === 'connected' && (
            <div className="flex items-center gap-1 h-5">
              {[40, 70, 90, 60, 30, 80, 50, 95, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#D94A0B] rounded-full animate-bounce"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Call Controls */}
        <div className="w-full flex items-center justify-center gap-3 pt-4 border-t border-neutral-200">
          
          {/* Mute */}
          <button
            onClick={toggleMute}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
              callSession.isMuted
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-[#FAF9F7] hover:bg-neutral-100 border-neutral-200 text-neutral-700'
            }`}
            title={callSession.isMuted ? t.unmute : t.mute}
          >
            {callSession.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Video Toggle (if video call) */}
          {callSession.type === 'video' && (
            <button
              onClick={toggleVideo}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                callSession.isVideoOff
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-[#FAF9F7] hover:bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}
              title="Camera On/Off"
            >
              {callSession.isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>
          )}

          {/* Speaker Toggle */}
          <button
            onClick={toggleSpeaker}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
              callSession.isSpeakerOn
                ? 'bg-[#D94A0B] border-[#D94A0B] text-white shadow-xs'
                : 'bg-[#FAF9F7] hover:bg-neutral-100 border-neutral-200 text-neutral-700'
            }`}
            title={t.speaker}
          >
            {callSession.isSpeakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hang Up End Call */}
          <button
            id="end-call-btn"
            onClick={endCall}
            className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title={t.endCall}
          >
            <PhoneOff className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  );
};
