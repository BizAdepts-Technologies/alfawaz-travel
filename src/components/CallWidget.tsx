import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Loader2, Mic, MicOff, Volume2, Ear } from 'lucide-react';

declare global {
  interface Window {
    QRCallsSDK: any;
  }
}

const CallWidget = () => {
  const [inCall, setInCall] = useState(false);
  const [status, setStatus] = useState('');
  const [callManager, setCallManager] = useState<any>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('CallWidget mounted. Initializing QRCallsSDK from global window...');

    if (window.QRCallsSDK && !callManager) {
      try {
        const manager = new window.QRCallsSDK('c57cbb0d-12c1-4a1e-be7c-4c7f7ea45f59', 'https://qrcalls.com');
        console.log('QRCallsSDK initialized successfully:', manager);
        setCallManager(manager);
      } catch (error) {
        console.error('Error initializing QRCallsSDK:', error);
      }
    } else if (!window.QRCallsSDK) {
      console.error('window.QRCallsSDK is missing! Ensure script is loaded in index.html');

      const interval = setInterval(() => {
        if (window.QRCallsSDK && !callManager) {
          try {
            const manager = new window.QRCallsSDK('c57cbb0d-12c1-4a1e-be7c-4c7f7ea45f59', 'https://qrcalls.com');
            console.log('QRCallsSDK late-initialized successfully:', manager);
            setCallManager(manager);
            clearInterval(interval);
          } catch (error) {
            console.error('Error initializing QRCallsSDK:', error);
          }
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!callManager) return;

    const handleStateChange = (state: string) => {
      console.log('Call state changed:', state);
      setStatus(state.charAt(0).toUpperCase() + state.slice(1));
      if (state === 'calling' || state === 'connected' || state === 'ringing') {
        setInCall(true);
      } else {
        setInCall(false);
        setIsMuted(false);
        setIsSpeaker(true);
        if (state === 'disconnected' || state === 'ended') {
          setTimeout(() => setStatus(''), 2000);
        }
      }
    };

    const handleStream = (stream: MediaStream) => {
      console.log('Received remote stream:', stream);
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
    };

    callManager.on('callStateChange', handleStateChange);
    callManager.on('remoteStream', handleStream);

  }, [callManager]);

  const toggleCall = () => {
    if (!callManager) return;

    if (inCall) {
      callManager.endCall();
    } else {
      try {
        callManager.startCall('audio');
      } catch (error) {
        console.error('Error starting call:', error);
      }
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Attempt to mute using SDK methods if available
    if (callManager) {
      if (typeof callManager.muteAudio === 'function') callManager.muteAudio(newMuted);
      else if (typeof callManager.mute === 'function') callManager.mute(newMuted);
      else if (typeof callManager.toggleMute === 'function') callManager.toggleMute();
    }
  };

  const toggleSpeaker = () => {
    const newSpeaker = !isSpeaker;
    setIsSpeaker(newSpeaker);

    // Simulate earpiece mode by reducing volume since web doesn't have native earpiece routing
    if (audioRef.current) {
      audioRef.current.volume = newSpeaker ? 1.0 : 0.2;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-body">

      {/* Active Call Box */}
      {(inCall || (status && status !== 'Disconnected' && status !== 'Ended' && status !== '')) && (
        <div className="bg-white rounded-3xl shadow-image p-6 w-80 flex flex-col items-center gap-5 border border-teal/10 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${status === 'Connected' ? 'bg-teal/10 text-teal' : 'bg-amber/10 text-amber'}`}>
              <Phone className="w-10 h-10" fill="currentColor" />
            </div>
            {status !== 'Connected' && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-amber rounded-full animate-ping"></span>
            )}
          </div>

          <div className="text-center">
            <h3 className="font-display font-semibold text-xl text-charcoal">Support Team</h3>
            <p className="text-sm font-medium text-gray-500 mt-1 flex items-center justify-center gap-2">
              {status === 'Calling' || status === 'Ringing' ? 'Ringing...' : status}
              {(status === 'Calling' || status === 'Ringing') && <Loader2 className="w-3 h-3 animate-spin" />}
            </p>
          </div>

          <div className="flex items-center gap-5 mt-2 w-full justify-center">
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full transition-all duration-200 ${isMuted ? 'bg-amber text-white shadow-md shadow-amber/30' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>

            {/* End Call Button */}
            <button
              onClick={toggleCall}
              className="p-5 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/40 transition-transform hover:scale-110"
              title="End Call"
            >
              <PhoneOff size={28} />
            </button>

            {/* Speaker Button */}
            <button
              onClick={toggleSpeaker}
              className={`p-4 rounded-full transition-all duration-200 ${isSpeaker ? 'bg-teal text-white shadow-md shadow-teal/30' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              title={isSpeaker ? "Switch to Earpiece" : "Switch to Speaker"}
            >
              {isSpeaker ? <Volume2 size={22} /> : <Ear size={22} />}
            </button>
          </div>
        </div>
      )}

      {/* Default Floating Button (Only visible when NOT in call) */}
      {!inCall && (!status || status === 'Disconnected' || status === 'Ended') && (
        <button
          onClick={toggleCall}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-teal hover:bg-teal-light text-white shadow-[0_10px_25px_-5px_rgba(10,107,107,0.6)]"
          aria-label="Start Call"
        >
          <Phone size={28} fill="currentColor" />
        </button>
      )}

      <audio ref={audioRef} autoPlay />
    </div>
  );
};

export default CallWidget;
