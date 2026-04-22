import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

const toggleData = [
  { id: "tts", icon: "image/Mic.png", label: "Text-to-Speech" },
  { id: "hc", icon: "image/Eye.png", label: "High Contrast" },
  { id: "bisindo", icon: "image/Hand.png", label: "BISINDO Translation" },
];

const Toggle = ({ on, onClick }) => (
  <motion.div
    onClick={onClick}
    className="relative cursor-pointer rounded-full flex-shrink-0"
    style={{
      width: 44,
      height: 26,
      background: on
        ? "linear-gradient(135deg, #EC6910, #ffd500)"
        : "rgba(255,255,255,0.25)",
      border: on ? "none" : "1.5px solid rgba(255,255,255,0.3)",
    }}
    transition={{ duration: 0.25 }}
  >
    <motion.div
      className="absolute top-[3px] rounded-full bg-white shadow-md"
      style={{ width: 20, height: 20 }}
      animate={{ left: on ? 21 : 3 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  </motion.div>
);

const AccessibilityCard = () => {
  const [states, setStates] = useState({ tts: true, hc: false, bisindo: true });
  const toggle = (id) => setStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <motion.div
      className="rounded-2xl p-6 sm:p-7 flex-shrink-0"
      style={{
        width: "min(440px, 88vw)",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        fontFamily: "poppins",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-2 mb-5">
        <img src="image/Access.png" alt="" />
        <span className="text-white font-semibold text-lg tracking-wide">
          Accessibility Toolbar
        </span>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: 18 }} />

      <div className="flex flex-col gap-5">
        {toggleData.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={item.icon} alt="" />
              <span className="text-white text-base font-medium">{item.label}</span>
            </div>
            <Toggle on={states[item.id]} onClick={() => toggle(item.id)} />
          </div>
        ))}
      </div>

      <motion.div
        className="mt-6 rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-white/70 text-xs leading-relaxed">
          "Fitur adaptif EqualWorks memastikan Anda dapat fokus pada pembelajaran,
          terlepas dari bagaimana Anda berinteraksi dengan web."
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <section
      className="relative mx-3 sm:mx-6 lg:mx-10 overflow-hidden rounded-3xl mt-6 lg:mt-10"
      style={{ minHeight: "100vh", fontFamily: "poppins" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <div className="relative z-20 max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center min-h-screen">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-24 lg:py-28">

          <div className="flex-1 max-w-[670px] flex flex-col items-center lg:items-start text-center lg:text-left w-full">

            <motion.h1
              className="font-semibold text-white leading-tight mb-1"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)", letterSpacing: "-0.01em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Berikan Kesempatan
            </motion.h1>

            <motion.h1
              className="font-semibold text-white leading-tight mb-1"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)", letterSpacing: "-0.01em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Yang Setara Melalui Skill
            </motion.h1>

            <div className="flex items-center gap-4 w-full justify-center lg:justify-start">
              <motion.h1
                className="font-semibold text-white leading-tight flex-shrink-0"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)", letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65 }}
              >
                Digital
              </motion.h1>

              <div className="hidden lg:flex flex-col gap-[7px] flex-1 min-w-0">
                {[0.8, 0.9, 1.0].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="h-[6px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #EC6910, #ffd500)" }}
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                ))}
              </div>
            </div>

            <motion.p
              className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 pt-4 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
            >
              Learn high-demand digital skills, get matched with inclusive remote jobs,
              and track your personal career impact all on one accessible platform.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a
                href="#"
                className="px-7 py-3 text-white font-semibold text-sm rounded-xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #EC6910, #ffd500)",
                  boxShadow: "0 4px 20px rgba(236,105,16,0.45)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 28px rgba(236,105,16,0.6)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Start Learning
              </motion.a>

              <motion.a
                href="#"
                className="px-7 py-3 font-semibold text-sm rounded-xl cursor-pointer"
                style={{
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.6)",
                  color: "white",
                }}
                whileHover={{
                  background: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.9)",
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Explore Jobs
              </motion.a>
            </motion.div>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <AccessibilityCard />
          </div>

        </div>
      </div>
    </section>
  );
}