import { useEffect, useMemo, useState } from "react";
import { Library, User2 } from "lucide-react";
import { useVoice } from "@/hooks/use-voice";
import { Button } from "@/components/ui/button";

export type TabKey = "modules" | "account";

type Props = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

function computeWidth(inner: number): number {
  if (inner < 480) return 72;
  if (inner < 820) return 90;
  if (inner < 1100) return 160;
  if (inner < 1440) return 200;
  return 220; // professional default
}

export default function Sidebar({ active, onChange }: Props) {
  const [width, setWidth] = useState<number>(() => computeWidth(window.innerWidth));

  const { startSession } = useVoice();

  useEffect(() => {
    const onResize = () => setWidth(computeWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--ld-sidebar-w", `${width}px`);
  }, [width]);

  const isCompact = useMemo(() => width <= 100, [width]);

  return (
    <aside className={`ld-sidebar ${isCompact ? "compact" : ""}`} style={{ width }}>
      <a className="ld-brand" href="/" aria-label="CAPYCODE">
        <span className="ld-brand-text">CAPYCODE</span>
      </a>

      <nav className="ld-nav w-full flex flex-col gap-2 justify-center items-center">
        <button
          className={`ld-nav-btn ${active === "modules" ? "active" : ""}`}
          onClick={() => onChange("modules")}
          aria-label="Modules"
        >
          <Library size={20} />
          <span>Modules</span>
        </button>
        <Button className="w-full cursor-pointer ld-nav-btn" onClick={startSession}>Start Session</Button>
      </nav>

      <div className="ld-account">
        <button
          className={`ld-nav-btn ${active === "account" ? "active" : ""}`}
          onClick={() => onChange("account")}
          aria-label="Account"
        >
          <User2 size={20} />
          <span>Account</span>
        </button>
      </div>
    </aside>
  );
}


