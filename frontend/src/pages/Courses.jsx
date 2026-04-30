import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api(`/courses${query ? `?search=${encodeURIComponent(query)}` : ""}`).then((res) => setCourses(res.data || []));
  }, [query]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Courses</h1>
              <p className="mt-2 text-stone-500">Choose accessible digital skill tracks and track your progress.</p>
            </div>
            <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">{course.category}</p>
                <h2 className="mt-3 text-xl font-bold text-stone-900">{course.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm text-stone-500">{course.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-600">{course.difficulty}</span>
                  <span className="text-stone-400">{course.duration_minutes} min</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
