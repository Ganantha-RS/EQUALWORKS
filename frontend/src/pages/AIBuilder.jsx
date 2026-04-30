import { useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

const interestOptions = ["Modern Web", "Frontend Development", "Data Analysis", "Accessibility"];

export default function AIBuilder() {
  const [form, setForm] = useState({
    interests: ["Frontend Development"],
    goal: "Find remote jobs",
    hours_per_week: "3-8",
    learning_style: "Praktek langsung",
  });
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleInterest(interest) {
    const exists = form.interests.includes(interest);
    setForm({
      ...form,
      interests: exists ? form.interests.filter((item) => item !== interest) : [...form.interests, interest],
    });
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api("/ai/generate", { method: "POST", body: form });
      setCurriculum(res.data.curriculum_data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-orange-50/30 px-4 py-10" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={submit} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-stone-900">AI Curriculum Builder</h1>
            <p className="mt-2 text-sm text-stone-500">Gemini builds a personal curriculum from your goals.</p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-stone-700">Interests</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${form.interests.includes(interest) ? "border-orange-500 bg-orange-500 text-white" : "border-stone-200 text-stone-600"}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-semibold text-stone-700">Goal</label>
            <select className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
              <option>Find remote jobs</option>
              <option>Learn new skills</option>
            </select>

            <label className="mt-5 block text-sm font-semibold text-stone-700">Hours per week</label>
            <select className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3" value={form.hours_per_week} onChange={(e) => setForm({ ...form, hours_per_week: e.target.value })}>
              <option>1-3</option>
              <option>3-8</option>
              <option>8+</option>
            </select>

            <label className="mt-5 block text-sm font-semibold text-stone-700">Learning style</label>
            <select className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3" value={form.learning_style} onChange={(e) => setForm({ ...form, learning_style: e.target.value })}>
              <option>Visual</option>
              <option>Membaca</option>
              <option>Praktek langsung</option>
            </select>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <button disabled={loading} className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-60">
              {loading ? "Generating..." : "Generate curriculum"}
            </button>
          </form>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            {curriculum ? (
              <>
                <h2 className="text-2xl font-bold text-stone-900">{curriculum.curriculum_title}</h2>
                <p className="mt-2 text-sm text-stone-500">{curriculum.estimated_duration_weeks} week track</p>
                <div className="mt-6 space-y-4">
                  {curriculum.modules?.map((module) => (
                    <article key={`${module.week}-${module.title}`} className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                      <p className="text-sm font-bold text-orange-600">Week {module.week}</p>
                      <h3 className="mt-1 font-bold text-stone-900">{module.title}</h3>
                      <p className="mt-3 text-sm font-semibold text-stone-700">Topics</p>
                      <p className="text-sm text-stone-500">{module.topics?.join(", ")}</p>
                      <p className="mt-3 text-sm font-semibold text-stone-700">Resources</p>
                      <p className="text-sm text-stone-500">{module.resources?.join(", ")}</p>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid h-full min-h-[360px] place-items-center text-center text-stone-500">
                Your generated curriculum will appear here.
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
