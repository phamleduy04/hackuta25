import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, List, Search, Check } from "lucide-react";
import "./dashboard.css";
import { frameworks, courses, userEnrollments, type FrameworkKey, type Course } from "./courses";
import Sidebar, { type TabKey } from "./Sidebar";

export default function Dashboard() {
  const [active, setActive] = useState<TabKey>("modules");
  const [selectedFramework, setSelectedFramework] = useState<FrameworkKey | "all">("all");
  const [inputQuery, setInputQuery] = useState("");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [condensed, setCondensed] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => {
      setCondensed(el.scrollTop > 10);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Debounce search input => query
  useEffect(() => {
    const timer = setTimeout(() => setQuery(inputQuery), 250);
    return () => clearTimeout(timer);
  }, [inputQuery]);

  // Command palette shortcut: Cmd+K / Ctrl+K focuses the search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey && isK) || (e.ctrlKey && isK)) {
        e.preventDefault();
        const node = searchRef.current;
        if (node) {
          node.focus();
          node.select();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Subtle spotlight cursor effect
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const visibleCourses: Array<Course> = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(c => {
      if (selectedFramework !== "all" && c.framework !== selectedFramework) return false;
      if (!q) return true;
      const fw = frameworks.find(f => f.key === c.framework)?.name.toLowerCase() ?? "";
      return c.title.toLowerCase().includes(q) || fw.includes(q);
    });
  }, [selectedFramework, query]);

  const enrolled = useMemo(() => visibleCourses.filter(c => c.id in userEnrollments && userEnrollments[c.id] !== "finished"), [visibleCourses]);
  const finished = useMemo(() => visibleCourses.filter(c => userEnrollments[c.id] === "finished"), [visibleCourses]);
  // nonEnrolled only used on Explore page now

  const completedCount = Object.values(userEnrollments).filter(s => s === "finished").length;

  return (
    <div className="ld-root">
      {/* Sidebar */}
      <Sidebar active={active} onChange={setActive} />

      {/* Main Content */}
      <main className="ld-main" ref={mainRef}>
        <header className={`ld-header glass ${condensed ? "condensed" : ""}`}>
          <div className="ld-header-content">
            <div className="ld-header-brand">
              <img 
                src="/assets/logo/logo_white.png" 
                alt="CAPYCODE" 
                className="ld-header-logo"
              />
              <div className="ld-header-text">
                <h1 className="ld-title">Learning Dashboard</h1>
                <p className="ld-sub">Choose a framework and start learning with focused modules.</p>
              </div>
            </div>
          </div>
          <div className="ld-actions-row">
            <div className="ld-search glass">
              <Search size={18} />
              <input
                aria-label="Search frameworks and courses"
                placeholder="Search frameworks and courses"
                ref={searchRef}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
              />
              <span className="ld-hint">⌘K / Ctrl K</span>
            </div>
            <div className="ld-stats">
              <div className="ld-chip glass"><span className="k">Enrolled</span><span className="v">{Object.keys(userEnrollments).length}</span></div>
              <div className="ld-chip glass"><span className="k">Finished</span><span className="v">{Object.values(userEnrollments).filter(s => s === "finished").length}</span></div>
              <div className="ld-chip glass"><span className="k">Time</span><span className="v">{courses.filter(c => userEnrollments[c.id] === "finished").reduce((sum, c) => sum + c.durationMin, 0)}m</span></div>
            </div>
            <div className="ld-toggle segmented">
              <div className={`ld-toggle-thumb ${view}`}></div>
              <button
                className={`ld-toggle-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`ld-toggle-btn ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </header>
        <div className="ld-progress-row glass" role="group" aria-label="Course progress">
          <div className="ld-progress segments" aria-hidden="true">
            {Array.from({ length: courses.length }).map((_, i) => (
              <div key={i} className={`seg ${i < completedCount ? "done" : ""}`} style={{ animationDelay: `${i * 0.02}s` }} />
            ))}
          </div>
          <span className="ld-meta-inline">{completedCount} / {courses.length} finished</span>
        </div>

        {active === "modules" && (
          <section className="ld-section">
            <div className="ld-2col">
              <div className="ld-left">
                <h2 className="ld-section-title">Choose a Framework</h2>
                <div className="ld-fw-row">
                  <button
                    className={`ld-fw ${selectedFramework === "all" ? "active" : ""}`}
                    onClick={() => setSelectedFramework("all")}
                  >All{query.trim() ? <span className="ld-badge">{visibleCourses.length}</span> : null}</button>
                  {frameworks.map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.key}
                        className={`ld-fw ${selectedFramework === f.key ? "active" : ""}`}
                        onClick={() => setSelectedFramework(f.key)}
                      >
                        <Icon size={16} style={{ color: f.color }} />
                        <span>{f.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="ld-explore-head">
                  <h3 className="ld-section-sub">Explore New Courses</h3>
                  <button className="ld-primary" onClick={() => { window.location.href = "/explore"; }}>
                    Explore Courses
                  </button>
                </div>
              </div>
              <div className="ld-right">
                <h3 className="ld-section-sub">Currently Enrolled</h3>
            <div className={`ld-courses ${view}`}>
              {enrolled.map((c) => {
                const framework = frameworks.find(f=>f.key===c.framework);
                const Icon = framework?.icon;
                return (
                  <button key={c.id} className={`ld-course glass ${view}`} onClick={() => { window.location.href = `/modules/${c.id}`; }}>
                    <div className="ld-course-badges">
                      <span className="ld-pill">{c.difficulty}</span>
                      <span className="ld-pill alt">{c.durationMin}m</span>
                      {userEnrollments[c.id] === "finished" ? (
                        <span className="ld-pill check" aria-label="Finished"><Check size={14} /></span>
                      ) : null}
                    </div>
                    {Icon && (
                      <div className="ld-course-icon" style={{ backgroundColor: `${framework.color}15`, borderColor: `${framework.color}40` }}>
                        <Icon size={24} style={{ color: framework.color }} />
                      </div>
                    )}
                    <div className="ld-course-main">
                      <div className="ld-course-title">{c.title}</div>
                      <div className="ld-course-meta">{userEnrollments[c.id] === "finished" ? "Finished" : "Enrolled"} • {framework?.name} • {c.durationMin}m</div>
                    </div>
                  </button>
                );
              })}
              {enrolled.length === 0 && <div className="ld-empty">You haven't enrolled in any courses yet.</div>}
            </div>

                {finished.length > 0 && (
                  <>
                    <h3 className="ld-section-sub">Finished</h3>
                    <div className={`ld-courses ${view}`}>
                      {finished.map((c) => {
                        const framework = frameworks.find(f=>f.key===c.framework);
                        const Icon = framework?.icon;
                        return (
                          <button key={c.id} className={`ld-course glass ${view} finished`} onClick={() => { window.location.href = `/modules/${c.id}`; }}>
                            <div className="ld-course-badges">
                              <span className="ld-pill">{c.difficulty}</span>
                              <span className="ld-pill alt">{c.durationMin}m</span>
                              <span className="ld-pill check" aria-label="Finished"><Check size={14} /></span>
                            </div>
                            {Icon && (
                              <div className="ld-course-icon" style={{ backgroundColor: `${framework.color}15`, borderColor: `${framework.color}40` }}>
                                <Icon size={24} style={{ color: framework.color }} />
                              </div>
                            )}
                            <div className="ld-course-main">
                              <div className="ld-course-title">{c.title}</div>
                              <div className="ld-course-meta">Finished • {framework?.name} • {c.durationMin}m</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {active === "account" && (
          <section className="ld-section">
            <div className="ld-account-form glass">
              <div className="row">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="row">
                <label htmlFor="password">Change Password</label>
                <input id="password" type="password" placeholder="New password" />
              </div>
              <div className="row">
                <label htmlFor="pfp">Profile Picture</label>
                <input id="pfp" type="file" accept="image/*" />
              </div>
              <div className="row actions">
                <button className="ld-primary">Save Changes</button>
                <button className="ld-danger">Delete Account</button>
                <button className="ld-secondary">Logout</button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="ld-footer">
          <p>© 2025 CapyCode • Built for learners who refuse to quit</p>
        </footer>
      </main>
    </div>
  );
}