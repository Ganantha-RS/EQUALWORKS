import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

// ── Intersection hook (fires once) ──────────────────────────────────────────
function useOnceVisible(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated counter ────────────────────────────────────────────────────────
function Counter({ value, suffix, visible }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let frame;
    const start = performance.now();
    const duration = 1600;
    const end = parseFloat(value.replace(/[^0-9.]/g, ""));

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  const formatted = display >= 1000 ? display.toLocaleString("en-US") : String(display);
  return <>{formatted}{suffix}</>;
}

const stats = [
  { value: "12000", suffix: "+", label: "Active Learners" },
  { value: "2800",  suffix: "+", label: "Job Placements" },
  { value: "94",    suffix: "%", label: "Accessibility Rating" },
  { value: "48",    suffix: "",  label: "Employer Partners" },
];

function StatCard({ stat, idx, visible }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-6 sm:py-8 text-center overflow-hidden group cursor-default"
      style={{
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 4px 28px rgba(0,0,0,0.12)",
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${320 + idx * 110}ms, transform .65s cubic-bezier(.22,1,.36,1) ${320 + idx * 110}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <p
        className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 relative z-10 bg-gradient-to-r from-[#EC6910] to-[#f2cc0f] bg-clip-text text-transparent"
      >
        {visible ? <Counter value={stat.value} suffix={stat.suffix} visible={visible} /> : `0${stat.suffix}`}
      </p>
      <p className="text-sm font-medium relative z-10 bg-gradient-to-r from-[#EC6910] to-[#dcbb18] bg-clip-text text-transparent" style={{ opacity: 0.75 }}>
        {stat.label}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function RealImpact() {
  const [secRef, visible] = useOnceVisible(0.15);

  return (
    <section
      ref={secRef}
      className="relative w-full overflow-hidden py-16 sm:py-20 mt-30"
      style={{
        background: "linear-gradient(90deg, #EC6910 0%, #FFD400 105%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Subtle noise / depth blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 rounded-full bg-yellow-200/10 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div
          className="text-center mb-10 sm:mb-12"
          style={{
            transition: "opacity .75s cubic-bezier(.22,1,.36,1) 80ms, transform .75s cubic-bezier(.22,1,.36,1) 80ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-22px)",
          }}
        >
          <p className="text-white/80 text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Real Impact
          </p>
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-3">
            Changing lives through inclusion
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Every metric here represents a person who got a fair shot.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} idx={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
