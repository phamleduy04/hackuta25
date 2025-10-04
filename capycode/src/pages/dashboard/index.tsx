import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import "./dashboard.css";
import { frameworks, courses, userEnrollments, type FrameworkKey, type Course } from "./courses";
import Sidebar, { type TabKey } from "./Sidebar";

export default function Dashboard() {
  const [active, setActive] = useState<TabKey>("modules");
  const [selectedFramework, setSelectedFramework] = useState<FrameworkKey | "all">("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visibleCourses: Array<Course> = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(c => {
      if (selectedFramework !== "all" && c.framework !== selectedFramework) return false;
      if (!q) return true;
      const fw = frameworks.find(f => f.key === c.framework)?.name.toLowerCase() ?? "";
      return c.title.toLowerCase().includes(q) || fw.includes(q);
    });
  }, [selectedFramework, query]);

  const enrolled = useMemo(() => visibleCourses.filter(c => c.id in userEnrollments), [visibleCourses]);
  const finished = useMemo(() => visibleCourses.filter(c => userEnrollments[c.id] === "finished"), [visibleCourses]);
  // nonEnrolled only used on Explore page now

  const completedCount = Object.values(userEnrollments).filter(s => s === "finished").length;
  const progressPct = Math.round((completedCount / courses.length) * 100);

  return (
    <div className="ld-root">
      {/* Sidebar */}
      <Sidebar active={active} onChange={setActive} />

      {/* Main Content */}
      <main className="ld-main">
        <header className="ld-header glass">
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="ld-toggle">
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
        <div className="ld-progress glass" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="bar" style={{ width: `${progressPct}%` }} />
          <div className="meta">{completedCount} finished • {courses.length} total ({progressPct}%)</div>
        </div>

        {active === "modules" && (
          <section className="ld-section">
            <h2 className="ld-section-title">Choose a Framework</h2>
            <div className="ld-fw-row">
              <button
                className={`ld-fw ${selectedFramework === "all" ? "active" : ""}`}
                onClick={() => setSelectedFramework("all")}
              >All</button>
              {frameworks.map((f) => (
                <button
                  key={f.key}
                  className={`ld-fw ${selectedFramework === f.key ? "active" : ""}`}
                  onClick={() => setSelectedFramework(f.key)}
                >{f.name}</button>
              ))}
            </div>

            <h3 className="ld-section-sub">Your Courses</h3>
            <div className={`ld-courses ${view}`}>
              {enrolled.map((c) => (
                <button key={c.id} className={`ld-course glass ${view}`} onClick={() => { window.location.href = `/modules/${c.id}`; }}>
                  <div className="ld-course-main">
                    <div className="ld-course-title">{c.title}</div>
                    <div className="ld-course-meta">{userEnrollments[c.id] === "finished" ? "Finished" : "Enrolled"} • {frameworks.find(f=>f.key===c.framework)?.name} • {c.durationMin}m</div>
                  </div>
                </button>
              ))}
              {enrolled.length === 0 && <div className="ld-empty">You haven't enrolled in any courses yet.</div>}
            </div>

            {finished.length > 0 && (
              <>
                <h3 className="ld-section-sub">Finished</h3>
                <div className={`ld-courses ${view}`}>
                  {finished.map((c) => (
                    <button key={c.id} className={`ld-course glass ${view} finished`} onClick={() => { window.location.href = `/modules/${c.id}`; }}>
                      <div className="ld-course-main">
                        <div className="ld-course-title">{c.title}</div>
                        <div className="ld-course-meta">Finished • {frameworks.find(f=>f.key===c.framework)?.name} • {c.durationMin}m</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="ld-explore-head">
              <h3 className="ld-section-sub">Explore New Courses</h3>
              <button className="ld-primary" onClick={() => { window.location.href = "/explore"; }}>
                Explore Courses
              </button>
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
      </main>
    </div>
  );
}