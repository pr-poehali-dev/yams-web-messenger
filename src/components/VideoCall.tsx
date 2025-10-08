import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface VideoCallProps {
  contact: {
    name: string;
    avatar: string;
  };
  callType: 'video' | 'audio';
  onEndCall: () => void;
}

const VideoCall = ({ contact, callType, onEndCall }: VideoCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 2000);
    const durationTimer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    const startLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    startLocalStream();

    return () => {
      clearTimeout(timer);
      clearInterval(durationTimer);
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [callType]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="fixed inset-0 bg-[hsl(var(--messenger-darker-bg))] z-50 flex flex-col">
      {callType === 'video' ? (
        <div className="relative flex-1">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            poster={contact.avatar}
          />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center text-white">
            <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
            <p className="text-sm opacity-80">
              {isConnecting ? 'Соединение...' : formatDuration(callDuration)}
            </p>
          </div>

          <div className="absolute top-6 right-6 w-40 h-56 rounded-2xl overflow-hidden bg-[hsl(var(--messenger-card))] shadow-xl border-2 border-white/20">
            {isVideoOff ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0088CC] to-[#2AABEE]">
                <Icon name="VideoOff" size={48} className="text-white/60" />
              </div>
            ) : (
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-semibold text-white mb-2">{contact.name}</h2>
            <p className="text-lg text-[hsl(var(--messenger-text-muted))]">
              {isConnecting ? 'Соединение...' : formatDuration(callDuration)}
            </p>
          </div>
        </div>
      )}

      <div className="p-8 flex justify-center items-center gap-4">
        <Button
          size="lg"
          variant="ghost"
          onClick={toggleMute}
          className={`w-16 h-16 rounded-full ${
            isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80'
          } text-white`}
        >
          <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
        </Button>

        {callType === 'video' && (
          <Button
            size="lg"
            variant="ghost"
            onClick={toggleVideo}
            className={`w-16 h-16 rounded-full ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80'
            } text-white`}
          >
            <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
          </Button>
        )}

        <Button
          size="lg"
          onClick={onEndCall}
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          <Icon name="PhoneOff" size={24} />
        </Button>

        <Button
          size="lg"
          variant="ghost"
          className="w-16 h-16 rounded-full bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80 text-white"
        >
          <Icon name="Volume2" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
