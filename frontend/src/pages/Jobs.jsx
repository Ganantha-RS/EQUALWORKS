import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [tab, setTab] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const endpoint = tab === "matches" && user ? "/jobs/matches" : "/jobs";
    api(endpoint).then((res) => setJobs(res.data || []));
  }, [tab, user]);

  async function apply(jobId) {
    const res = await api(`/jobs/${jobId}/apply`, { method: "POST" });
    setMessage(res.message);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-10" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Remote Jobs</h1>
              <p className="mt-2 text-stone-500">Inclusive opportunities ranked by your skill profile.</p>
            </div>
            <div className="flex rounded-xl border border-stone-200 p-1">
              <button onClick={() => setTab("all")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "all" ? "bg-orange-500 text-white" : "text-stone-600"}`}>All</button>
              <button onClick={() => setTab("matches")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "matches" ? "bg-orange-500 text-white" : "text-stone-600"}`}>Matches</button>
            </div>
          </div>
          {message && <p className="mt-4 text-sm font-semibold text-green-600">{message}</p>}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">{job.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-orange-600">{job.company_name}</p>
                  </div>
                  {job.match_score !== undefined && <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">{job.match_score}%</span>}
                </div>
                <p className="mt-4 text-sm text-stone-500">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.required_skills?.map((skill) => <span key={skill} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">{skill}</span>)}
                </div>
                <button onClick={() => apply(job.id)} disabled={!user || job.applied} className="mt-5 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:bg-stone-300">
                  {job.applied ? "Applied" : user ? "Apply" : "Login to apply"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
