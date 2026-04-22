import { useEffect, useRef, useState } from "react";

// Hook animasi scroll — hanya eksekusi 1x
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // 1x saja
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function AnimItem({ children, delay = "0s", className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}`,
      }}
    >
      {children}
    </div>
  );
}

function AnimLine() {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className="max-w-6xl mx-auto px-10 max-sm:px-5">
      <hr
        className="border-none border-t relative"
        style={{
          borderTopWidth: "1px",
          borderTopColor: "#F5E6D3",
          opacity: visible ? 1 : 0,
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "opacity 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

// Social icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

const socials = [
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <TwitterIcon />, label: "Twitter" },
];

const platform = ["Explore Jobs", "Browse Course"];
const support = ["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"];

export default function FooterEqualWorks() {
  const [activeLocale, setActiveLocale] = useState("English (US)");
  const [logoHover, setLogoHover] = useState(false);

  return (
    <footer
      className="relative overflow-hidden mt-20"
      style={{
        background: "#FFFFFF",
        borderTop: "2px solid #F97316",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
      />

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-10 pt-16 pb-12 grid grid-cols-4 gap-12 max-[900px]:grid-cols-2 max-sm:grid-cols-1 max-sm:px-5 max-sm:pt-10 max-sm:pb-8">

        {/* Brand */}
        <AnimItem delay="0.05s" className="max-[900px]:col-span-2 max-sm:col-span-1 flex flex-col gap-5">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 no-underline w-fit"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className="flex flex-col gap-1.5 w-12 justify-center">
              {[100, logoHover ? 100 : 72, logoHover ? 80 : 50].map((w, i) => (
                <span
                  key={i}
                  className="block h-0.5 rounded-full"
                  style={{
                    width: `${w}%`,
                    background: "#F97316",
                    transformOrigin: "left",
                    transition: "width 0.3s ease",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1 }}>
              <span style={{ color: "#F97316" }}>Equal</span>
              <span style={{ color: "#1C1917", fontWeight: 400 }}>Works</span>
            </div>
          </a>

          <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#78716C", fontWeight: 300, maxWidth: 240 }}>
            EqualWorks menghubungkan pembelajaran digital dengan peluang kerja secara inklusif melalui Smart Matching.
          </p>

          <div className="flex gap-3 mt-1">
            {socials.map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center rounded-xl cursor-pointer"
                style={{
                  width: 36, height: 36,
                  border: "1.5px solid #F5E6D3",
                  color: "#78716C",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  Object.assign(e.currentTarget.style, {
                    borderColor: "#F97316",
                    background: "#F97316",
                    color: "white",
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: "0 8px 20px rgba(249,115,22,0.3)",
                  });
                }}
                onMouseLeave={e => {
                  Object.assign(e.currentTarget.style, {
                    borderColor: "#F5E6D3",
                    background: "transparent",
                    color: "#78716C",
                    transform: "none",
                    boxShadow: "none",
                  });
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </AnimItem>

        {/* Platform */}
        <AnimItem delay="0.15s" className="flex flex-col gap-5">
          <NavCol heading="Platform" links={platform} />
        </AnimItem>

        {/* Support */}
        <AnimItem delay="0.25s" className="flex flex-col gap-5">
          <NavCol heading="Support" links={support} />
        </AnimItem>

        {/* Download */}
        <AnimItem delay="0.35s" className="flex flex-col gap-5">
          <AppCol />
        </AnimItem>
      </div>

      {/* Divider */}
      <AnimLine />

      {/* Bottom bar */}
      <AnimItem
        delay="0.12s"
        className="max-w-6xl mx-auto px-10 py-5 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:px-5 max-sm:gap-3"
      >
        <p style={{ fontSize: 12.5, color: "#A8A29E", fontWeight: 400 }}>
          © 2024 <strong style={{ color: "#78716C", fontWeight: 500 }}>CeHat (Cepat Sehat)</strong>. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {["English (US)", "IDR (Rp)"].map((loc, i) => (
            <>
              {i > 0 && <div className="w-1 h-1 rounded-full" style={{ background: "#F5E6D3" }} />}
              <button
                key={loc}
                onClick={() => setActiveLocale(loc)}
                style={{
                  fontSize: 12,
                  color: activeLocale === loc ? "#F97316" : "#A8A29E",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: activeLocale === loc ? "1px solid #FED7AA" : "1px solid transparent",
                  background: activeLocale === loc ? "rgba(249,115,22,0.05)" : "transparent",
                  fontFamily: "'Sora', sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                {loc}
              </button>
            </>
          ))}
        </div>
      </AnimItem>
    </footer>
  );
}

function NavCol({ heading, links }) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        className="relative pb-3.5"
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#1C1917",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {heading}
        <span
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{
            width: hovered ? 48 : 24,
            background: "#F97316",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        {links.map(link => (
          <NavLink key={link} label={link} />
        ))}
      </div>
    </>
  );
}

function NavLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      className="flex items-center gap-1.5 no-underline w-fit"
      style={{
        fontSize: 14,
        color: hovered ? "#F97316" : "#78716C",
        fontWeight: 400,
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        transition: "all 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="rounded-full"
        style={{
          width: hovered ? 12 : 0,
          height: 1.5,
          background: "#F97316",
          transition: "width 0.2s ease",
          display: "inline-block",
        }}
      />
      {label}
    </a>
  );
}

function AppCol() {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        className="relative pb-3.5"
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#1C1917",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Download Our App
        <span
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{
            width: hovered ? 48 : 24,
            background: "#F97316",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.6, fontWeight: 300 }}>
        Get the best experience on your mobile device.
      </p>
      <div className="flex flex-col gap-2.5">
        <AppButton icon={<PlayIcon />} sub="Get it on" label="Play Store" />
        <AppButton icon={<AppleIcon />} sub="Download on" label="App Store" />
      </div>
    </>
  );
}

function AppButton({ icon, sub, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-xl relative overflow-hidden no-underline"
      style={{
        padding: "11px 16px",
        border: hovered ? "1.5px solid #F97316" : "1.5px solid #F5E6D3",
        background: hovered ? "#F97316" : "#FFFBF5",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.25)" : "none",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center rounded-lg flex-shrink-0"
        style={{
          width: 32, height: 32,
          background: hovered ? "rgba(255,255,255,0.2)" : "linear-gradient(135deg,#F97316,#EA6C0A)",
          transition: "background 0.25s ease",
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span style={{ fontSize: 10, color: hovered ? "rgba(255,255,255,0.75)" : "#A8A29E", fontWeight: 400, letterSpacing: "0.02em", transition: "color 0.2s" }}>{sub}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? "white" : "#1C1917", transition: "color 0.2s" }}>{label}</span>
      </div>
    </a>
  );
}