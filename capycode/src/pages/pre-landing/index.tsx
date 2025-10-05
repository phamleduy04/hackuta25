import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import "../landing-page/landing.css";
import "./pre-landing.css";

const PreLanding: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isPushingOut, setIsPushingOut] = useState(false);

  useEffect(() => {
    // Trigger fade-in shortly after mount for a smooth entrance
    const inTimer = setTimeout(() => {
      setIsVisible(true);
      setIsGlowing(true);
    }, 100);

    // After visible and glowing for 3s, start push-out animation
    const showTimer = setTimeout(() => {
      setIsGlowing(false);
      setIsPushingOut(true);
      
      // Navigate after push-out animation completes
      const navTimer = setTimeout(() => {
        void navigate('/landing-page');
      }, 800); // match CSS push-out duration
      
      return () => clearTimeout(navTimer);
    }, 3100); // 3 seconds of glow + small delay

    return () => {
      clearTimeout(inTimer);
      clearTimeout(showTimer);
    };
  }, [navigate]);

  return (
    <div className={`pre-landing-root ${isVisible ? 'visible' : ''}`} role="region" aria-label="Intro animation">
      <DynamicBackground speed={35} scale={1.5} color="#404040" noiseIntensity={0.02} rotation={2.18} />

      <div className="pre-landing-content">
        <div className={`pre-landing-animation-container ${
          isVisible ? 'fade-in' : ''
        } ${
          isGlowing ? 'glowing' : ''
        } ${
          isPushingOut ? 'push-up' : ''
        }`}>
          <img
            src="/assets/logo/logo_white.png"
            alt="CapyCode Logo"
            className="pre-landing-logo"
          />
        </div>
        
        <div className={`pre-landing-text ${
          isVisible ? 'fade-in' : ''
        } ${
          isGlowing ? 'glowing' : ''
        } ${
          isPushingOut ? 'push-down' : ''
        }`}>
          <h1 className="pre-landing-title">CAPYCODE</h1>
        </div>
      </div>
    </div>
  );
};

export default PreLanding;
