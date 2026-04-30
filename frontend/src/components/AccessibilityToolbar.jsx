import { useAccessibility } from "../context/AccessibilityContext";

const sizes = ["sm", "md", "lg", "xl"];

export default function AccessibilityToolbar() {
  const { prefs, updatePrefs, readPage } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-wrap items-center gap-2 rounded-xl border border-orange-200 bg-white/95 p-2 shadow-lg">
      <button onClick={readPage} className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
        Read
      </button>
      <button
        onClick={() => updatePrefs({ high_contrast: !prefs.high_contrast })}
        className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700"
      >
        Contrast
      </button>
      <select
        value={prefs.font_size}
        onChange={(event) => updatePrefs({ font_size: event.target.value })}
        className="rounded-lg border border-stone-200 px-2 py-2 text-xs font-semibold text-stone-700"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>{size.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}
