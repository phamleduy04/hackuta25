import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import GlassCard from "@/components/GlassCard";
import "@/components/HomeBackground.css";
import "./landing.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="landing-root">
      <DynamicBackground
        speed={35}
        scale={1.5}
        color="#232323"
        noiseIntensity={0.02}
        rotation={2.18}
      />
      
      <nav className="landing-nav">
        <a href="/" className="nav-logo">
          CAPYCODE
        </a>
        <button
          className="nav-cta"
          onClick={() => { void navigate("/dashboard"); }}
        >
          Get Started
        </button>
      </nav>

      <div className="landing-scroll-container">
        {/* Hero Section */}
        <section className="landing-section hero-section" ref={addToRefs}>
          <div className="hero-content">
            <h1 className="hero-title">
              Master Coding with an
              <span className="gradient-text"> AI Coach</span>
            </h1>
            <p className="hero-subtitle">
              Interactive learning platform powered by ElevenLabs voice guidance and Gemini code intelligence
            </p>
            <button
              className="hero-cta"
              onClick={() => { void navigate("/dashboard"); }}
            >
              Start Your Journey
            </button>
          </div>
        </section>

        {/* Features Overview */}
        <section className="landing-section features-section" ref={addToRefs}>
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            <GlassCard title="Voice-Guided Learning">
              <p>
                ElevenLabs text-to-speech integration provides real-time vocal guidance
                as you work through coding challenges and modules.
              </p>
            </GlassCard>
            <GlassCard title="AI Code Review">
              <p>
                Gemini API analyzes your code for quality, complexity, and best practices,
                providing actionable feedback and improvement suggestions.
              </p>
            </GlassCard>
            <GlassCard title="Interactive Sandbox">
              <p>
                Dual-screen environment with a live code editor on the left and instant
                preview rendering on the right for immediate feedback.
              </p>
            </GlassCard>
            <GlassCard title="Module-Based Curriculum">
              <p>
                Structured learning path where each module unlocks task-specific editors
                with progressive difficulty and skill building.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Coding Coach Section */}
        <section className="landing-section coach-section" ref={addToRefs}>
          <div className="section-content-split">
            <div className="content-left">
              <h2 className="section-title">Your Personal Coding Coach</h2>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-marker"></div>
                  <div>
                    <h3>Editor with Rendered Content</h3>
                    <p>Write code and see results instantly in a split-view interface</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-marker"></div>
                  <div>
                    <h3>Best Practice Recommendations</h3>
                    <p>Learn industry-standard patterns and clean code principles</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-marker"></div>
                  <div>
                    <h3>Help When You Need It</h3>
                    <p>Dedicated help button provides contextual assistance when stuck</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-marker"></div>
                  <div>
                    <h3>Interactive Questions</h3>
                    <p>Dynamic feedback system keeps you engaged and learning actively</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="glass-panel">
                <div className="panel-header">Coding Environment</div>
                <div className="panel-body">
                  <div className="code-preview-layout">
                    <div className="layout-box editor-box">
                      <span>Code Editor</span>
                    </div>
                    <div className="layout-box preview-box">
                      <span>Live Preview</span>
                    </div>
                    <div className="layout-box feedback-box">
                      <span>AI Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Page Layout */}
        <section className="landing-section layout-section" ref={addToRefs}>
          <h2 className="section-title">Workspace Layout</h2>
          <p className="section-description">
            Purpose-built interface designed for optimal learning and productivity
          </p>
          <div className="layout-showcase">
            <div className="layout-card">
              <div className="layout-card-icon">◧</div>
              <h3>Code Editor Panel</h3>
              <p>Full-featured editor on the left side with syntax highlighting, autocomplete, and error detection</p>
            </div>
            <div className="layout-card">
              <div className="layout-card-icon">▦</div>
              <h3>Live Preview Panel</h3>
              <p>Top-right section displays real-time rendering of your code changes as you type</p>
            </div>
            <div className="layout-card">
              <div className="layout-card-icon">◈</div>
              <h3>Result Feedback Panel</h3>
              <p>Bottom-right provides code quality metrics, time complexity analysis, and skills practiced</p>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="landing-section path-section" ref={addToRefs}>
          <h2 className="section-title">Your Learning Journey</h2>
          <div className="journey-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Dashboard</h3>
                <p>Select from curated courses or define your own custom app project to build</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Module Learning</h3>
                <p>Work through structured modules with voice guidance and interactive tasks</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Program Page</h3>
                <p>Build and test your code in the dual-screen sandbox environment</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Results & Progress</h3>
                <p>Review achievements, track skills mastered, and celebrate milestones</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing-section cta-section" ref={addToRefs}>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Coding Skills?</h2>
            <p className="cta-subtitle">
              Join the future of interactive programming education
            </p>
            <button
              className="cta-button-large"
              onClick={() => { void navigate("/dashboard"); }}
            >
              Launch Dashboard
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;