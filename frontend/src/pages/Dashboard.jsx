import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function Dashboard() {
  const [personal, setPersonal] = useState(null);
  const [impact, setImpact] = useState(null);

  useEffect(() => {
    api("/dashboard/user").then((res) => setPersonal(res.data));
    api("/dashboard/impact").then((res) => setImpact(res.data));
  }, []);

  const cards = [
    ["Courses enrolled", personal?.courses_enrolled ?? 0],
    ["Courses completed", personal?.courses_completed ?? 0],
    ["Skill score", `${personal?.skill_score ?? 0}%`],
    ["Jobs applied", personal?.jobs_applied ?? 0],
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-orange-50/30 px-4 py-10" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {cards.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-stone-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900">My Courses</h2>
              <div className="mt-4 space-y-3">
                {personal?.courses?.map((course) => (
                  <div key={course.id} className="flex justify-between rounded-xl bg-stone-50 p-4">
                    <span className="font-semibold text-stone-700">{course.title}</span>
                    <span className="text-sm text-stone-500">{course.completed ? "Done" : "In progress"}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900">Platform Impact</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {impact && Object.entries(impact).map(([key, value]) => (
                  <div key={key} className="rounded-xl bg-orange-50 p-4">
                    <p className="text-xs font-semibold uppercase text-orange-500">{key.replaceAll("_", " ")}</p>
                    <p className="mt-1 text-2xl font-bold text-stone-900">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
