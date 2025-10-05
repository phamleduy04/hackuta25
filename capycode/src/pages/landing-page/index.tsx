import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DynamicBackground from "@/components/DynamicBackground";
import GlassCard from "@/components/GlassCard";
import SharedNav from "@/components/SharedNav";
import "@/components/HomeBackground.css";
import "./landing.css";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
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
        color="#404040"
        noiseIntensity={0.02}
        rotation={2.18}
      />
      
      <SharedNav />

      <div className="landing-scroll-container">
        {/* Hero Section */}
        <section className="landing-section hero-section" ref={addToRefs}>
          <div className="hero-content">
            <h1 className="hero-title">
              Never Get Stuck
              <span className="gradient-text"> Learning to Code Again</span>
            </h1>
            <p className="hero-subtitle">
              A live AI coach that talks you through every challenge, catches when you're stuck, and guides you to solutions without doing the work for you
            </p>
            <button
              className="hero-cta"
              onClick={() => { void loginWithRedirect({
                authorizationParams: {
                  redirect_uri: `${window.location.origin}/dashboard`,
                },
              }); }}
            >
              Start Building Now — Free
            </button>
          </div>
        </section>

        {/* Problem Section - NEW */}
        <section className="landing-section problem-section" ref={addToRefs}>
          <div className="problem-container">
            <h2 className="section-title">You're Not Alone in Feeling Stuck</h2>
            <div className="problem-grid">
              <div className="problem-card">
                <div className="problem-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                </div>
                <h3>Hit a wall and don't know where to look</h3>
                <p>Error messages don't make sense, documentation is confusing, and tutorials skip the parts you need</p>
              </div>
              <div className="problem-card">
                <div className="problem-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3>Spend hours googling instead of coding</h3>
                <p>Stack Overflow answers don't match your situation, and forum replies take days if they come at all</p>
              </div>
              <div className="problem-card">
                <div className="problem-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3>Start doubting if coding is for you</h3>
                <p>Every obstacle feels like proof you're not cut out for this, so you close the laptop and give up</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Overview - REWORKED */}
        <section className="landing-section solution-section" ref={addToRefs}>
          <div className="solution-hero">
            <h2 className="section-title">What If You Had a Coach Right Next to You?</h2>
            <p className="solution-subtitle">
              That's exactly what CapyCode gives you. An AI mentor that watches your progress, 
              speaks to you in real-time, and guides you through challenges the moment they happen.
            </p>
          </div>
          <div className="solution-visual-container">
            <div className="mascot-float">
              <img src="/assets/curious_capybara.png" alt="CapyCode Mascot" className="mascot-image" />
            </div>
            <div className="workspace-preview">
              <div className="preview-section code-section">
                <div className="section-label">Your Code</div>
                <div className="code-lines">
                  <div className="code-line"></div>
                  <div className="code-line short"></div>
                  <div className="code-line"></div>
                  <div className="code-line medium"></div>
                </div>
              </div>
              <div className="preview-section result-section">
                <div className="section-label">Live Preview</div>
                <div className="preview-box">
                  <div className="preview-element"></div>
                </div>
              </div>
              <div className="preview-section coach-section">
                <div className="section-label">AI Coach</div>
                <div className="coach-bubble">
                  <div className="bubble-dot"></div>
                  <div className="bubble-dot"></div>
                  <div className="bubble-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Flow - COMPLETELY NEW */}
        <section className="landing-section flow-section" ref={addToRefs}>
          <h2 className="section-title">Here's How Your Learning Journey Works</h2>
          <div className="flow-container">
            <div className="flow-step" ref={addToRefs}>
              <div className="flow-visual">
                <div className="flow-number">1</div>
              </div>
              <div className="flow-content">
                <h3>Choose What You Want to Build</h3>
                <p>
                  Open the dashboard and pick a module. Want to learn React components? 
                  State management? API integration? Start wherever makes sense for you.
                </p>
              </div>
              <div className="flow-mascot">
                <img src="/assets/beanbag_capybara.png" alt="Capybara relaxing" />
              </div>
            </div>

            <div className="flow-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="flow-step" ref={addToRefs}>
              <div className="flow-visual">
                <div className="flow-number">2</div>
              </div>
              <div className="flow-content">
                <h3>Your Coach Greets You With Voice</h3>
                <p>
                  The module opens and your AI mentor speaks to you, explaining what you'll 
                  build, why it matters, and how to get started. No reading walls of text.
                </p>
              </div>
              <div className="flow-mascot">
                <img src="/assets/happy_headphones_capybara.png" alt="Capybara with headphones" />
              </div>
            </div>

            <div className="flow-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="flow-step" ref={addToRefs}>
              <div className="flow-visual">
                <div className="flow-number">3</div>
              </div>
              <div className="flow-content">
                <h3>Code While Seeing Live Results</h3>
                <p>
                  Split screen shows your code on the left, live preview on the right. 
                  Type, save, and instantly see what your code does. No setup, no config.
                </p>
              </div>
              <div className="flow-mascot">
                <img src="/assets/capybara_working.png" alt="Capybara coding" />
              </div>
            </div>

            <div className="flow-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="flow-step" ref={addToRefs}>
              <div className="flow-visual">
                <div className="flow-number">4</div>
              </div>
              <div className="flow-content">
                <h3>Get Help the Moment You're Stuck</h3>
                <p>
                  AI detects when you haven't made progress and offers hints. Or click the 
                  help button anytime to ask questions. No waiting, no searching forums.
                </p>
              </div>
              <div className="flow-mascot">
                <img src="/assets/capybara_hoodie.png" alt="Capybara thinking" />
              </div>
            </div>

            <div className="flow-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div className="flow-step" ref={addToRefs}>
              <div className="flow-visual">
                <div className="flow-number">5</div>
              </div>
              <div className="flow-content">
                <h3>Submit and See Your Progress</h3>
                <p>
                  When you're done, submit your code. Get instant feedback on quality, 
                  best practices, performance, and what skills you just mastered.
                </p>
              </div>
              <div className="flow-mascot">
                <img src="/assets/capybara_finished.png" alt="Capybara celebrating" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Deep Dive - REORGANIZED */}
        <section className="landing-section features-deep" ref={addToRefs}>
          <h2 className="section-title">The Features That Keep You Moving Forward</h2>
          
          <div className="feature-highlight">
            <div className="highlight-content">
              <div className="highlight-badge">Voice-Powered</div>
              <h3>Talk to Your Coach, Not Just Text</h3>
              <p>
                Natural voice conversations mean you can ask questions while coding without 
                breaking your flow. The AI understands context and responds like a real mentor 
                sitting next to you, explaining concepts in plain language.
              </p>
            </div>
            <div className="highlight-visual">
              <div className="voice-indicator">
                <div className="voice-wave"></div>
                <div className="voice-wave"></div>
                <div className="voice-wave"></div>
                <div className="voice-wave"></div>
              </div>
            </div>
          </div>

          <div className="feature-highlight reverse">
            <div className="highlight-content">
              <div className="highlight-badge">Smart Detection</div>
              <h3>Knows When You Need Help Before You Ask</h3>
              <p>
                The system watches your coding patterns. Been on the same error for 5 minutes? 
                Not sure where to start? It detects hesitation and proactively offers guidance 
                before frustration sets in.
              </p>
            </div>
            <div className="highlight-visual">
              <div className="detection-pulse"></div>
            </div>
          </div>

          <div className="feature-highlight">
            <div className="highlight-content">
              <div className="highlight-badge">Hints Over Answers</div>
              <h3>Guides You to Solutions, Doesn't Give Them Away</h3>
              <p>
                When you click help, you get leading questions and hints that help you think 
                through the problem. The AI teaches you how to solve it yourself, so you actually 
                learn instead of just copying code.
              </p>
            </div>
            <div className="highlight-visual">
              <div className="hint-card">
                <div className="hint-text">Think about what happens when...</div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section - NEW */}
        <section className="landing-section results-section" ref={addToRefs}>
          <h2 className="section-title">Track Your Growth With Real Metrics</h2>
          <div className="results-grid">
            <GlassCard title="Code Compilation">
              <p>See if your code runs successfully and where errors occur with clear explanations</p>
            </GlassCard>
            <GlassCard title="Best Practices">
              <p>Learn industry standards as you code with feedback on naming, structure, and patterns</p>
            </GlassCard>
            <GlassCard title="Effectiveness Score">
              <p>Get a quality rating showing how efficient and maintainable your solution is</p>
            </GlassCard>
            <GlassCard title="Skills Mastered">
              <p>Track which concepts you've practiced and what you're ready to learn next</p>
            </GlassCard>
          </div>
        </section>

        {/* Social Proof / Trust - NEW */}
        <section className="landing-section trust-section" ref={addToRefs}>
          <div className="trust-content">
            <h2 className="section-title">Built For Learners Who Refuse to Quit</h2>
            <p className="trust-statement">
              We built CapyCode because we've been there. Staring at error messages at 2am, 
              questioning if we were smart enough, feeling completely alone in the struggle. 
              This is the tool we wish we had when we were learning.
            </p>
            <div className="trust-stats">
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Free Forever</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">AI Coach Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Setup Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="landing-section cta-section" ref={addToRefs}>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Stop Getting Stuck?</h2>
            <p className="cta-subtitle">
              Start your first module right now. No signup, no credit card, no commitment.
              Just you, your AI coach, and the code you're about to write.
            </p>
            <button
              className="cta-button-large"
              onClick={() => { void loginWithRedirect({
                authorizationParams: {
                  redirect_uri: `${window.location.origin}/dashboard`,
                },
              }); }}
            >
              Launch Your First Module
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">CAPYCODE</h3>
            <p className="footer-tagline">Your AI coding mentor, always by your side</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/landing-page">Features</a></li>
              <li><a href="/landing-page">How It Works</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CapyCode. Built for learners who refuse to quit.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;