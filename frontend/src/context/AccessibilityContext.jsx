import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken } from "../services/api";
import { useAuth } from "./AuthContext";

const defaultPrefs = { tts: false, high_contrast: false, font_size: "md" };
const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const { user, setUser } = useAuth();
  const [prefs, setPrefs] = useState(() => {
    const stored = localStorage.getItem("skillbridge_accessibility");
    return stored ? { ...defaultPrefs, ...JSON.parse(stored) } : defaultPrefs;
  });

  useEffect(() => {
    if (user?.accessibility_preferences) {
      setPrefs({ ...defaultPrefs, ...user.accessibility_preferences });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("skillbridge_accessibility", JSON.stringify(prefs));
    document.body.classList.toggle("high-contrast", prefs.high_contrast);
    document.documentElement.dataset.fontSize = prefs.font_size;
  }, [prefs]);

  async function updatePrefs(nextPrefs) {
    const next = { ...prefs, ...nextPrefs };
    setPrefs(next);

    if (getToken()) {
      const res = await api("/user/accessibility", { method: "PUT", body: next });
      setUser?.(res.data);
    }
  }

  function readPage() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const text = document.body.innerText.replace(/\s+/g, " ").slice(0, 5000);
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  const value = useMemo(() => ({ prefs, updatePrefs, readPage }), [prefs]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
