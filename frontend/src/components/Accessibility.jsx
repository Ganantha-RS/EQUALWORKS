import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: "Text-to-Speech",
    description:
      "Teknologi pembaca layar terintegrasi yang mampu menangani kode kompleks dan diagram visual dengan mudah.",
    delay: 0,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "High Contrast",
    description:
      "Tema visual yang dapat disesuaikan dan dirancang untuk penyandang gangguan penglihatan, memastikan kejelasan di semua tampilan dasbor.",
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
    title: "BISINDO Translation",
    description:
      "Teks terjemahan bahasa isyarat secara real-time untuk semua konten video, diajarkan oleh penutur asli BISINDO.",
    delay: 240,
  },
];

function useIntersection(threshold = 0.2) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggered]);

  return [ref, triggered];
}

function FeatureCard({ icon, title, description, delay, triggered }) {
  return (
    <div
      className="relative group flex flex-col gap-5 bg-white rounded-2xl p-7 border border-stone-200/80 shadow-sm overflow-hidden"
      style={{
        fontFamily: "poppins",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0px)" : "translateY(36px)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(212,168,80,0.07) 0%, transparent 70%)" }} />

      <div className="self-start p-3.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-500 group-hover:bg-amber-100 group-hover:border-amber-300 transition-colors duration-300">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-stone-800 text-[1.05rem] mb-2 tracking-tight">{title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
    </div>
  );
}

export default function AccessibilitySection() {
  const [sectionRef, triggered] = useIntersection(0.15);

  return (
    <section
      style={{ fontFamily: "poppins" }}
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-50/60 blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16"
          style={{
            transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
            opacity: triggered ? 1 : 0,
            transform: triggered ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <span className="inline-flex items-center gap-2 text-amber-500 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            <span className="w-6 h-px bg-amber-400 inline-block" />
            Aksesibilitas
            <span className="w-6 h-px bg-amber-400 inline-block" />
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-stone-800 leading-tight tracking-tight mb-4"
            style={{ fontFamily: "poppins" }}>
            Aksesibilitas adalah{" "}
            <span className="relative inline-block">
              Inti dari Layanan
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-amber-200 rounded-full" />
            </span>{" "}
            Kami
          </h2>

          <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
            We've built tools directly into the platform to ensure every user
            has the best experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}