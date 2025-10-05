import React, { useEffect, useRef, useState } from 'react';
import './SpeakingCapy.css';
import capyHappy from '/assets/code_working_happy_capybara.png';
import { useVoice } from '@/hooks/use-voice';

interface SpeakingCapyProps {
  position?: { bottom?: string | number; right?: string | number; };
}

// Character should be hidden until session starts. Once started:
// - Avatar is grayscale while NOT speaking (handled by CSS)
// - Bubble only appears WHILE speaking, showing lastAssistantText or typing dots
export const SpeakingCapy: React.FC<SpeakingCapyProps> = ({ position }) => {
  const { isSpeaking, lastAssistantText, isSessionActive } = useVoice();
  const [displayText, setDisplayText] = useState<string>('');
  const [isAnimatingStart, setIsAnimatingStart] = useState(false);
  const prevSpeaking = useRef<boolean | undefined>(false);

  // Debug logging
  useEffect(() => {
    console.log('🐹 SpeakingCapy state:', { isSessionActive, isSpeaking, lastAssistantText });
  }, [isSessionActive, isSpeaking, lastAssistantText]);

  useEffect(() => {
    if (isSpeaking && !prevSpeaking.current) {
      setIsAnimatingStart(true);
      setTimeout(() => setIsAnimatingStart(false), 260);
    }
    prevSpeaking.current = !!isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (isSpeaking) {
      setDisplayText(lastAssistantText || '');
    }
  }, [isSpeaking, lastAssistantText]);

  // TEMPORARY: Always render for debugging
  // if (!isSessionActive) {
  //   console.log('🚫 Character hidden - isSessionActive is false');
  //   return null;
  // }

  console.log('✅ Character rendering - isSessionActive:', isSessionActive);

  return (
    <div
      className="speaking-capy-container"
      style={{ 
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '170px',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Debug: red tint
        border: '2px solid red', // Debug: red border
        ...position
      }}
    >
      <div className={`speaking-capy-avatar-wrapper ${isSpeaking ? 'is-speaking' : ''} ${isAnimatingStart ? 'twitch-start' : ''}`}>
        <img 
          src={capyHappy} 
          alt="Capybara mentor" 
          className="speaking-capy-avatar" 
          draggable={false}
          style={{ display: 'block', width: '100%', height: '100%' }}
          onLoad={() => console.log('✅ Image loaded successfully')}
          onError={() => console.error('❌ Image failed to load')}
        />
        {isSpeaking && (
          <div className="speaking-capy-bubble">
            <span className="label">Capy Mentor</span>
            {displayText || (
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingCapy;
