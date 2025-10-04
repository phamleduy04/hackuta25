# CapyCode - AI-Powered Coding Coach Platform

## Product Overview
CapyCode is an interactive learning platform that solves the #1 reason people abandon learning to code: getting stuck without help. Our live AI coach provides real-time voice guidance, detects when learners are struggling, and guides them to solutions without giving away answers.

## Target Audience
- People who want to learn how to code
- Beginners who have tried other tutorials and gotten stuck
- Self-learners who need personalized help and guidance
- Anyone frustrated by traditional coding education

## Core Problem We Solve
Traditional coding education leaves learners stranded when they hit roadblocks. Without immediate help, they feel stuck, frustrated, and eventually abandon their coding journey. CapyCode provides the exact live help learners need to push through challenges and actually finish what they started.

## Key Differentiator
**Live Coaching Feature**: An animated AI character that talks to users with voice input/output, monitors their progress, detects when they're stuck, and provides contextual guidance throughout the entire coding experience.

---

## Platform Architecture

### 4-Page Application Structure
1. **Landing Page** - Marketing and product information
2. **Dashboard** - Module selection and course overview
3. **Program Page** - Main coding environment with live coach
4. **Results Page** - Performance metrics and progress tracking

---

## Learning Experience Flow

### 1. Module Selection (Dashboard)
- Users browse available learning modules
- Select what they want to learn (fundamentals or specific skills)
- Each module represents a focused learning objective

### 2. Module Structure (Examples - Not Final)
- Module 1: Header Configuration
- Module 2: Creating Dynamic Components  
- Module 3: useEffect Loops and State Management
- Each module teaches practical, project-based skills

### 3. Coding Environment (Program Page)

#### Split-Screen Layout (Always Active)
**Left Side - Code Editor**
- Full-featured browser-based code editor
- Syntax highlighting and autocomplete
- No separate IDE required

**Right Top - Live Preview**
- Real-time rendering of code changes
- Updates instantly as user types
- Shows exactly how code affects output

**Right Bottom - AI Coach Panel**
- Voice-enabled AI character (animated capybara)
- Real-time feedback and guidance
- Help button for on-demand assistance

### 4. Live Coaching System

#### Voice Guidance Triggers
1. **Module Start**: Coach greets user with clear prompt explaining the challenge
2. **Stuck Detection**: System monitors patterns and detects when user has been stuck too long
3. **User Request**: Help button provides instant guidance when clicked
4. **Code Submission**: Reviews final code when user submits for evaluation

#### Help Philosophy
- **Gives hints, NOT solutions**
- Guides users toward answers without robbing the learning moment
- Asks leading questions to help users think through problems
- Teaches problem-solving approach, not just syntax

### 5. Code Review & Feedback (Gemini Integration)

#### Triggered When:
- User clicks "Submit" button
- User explicitly requests code review
- Module completion

#### Feedback Provided:
- **Compilation Status**: Does the code work?
- **Best Practices**: Industry-standard patterns used/missed
- **Effectiveness Score**: Overall code quality ranking
- **Performance Metrics**: Time complexity and optimization opportunities
- **Skills Practiced**: What concepts were applied in this module

### 6. Results & Progress Tracking

#### Metrics Displayed:
- Code compilation success rate
- Best practices adherence
- Code effectiveness ranking
- Skills mastered over time
- Module completion history
- Performance improvements

---

## Technical Implementation

### Voice Technology
- **ElevenLabs TTS Integration**: Natural text-to-speech for coach guidance
- **Voice Input/Output**: Full conversational interface with AI coach
- Function-based API calls similar to Gemini integration

### AI Code Review
- **Gemini API**: Analyzes code quality and provides feedback
- Reviews triggered on submission or user request
- Provides actionable improvement suggestions

### Interactive Features
- Real-time code editor with live preview
- Split-screen always visible (no toggling)
- Animated coach character present throughout experience
- Help button with contextual assistance
- Smart stuck-detection monitoring

### Frontend Sandbox
- Browser-based code editor (no downloads)
- Dual-screen environment (code + preview)
- Sample starter code provided per module
- Live rendering engine

---

## Pricing Model
**Completely Free**
- No paywalls or premium tiers
- Open access to all modules
- No credit card required

---

## User Journey Summary

1. **User arrives at landing page** → Learns about live coaching feature
2. **Clicks "Start Building Now"** → Goes to dashboard
3. **Selects a module** → Opens coding environment
4. **Coach greets with voice prompt** → Explains the challenge
5. **User starts coding** → Sees live preview, gets help when stuck
6. **Submits code** → Receives detailed feedback and score
7. **Views results** → Sees metrics, skills practiced, and next steps
8. **Continues to next module** → Builds on previous knowledge

---

## Character Design
- **Mascot**: Animated capybara
- **Voice**: Professional yet approachable (considering cartoon-style voice)
- **Animation**: Present on all 3 main pages (dashboard, program, results)
- **Personality**: Supportive, encouraging, patient teacher

---

## Future Considerations
- Additional module content expansion
- Community features and leaderboards
- Custom learning path creation
- Multi-language support
- Mobile app version
