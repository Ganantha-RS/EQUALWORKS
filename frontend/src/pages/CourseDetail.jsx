import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api(`/courses/${id}`).then((res) => setCourse(res.data));
    api(`/progress/${id}`).then(setProgress).catch(() => {});
  }, [id]);

  async function enroll() {
    await api(`/courses/${id}/enroll`, { method: "POST" });
    setMessage("Enrolled. You can start completing lessons.");
  }

  async function completeLesson(lessonId) {
    const res = await api(`/lessons/${lessonId}/complete`, { method: "POST" });
    setProgress(res);
  }

  if (!course) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold text-orange-500">{course.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-stone-900">{course.title}</h1>
          <p className="mt-4 max-w-3xl text-stone-600">{course.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={enroll} className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white">Enroll</button>
            {progress && <span className="text-sm font-semibold text-stone-600">{progress.progress_percent}% complete</span>}
            {message && <span className="text-sm text-green-600">{message}</span>}
          </div>
          <div className="mt-8 space-y-4">
            {course.modules?.map((module) => (
              <div key={module.id} className="rounded-2xl border border-stone-200 bg-white p-5">
                <h2 className="font-bold text-stone-900">{module.order}. {module.title}</h2>
                <div className="mt-4 space-y-3">
                  {module.lessons?.map((lesson) => (
                    <div key={lesson.id} className="flex flex-col gap-3 rounded-xl bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-stone-800">{lesson.title}</p>
                        <p className="text-sm text-stone-500">{lesson.duration_minutes} minutes</p>
                      </div>
                      <button onClick={() => completeLesson(lesson.id)} className="rounded-lg border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-600">Complete</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
