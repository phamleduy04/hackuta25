import { useMemo, useState } from "react";
import { Search, ArrowRight, Clock, TrendingUp, Sparkles } from "lucide-react";
import "./explore.css";
import { frameworks, courses, userEnrollments, type FrameworkKey, type Course } from "../dashboard/courses";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ExploreCourses() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<FrameworkKey | "all">("all");
  const [query, setQuery] = useState("");

  const nonEnrolled: Array<Course> = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (c.id in userEnrollments) return false;
      if (selectedCategory !== "all" && c.framework !== selectedCategory) return false;
      if (!q) return true;
      const fw = frameworks.find((f) => f.key === c.framework)?.name.toLowerCase() ?? "";
      return c.title.toLowerCase().includes(q) || fw.includes(q);
    });
  }, [selectedCategory, query]);

  const featured = useMemo(() => nonEnrolled.slice(0, 3), [nonEnrolled]);

  return (
    <div className="ex-root">
      {/* Top Nav */}
      <nav className="ex-nav">
        <button className="ex-brand" onClick={() => navigate("/")}>CAPYCODE</button>
        <div className="ex-nav-links">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="active">Explore</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="ex-hero">
        <div className="ex-hero-content">
          <div className="ex-badge">
            <Sparkles size={14} />
            <span>New modules every week</span>
          </div>
          <h1 className="ex-hero-title">
            Discover Your Next <span className="gradient">Learning Adventure</span>
          </h1>
          <p className="ex-hero-sub">
            Explore curated coding modules across React, Vue, Python, and JavaScript. 
            Build real projects, learn by doing, and level up your skills.
          </p>
          <div className="ex-search-bar">
            <Search size={18} />
            <input
              placeholder="Search courses by name or framework..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="ex-categories">
        <div className="ex-container">
          <h2 className="ex-section-title">Browse by Framework</h2>
          <div className="ex-pills">
            <button
              className={`ex-pill ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All Courses
            </button>
            {frameworks.map((f) => (
              <button
                key={f.key}
                className={`ex-pill ${selectedCategory === f.key ? "active" : ""}`}
                onClick={() => setSelectedCategory(f.key)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featured.length > 0 && (
        <section className="ex-featured">
          <div className="ex-container">
            <div className="ex-featured-head">
              <div>
                <h2 className="ex-section-title">Featured This Week</h2>
                <p className="ex-section-sub">Handpicked modules to kickstart your learning</p>
              </div>
              <TrendingUp size={24} className="ex-icon-accent" />
            </div>
            <div className="ex-featured-grid">
              {featured.map((c) => (
                <AlertDialog key={c.id}>
                  <AlertDialogTrigger asChild>
                    <div className="ex-featured-card">
                      <div className="ex-featured-badge">{frameworks.find((f) => f.key === c.framework)?.name}</div>
                      <h3>{c.title}</h3>
                      <p>{c.difficulty}</p>
                      <div className="ex-featured-meta">
                        <Clock size={14} />
                        <span>{c.durationMin} min</span>
                      </div>
                      <div className="ex-featured-cta">
                        Enroll Now <ArrowRight size={16} />
                      </div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Enroll in {c.title}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Learn using the {frameworks.find((f) => f.key === c.framework)?.name} framework. Estimated {c.durationMin} minutes. Confirm to add this module to your dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          userEnrollments[c.id] = "enrolled";
                          navigate("/dashboard");
                        }}
                      >
                        Confirm Enroll
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses Grid */}
      <section className="ex-all">
        <div className="ex-container">
          <h2 className="ex-section-title">All Available Courses</h2>
          <div className="ex-grid">
            {nonEnrolled.map((c) => (
              <AlertDialog key={c.id}>
                <AlertDialogTrigger asChild>
                  <div className="ex-course-card">
                    <div className="ex-course-header">
                      <span className="ex-course-level">{c.difficulty}</span>
                      <span className="ex-course-fw">{frameworks.find((f) => f.key === c.framework)?.name}</span>
                    </div>
                    <h3 className="ex-course-title">{c.title}</h3>
                    <div className="ex-course-footer">
                      <div className="ex-course-duration">
                        <Clock size={14} />
                        <span>{c.durationMin}m</span>
                      </div>
                      <button className="ex-course-btn">
                        View <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Enroll in {c.title}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Learn using the {frameworks.find((f) => f.key === c.framework)?.name} framework. Estimated {c.durationMin} minutes. Confirm to add this module to your dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        userEnrollments[c.id] = "enrolled";
                        navigate("/dashboard");
                      }}
                    >
                      Confirm Enroll
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </div>
          {nonEnrolled.length === 0 && (
            <div className="ex-empty">
              <p>No courses match your search. Try a different filter or keyword.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="ex-footer">
        <p>© 2025 CapyCode • Built for learners who refuse to quit</p>
      </footer>
    </div>
  );
}
