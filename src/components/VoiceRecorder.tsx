import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob, duration: number) => void;
  onCancel: () => void;
}

const VoiceRecorder = ({ onSend, onCancel }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startRecording();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      onCancel();
    }
  };

  const handlePause = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setDuration((prev) => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const handleSend = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onSend(audioBlob, duration);
        if (timerRef.current) clearInterval(timerRef.current);
      };
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCancel = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    onCancel();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-[hsl(var(--messenger-card))] rounded-2xl animate-scale-in">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCancel}
        className="text-red-500 hover:bg-red-500/10 flex-shrink-0"
      >
        <Icon name="X" size={20} />
      </Button>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isRecording && !isPaused && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
          <span className="text-lg font-mono text-white">{formatDuration(duration)}</span>
        </div>

        <div className="flex-1 flex items-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#0088CC] rounded-full transition-all"
              style={{
                height: isRecording && !isPaused ? `${Math.random() * 24 + 8}px` : '8px',
              }}
            />
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePause}
        className="text-white hover:bg-[hsl(var(--messenger-darker-bg))] flex-shrink-0"
      >
        <Icon name={isPaused ? 'Play' : 'Pause'} size={20} />
      </Button>

      <Button
        onClick={handleSend}
        disabled={duration < 1}
        className="bg-[#0088CC] hover:bg-[#2AABEE] text-white flex-shrink-0"
        size="icon"
      >
        <Icon name="Send" size={20} />
      </Button>
    </div>
  );
};

export default VoiceRecorder;
