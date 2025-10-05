import React, { useEffect, useRef, useState } from 'react';
import './SpeakingCapy.css';
import capyHappy from '/assets/code_working_happy_capybara.png';
import { useVoice } from '@/hooks/use-voice';

interface SpeakingCapyProps {
  position?: { bottom?: string | number; right?: string | number; };
  idleHint?: string;
}

const DEFAULT_IDLE_HINT = "Ready when you are! Let's build something cool.";

export const SpeakingCapy: React.FC<SpeakingCapyProps> = ({ position, idleHint }) => {
  const { isSpeaking, lastAssistantText } = useVoice();
  const [displayText, setDisplayText] = useState<string>('');
  const [isAnimatingStart, setIsAnimatingStart] = useState(false);
  const prevSpeaking = useRef<boolean | undefined>(false);

  useEffect(() => {
    if (isSpeaking && !prevSpeaking.current) {
      // Speech started
      setIsAnimatingStart(true);
      setTimeout(() => setIsAnimatingStart(false), 260);
    }
    prevSpeaking.current = !!isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (isSpeaking && lastAssistantText) {
      setDisplayText(lastAssistantText);
    } else if (!isSpeaking && !lastAssistantText) {
      setDisplayText(idleHint || DEFAULT_IDLE_HINT);
    } else if (!isSpeaking && lastAssistantText) {
      // Keep last phrase for a short moment then fade out to idle
      const t = setTimeout(() => {
        setDisplayText(idleHint || DEFAULT_IDLE_HINT);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [isSpeaking, lastAssistantText, idleHint]);

  const bubbleClass = `speaking-capy-bubble ${isSpeaking ? '' : 'idle'}`;

  return (
    <div
      className="speaking-capy-container"
      style={position ? { bottom: position.bottom, right: position.right } : undefined}
    >
      <div className={`speaking-capy-avatar-wrapper ${isSpeaking ? 'is-speaking' : ''} ${isAnimatingStart ? 'twitch-start' : ''}`}>
        <img src={capyHappy} alt="Capybara mentor" className="speaking-capy-avatar" draggable={false} />
        <div className={bubbleClass}>
          {isSpeaking ? (
            <>
              <span className="label">Capy Mentor</span>
              {displayText || (
                <span className="typing-dots">
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </>
          ) : (
            <>
              <span className="label">Capy Mentor</span>
              {displayText || idleHint || DEFAULT_IDLE_HINT}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakingCapy;
