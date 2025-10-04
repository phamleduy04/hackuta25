import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import GlassCard from "@/components/GlassCard";
import "@/components/HomeBackground.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showMini, setShowMini] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [homepageHidden, setHomepageHidden] = useState(false);

  const CROSSFADE_DURATION = 1200;

  const handleLearnMore = () => {
    setIsTransitioning(true);
    setShowMini(false);
    setTimeout(() => {
      setHomepageHidden(true);
      setShowMini(true);
      setIsTransitioning(false);
    }, CROSSFADE_DURATION);
  };

  const handleGoBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowMini(false);
      setHomepageHidden(false);
      setIsTransitioning(false);
    }, CROSSFADE_DURATION);
  };

  return (
    <div className="homebackground-root">
      <DynamicBackground
        speed={35}
        scale={1.5}
        color="#232323"
        noiseIntensity={0.02}
        rotation={2.18}
      />
      <nav>
        <a
          href="/"
          className={`page-title${
            isTransitioning && !showMini
              ? " crossfade-hidden"
              : homepageHidden && !showMini
              ? " hidden"
              : " fade-in"
          }`}
          style={showMini ? { zIndex: 1000, position: "fixed" } : {}}
        >
          CAPYCODE
        </a>
      </nav>

      <div
        className={`container-fluid${
          isTransitioning
            ? " crossfade-hidden"
            : homepageHidden
            ? " hidden"
            : " fade-in-opacity"
        }`}
      >
        <div className="header-content">
          <h1
            className={`statement${
              isTransitioning
                ? " crossfade-hidden"
                : homepageHidden
                ? " hidden"
                : " fade-in"
            }`}
          >
            Learn to build your app with an AI coding coach.
          </h1>
          <p
            className={
              isTransitioning
                ? " crossfade-hidden"
                : homepageHidden
                ? " hidden"
                : " fade-in"
            }
          >
            ElevenLabs TTS voice, Gemini code reviews, and an interactive sandbox
            with two screens: code editor and live preview. Modules unlock tasks
            inside an embedded editor while a capybara mentor guides you.
          </p>
          <div
            className={`homepage-buttons-row${
              isTransitioning
                ? " crossfade-hidden"
                : homepageHidden
                ? " hidden"
                : " fade-in"
            }`}
          >
            <button
              className="homepage-buttons"
              onClick={() => { void navigate("/dashboard"); }}
              disabled={isTransitioning}
            >
              Get Started
            </button>
            <button
              className="homepage-buttons"
              onClick={handleLearnMore}
              disabled={isTransitioning}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mini-paragraph${
          showMini && !isTransitioning ? " fade-in-opacity" : " crossfade-hidden"
        }`}
        style={{ display: showMini || isTransitioning ? undefined : "none" }}
      >
        <div className="glasscard-row">
          <GlassCard title="Coding Coach (MVP)">
            <p>
              Editor with rendered content, ElevenLabs voice guidance, best
              practice recommendations, and a Help button when you’re stuck.
            </p>
          </GlassCard>
          <GlassCard title="Program Page Layout">
            <p>
              Left: code editor. Right top: live preview. Bottom right: result
              feedback showing complexity, quality, skills learned, and tips.
            </p>
          </GlassCard>
          <GlassCard title="Modules & Feedback">
            <p>
              Each module opens a focused task editor. Gemini reviews code and
              provides actionable feedback.
            </p>
          </GlassCard>
        </div>
        <button className="homepage-buttons" onClick={handleGoBack} disabled={isTransitioning}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LandingPage;