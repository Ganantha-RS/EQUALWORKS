import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Learning", href: "/courses" },
  { label: "AI Builder", href: "/ai-builder" },
  { label: "Jobs", href: "/jobs" },
  { label: "Dashboard", href: "/dashboard" },
];

const NavLink = ({ label, href }) => {
  return (
   <motion.a
    href={href}
    className="relative text-gray-700 text-md font-medium px-1 py-1 group "
    whileHover="hover"
    initial="rest"
    variants={{
    rest: { color: "#374151" }, 
    hover: { color: "#f97316" },
  }}
  transition={{ duration: 0.25 }}
  >
    {label}
    <motion.span
      className="absolute bottom-0 left-0 h-[2px] bg-orange-500 rounded-full "
      variants={{
        rest: { width: "0%" },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  </motion.a>
  );
};

const MobileMenuLink = ({ label, href, index, onClose }) => (
  <motion.a
    href={href}
    onClick={onClose}
    className="block text-gray-700 font-medium text-base py-3 px-4 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-colors relative overflow-hidden"
    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, x: -20 }}
    transition={{
      delay: index * 0.06,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    whileHover={{ x: 6 }}
    whileTap={{ scale: 0.97 }}
  >
    <motion.span
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full bg-gradient-to-b from-orange-500 to-yellow-400"
      whileHover={{ height: "60%" }}
      transition={{ duration: 0.2 }}
    />
    {label}
  </motion.a>
);

const HamburgerIcon = ({ isOpen }) => (
  <div className="w-6 h-5 flex flex-col justify-between relative">
    <motion.span
      className="block h-[2.5px] rounded-full origin-center"
      style={{ background: isOpen ? "linear-gradient(90deg, #EC6910, #ffd500)" : "#374151" }}
      animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
    <motion.span
      className="block h-[2.5px] bg-gray-700 rounded-full"
      animate={
        isOpen
          ? { opacity: 0, scaleX: 0, x: 10 }
          : { opacity: 1, scaleX: 1, x: 0 }
      }
      transition={{ duration: 0.25 }}
    />
    <motion.span
      className="block h-[2.5px] rounded-full origin-center"
      style={{ background: isOpen ? "linear-gradient(90deg, #ffd500, #EC6910)" : "#374151" }}
      animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  </div>
);

const MagneticButton = ({ children, className, href, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const ShimmerButton = ({ children, href, onClick }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.();
  };

  return (
    <MagneticButton
      href={href}
      className="relative px-5 py-3 text-sm font-medium text-white rounded-xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #EC6910, #ffd500)" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18 }}
      onClick={handleClick}
    >
      <motion.span
        className="absolute inset-0 opacity-0"
        style={{ background: "linear-gradient(135deg, #ff8c00, #ffe44d)" }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 120, height: 120, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </MagneticButton>
  );
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 py-1 left-0 right-0 z-50 bg-white"
        style={{ fontFamily: "poppins" }}
        animate={{
          boxShadow: scrolled
            ? "0 4px 32px 0 rgba(236,105,16,0.10), 0 1px 0 0 rgba(0,0,0,0.05)"
            : "0 1px 0 0 rgba(0,0,0,0.06)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[70px]">

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <a href="/">
                <img className="w-42" src="/image/Logo.png" alt="SkillBridge" />
              </a>
            </motion.div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 ">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <NavLink {...link} />
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <motion.button
                onClick={logout}
                className="px-10 py-3 text-sm font-medium text-gray-800 border border-orange-400 rounded-xl"
                whileHover={{
                  backgroundColor: "#fff7ed",
                  borderColor: "#f97316",
                  color: "#f97316",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Logout
              </motion.button>
              ) : (
                <motion.a
                  href="/login"
                  className="px-10 py-3 text-sm font-medium text-gray-800 border border-orange-400 rounded-xl"
                  whileHover={{
                    backgroundColor: "#fff7ed",
                    borderColor: "#f97316",
                    color: "#f97316",
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Login
                </motion.a>
              )}

              <ShimmerButton href={user ? "/dashboard" : "/register"}>{user ? "Dashboard" : "Get Started"}</ShimmerButton>
            </div>

            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.88, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={menuOpen} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed top-[70px] left-0 right-0 z-50 bg-white md:hidden border-t border-gray-100"
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -16, scaleY: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                boxShadow: "0 20px 60px rgba(236,105,16,0.12), 0 4px 20px rgba(0,0,0,0.08)",
                transformOrigin: "top center",
              }}
            >
              <div className="px-4 pt-4 pb-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <MobileMenuLink
                    key={link.label}
                    {...link}
                    index={i}
                    onClose={() => setMenuOpen(false)}
                  />
                ))}

                <motion.div
                  className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
                >
                  {user ? (
                    <motion.button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-center py-3 text-sm font-medium text-gray-800 border border-orange-400 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Logout
                    </motion.button>
                  ) : (
                    <motion.a
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center py-3 text-sm font-medium text-gray-800 border border-orange-400 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Login
                    </motion.a>
                  )}
                  <motion.a
                    href={user ? "/dashboard" : "/register"}
                    onClick={() => setMenuOpen(false)}
                    className="relative w-full text-center py-3 text-sm font-semibold text-white rounded-full overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #EC6910, #ffd500)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {user ? "Open Dashboard" : "Get Started"}
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[70px]" />
    </>
  );
}
