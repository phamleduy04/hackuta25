import React, { useEffect, useRef, useState } from 'react';
import './StaticCapyCharacter.css';
import capyHappy from '/assets/code_working_happy_capybara.png';
import { useVoice } from '@/hooks/use-voice';

interface StaticCapyCharacterProps {
  position?: { bottom?: string | number; right?: string | number; };
}

/**
 * Static Capybara character that's always visible on the dashboard
 * Shows in grayscale when not speaking (default state)
 */
export const StaticCapyCharacter: React.FC<StaticCapyCharacterProps> = ({ position }) => {
  const { isSpeaking, lastAssistantText, isSessionActive } = useVoice();
  const [displayText, setDisplayText] = useState('');
  const [twitch, setTwitch] = useState(false);
  const prevSpeaking = useRef<boolean>(false);

  useEffect(() => {
    if (isSpeaking && !prevSpeaking.current) {
      setTwitch(true);
      setTimeout(() => setTwitch(false), 260);
    }
    prevSpeaking.current = !!isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (isSpeaking && lastAssistantText) {
      setDisplayText(lastAssistantText);
    }
  }, [isSpeaking, lastAssistantText]);

  if (!isSessionActive) return null; // hide until session started

  const wrapperClass = `static-capy-avatar-wrapper ${isSpeaking ? 'speaking' : 'idle'} ${twitch ? 'twitch' : ''}`;

  return (
    <div
      className="static-capy-container"
      style={position ? { bottom: position.bottom, right: position.right } : undefined}
    >
      <div className={wrapperClass}>
        <img
          src={capyHappy}
          alt="Capybara mentor"
          className="static-capy-avatar"
          draggable={false}
        />
        {isSpeaking && (
          <div className="capy-bubble" role="status" aria-live="polite">
            <span className="capy-label">Capy Mentor</span>
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

export default StaticCapyCharacter;
