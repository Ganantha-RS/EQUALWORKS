import { useEffect, useRef, useState } from "react";

function useOnceVisible(threshold = 0.15) {
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

function Counter({ target, suffix = "", visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = parseFloat(target);
    const duration = 1200;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <>{val}{suffix}</>;
}

function Ring({ pct, visible, size = 64, stroke = 5 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const progress = visible ? circ - (pct / 100) * circ : circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#f3e8d4" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#ringGrad)" strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={progress}
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }} />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const jobs = [
  {
    title: "Frontend Developer",
    company: "PT. INDITARA",
    location: "Remote — Indonesia",
    type: "Full-Time",
    tags: ["React", "TypeScript"],
    match: 94,
  },
  {
    title: "Product Designer",
    company: "Traveloka",
    location: "Work From Office — Indonesia",
    type: "Contract",
    tags: ["Figma", "UX Research"],
    match: 87,
  },
  {
    title: "Data Analyst",
    company: "PT. MALA",
    location: "Remote — Indonesia",
    type: "Full-Time",
    tags: ["Python", "SQL"],
    match: 72,
  },
];

const stats = [
  { value: 86, suffix: "%", label: "Average match score" },
  { value: 73, suffix: "%", label: "Hired within 60 days" },
  { value: 100, suffix: "%", label: "Remote-only listings" },
  { value: 500, suffix: "+", label: "Verified employers" },
];

const BriefcaseIcon = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function JobCard({ job, idx, visible }) {
  const typeColor = job.type === "Full-Time"
    ? "bg-orange-50 text-orange-500 border-orange-200"
    : "bg-amber-50 text-amber-600 border-amber-200";

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      style={{
        transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${idx * 130}ms, transform .6s cubic-bezier(.22,1,.36,1) ${idx * 130}ms, box-shadow .3s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-32px)",
      }}
    >
      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <Ring pct={job.match} visible={visible} size={62} stroke={5} />
          <span className="absolute text-sm font-bold text-orange-500">{job.match}%</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-gray-800 text-[0.97rem] leading-snug">{job.title}</h3>
            <span className={`flex-shrink-0 text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full border ${typeColor}`}>
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400 text-xs mb-2.5">
            <span className="flex items-center gap-1"><BriefcaseIcon />{job.company}</span>
            <span className="flex items-center gap-1"><PinIcon />{job.location}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.tags.map(t => (
              <span key={t} className="text-[0.7rem] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-gray-100">
        <span className="text-xs font-medium text-orange-400">{job.match}% match with your profile</span>
        <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold shadow-sm hover:shadow-orange-200 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
          Apply
        </button>
      </div>
    </div>
  );
}

function StatCard({ stat, idx, visible }) {
  return (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 shadow-md p-5 overflow-hidden group hover:shadow-md transition-all duration-300"
      style={{
        transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${200 + idx * 100}ms, transform .6s cubic-bezier(.22,1,.36,1) ${200 + idx * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-1">
        <Counter target={stat.value} suffix={stat.suffix} visible={visible} />
      </p>
      <p className="text-xs text-orange-400 font-medium">{stat.label}</p>
    </div>
  );
}

export default function SmartJobMatching() {
  const [secRef, visible] = useOnceVisible(0.1);

  return (
    <section
      ref={secRef}
      className="w-full  py-20 px-4 sm:px-8 overflow-hidden mt-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      <div className="max-w-5xl mx-auto">
        <div
          className="text-center mb-10"
          style={{
            transition: "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
            Smart Job Matching
          </h2>
          <div className="mt-2 mx-auto w-10 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          <div className="flex-1 w-full flex flex-col gap-4">
            {jobs.map((job, i) => (
              <JobCard key={job.title} job={job} idx={i} visible={visible} />
            ))}
          </div>

          <div className="lg:w-[46%] w-full flex flex-col gap-6">
            <div
              style={{
                transition: "opacity .7s cubic-bezier(.22,1,.36,1) 100ms, transform .7s cubic-bezier(.22,1,.36,1) 100ms",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight tracking-tight mb-3">
                Jobs matched by data,{" "}
                <span className="relative inline-block">
                  not luck
                  <span className="absolute -bottom-0.5 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
                </span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our algorithm analyzes your skills, goals, and accessibility requirements
                to surface the most relevant remote opportunities — ranked by real compatibility.
              </p>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} idx={i} visible={visible} />
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                transition: "opacity .7s cubic-bezier(.22,1,.36,1) 600ms, transform .7s cubic-bezier(.22,1,.36,1) 600ms",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold shadow-md hover:shadow-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                View Jobs Matches
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}