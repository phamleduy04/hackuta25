import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const headerConfiguration: Course = { id: "r-1", title: "Header Configuration", difficulty: "Beginner", durationMin: 25, framework: FrameworkEnum.react, 
    
    plan: `
### Stage 1: Core Header Component Setup
- [ ] Create a reusable \`Header\` component that accepts props: \`title\`, \`subtitle\`, \`align\` (\"center\" | \"left\"), \`showBadge\`, \`badgeText\`, and optional \`actions\`.
- [ ] Render structural elements with semantic roles: container, main text area, and optional actions region.
- [ ] Add minimal styles for layout, spacing, and typography in \`/styles.css\`.
- [ ] Verify the component renders with only a \`title\` provided (baseline case).

### Stage 2: Alignment and Layout Variants
- [ ] Implement alignment variants via the \`align\` prop: \`header--center\` and \`header--left\`.
- [ ] Center-align title/subtitle when \`align === \"center\"\`; left-align when \`align === \"left\"\`.
- [ ] Ensure responsive spacing and readable font sizes across variants.
- [ ] Demonstrate both variants in \`App\` with example usages.

### Stage 3: Badge and Action Area
- [ ] Add an optional badge (\`showBadge\` + \`badgeText\`) for status labels (e.g., \"Live\").
- [ ] Add an optional actions region to the right for buttons/links (e.g., Primary/Secondary).
- [ ] Provide accessible labels and focusable controls within the actions region.
- [ ] Showcase a header with both a badge and actions in \`App\`.

### Stage 4: Integration and Polishing
- [ ] Refine visual treatment: border, subtle gradient background, and rounded corners.
- [ ] Add button styles (default and primary) to support common header actions.
- [ ] Validate keyboard navigation and readable contrast for text and controls.
- [ ] Present three examples in \`App\`: minimal, left-aligned with subtitle, and badge + actions.
    `,
    files: {
    "/styles.css": `
/* Guided Template: Header styles
Your turn:
- [ ] Pick brand colors by editing the CSS variables below
- [ ] Adjust spacing/rounding if desired
*/
:root {
  /* TODO: Set your brand colors */
  --brand-bg: #3d8bff; /* primary button bg */
  --brand-border: #2d6fd1; /* primary button border */
  --panel-border: #23314f; /* header border */
  --page-bg: #0b1020; /* page background */
  --text: #e6e8ef; /* base text color */
}

/* Base page styles */
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  margin: 0;
  padding: 24px;
  background: var(--page-bg);
  color: var(--text);
}

/*
Header component styles
- .header: the container
- .header--center / .header--left: alignment variants
- .header__title: main title
- .header__subtitle: secondary description
- .header__badge: small label chip
- .header__actions: right-side action area (buttons, links)
*/
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid var(--panel-border);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

.header__main {
  display: grid;
  gap: 6px;
}

.header--center .header__main {
  justify-items: center;
  text-align: center;
}

.header--left .header__main {
  justify-items: start;
  text-align: left;
}

.header__title {
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
}

.header__subtitle {
  font-size: 14px;
  color: #a7b1c2;
}

.header__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  font-size: 12px;
  color: #9ac4ff;
  background: rgba(61, 139, 255, 0.12);
  border: 1px solid rgba(61, 139, 255, 0.35);
  border-radius: 999px;
}

.header__actions {
  display: inline-flex;
  gap: 8px;
}

.btn {
  appearance: none;
  font: inherit;
  color: var(--text);
  background: #171d33;
  border: 1px solid #2a3a5e;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn--primary {
  background: var(--brand-bg);
  border-color: var(--brand-border);
}
`,
    "/App.js": `
// Header Configuration — Guided Template
// Read the plan in the course sidebar, then follow the TODOs below.

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Verify Header renders with only a title
- [ ] Stage 2: Switch alignment between "center" and "left"
- [ ] Stage 3: Add a badge and right-side actions
- [ ] Stage 4: Refine visuals and ensure accessibility
*/

// Reusable header component (completed example)
function Header({
  title,
  subtitle,
  align = "center", // "center" | "left"
  showBadge = false,
  badgeText = "",
  actions,
}) {
  const alignmentClass = align === "left" ? "header--left" : "header--center";

  return (
    <div className={["header", alignmentClass].join(" ")}> 
      <div className="header__main">
        {showBadge && badgeText ? (
          <span className="header__badge">{badgeText}</span>
        ) : null}
        <div className="header__title">{title}</div>
        {subtitle ? <div className="header__subtitle">{subtitle}</div> : null}
      </div>
      {actions ? <div className="header__actions">{actions}</div> : null}
    </div>
  );
}

// Example action buttons used in demos (you can customize this)
function Actions() {
  return (
    <>
      <button className="btn">Secondary</button>
      <button className="btn btn--primary">Primary</button>
    </>
  );
}

export default function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Example 1: Minimal header — centered title only */}
      <Header title="Project Overview" />

      {/* Example 2: Left-aligned header with subtitle */}
      <Header
        title="Team Dashboard"
        subtitle="Key metrics and recent activity"
        align="left"
      />

      {/* Example 3: Header with badge and actions */}
      <Header
        title="Release 1.2.0"
        subtitle="Cut candidate ready for QA"
        align="center"
        showBadge
        badgeText="Live"
        actions={<Actions />}
      />

      {/* Your Turn: Edit this example to complete the checklist */}
      {/* TODO: Change the title and subtitle to describe your page */}
      {/* TODO: Try align="left" and align="center" to see the difference */}
      {/* TODO: Toggle showBadge and adjust badgeText (e.g., "Beta", "Draft") */}
      {/* TODO: Replace <Actions /> with your own buttons/links if you want */}
      <Header
        title="Your Custom Header"
        subtitle="Describe the context or purpose here"
        align="left"
        showBadge={true}
        badgeText="Beta"
        actions={<Actions />}
      />
    </div>
  );
}
`,
  } }