import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "./DynamicBackground";
import "./HomeBackground.css";

export const HomeBackground: React.FC = () => {
  const navigate = useNavigate();
  // showMini: true = show mini paragraph, false = show homepage
  // isTransitioning: true = in the process of hiding mini and showing homepage
  const [showMini, setShowMini] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [homepageHidden, setHomepageHidden] = useState(false);

  // Get the transition duration from CSS (in ms)
  const CROSSFADE_DURATION = 1200; // ms, match .crossfade-hidden and .mini-paragraph in CSS

  const handleLearnMore = () => {
    setIsTransitioning(true);
    setShowMini(false); // Hide mini paragraph if visible

    setTimeout(() => {
      setHomepageHidden(true);
      setShowMini(true); // Show mini paragraph only after homepage is hidden
      setIsTransitioning(false);
    }, CROSSFADE_DURATION);
  };

  const handleGoBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowMini(false);
      setHomepageHidden(false); // Show homepage only after mini is hidden
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
          ZENTRA
          
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
            Redefine your credit journey.
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
            Choose. Upgrade. Spend with confidence.
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
              onClick={() => navigate("/signup")}
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
      
      {/* Credit Card Logo on right side */}
      <img
        src="/logo-credit-card7.png"
        alt="Credit Card Logo"
        className={`credit-card-logo${
          isTransitioning
            ? " crossfade-hidden"
            : homepageHidden
            ? " hidden"
            : " fade-in"
        }`}
      />

      {/* Show custom glassmorphism cards in a row instead of stacked */}
      <div
        className={`mini-paragraph${
          showMini && !isTransitioning
            ? " fade-in-opacity"
            : " crossfade-hidden"
        }`}
        style={{ display: showMini || isTransitioning ? undefined : "none" }}
      >
        <div className="glasscard-row">
          <GlassCard
            title="Why Us?"
            imageSrc="/credit-card-why.png"
            imageAlt="Credit card illustration"
          >
            <p>
              Smarter credit card decisions with personalized guidance to
              upgrade and get more from every purchase.{" "}
            </p>
          </GlassCard>
          <GlassCard
            title="Maximize."
            imageSrc="/credit-card-arrow2.png"
            imageAlt="Rewards illustration"
          >
            <p>
              Unlock the full potential of your rewards across dining, travel,
              and everyday spending with our smart recommendations
            </p>
          </GlassCard>
          <GlassCard
            title="Simplicity."
            imageSrc="/credit-card-check.png"
            imageAlt="Credit health illustration"
          >
            <p>
              Take control of your finances with simple, data-driven guidance.
            </p>
          </GlassCard>
        </div>
        <button
          className="homepage-buttons"
          onClick={handleGoBack}
          disabled={isTransitioning}
          style={{ marginTop: "2rem" }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
