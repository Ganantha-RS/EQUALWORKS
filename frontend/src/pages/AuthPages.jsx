import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function AuthShell({ title, subtitle, children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-70px)] bg-orange-50/40 px-4 py-12" style={{ fontFamily: "Poppins, sans-serif" }}>
        <section className="mx-auto max-w-md rounded-2xl border border-orange-100 bg-white p-7 shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
          <p className="mt-2 text-sm text-stone-500">{subtitle}</p>
          {children}
        </section>
      </main>
    </>
  );
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell title="Login" subtitle="Continue learning and checking remote job matches.">
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white">Login</button>
      </form>
      <p className="mt-5 text-sm text-stone-500">No account yet? <Link className="font-semibold text-orange-600" to="/register">Register</Link></p>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/courses");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell title="Register" subtitle="Create your SkillBridge learning profile.">
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="rounded-xl border border-stone-200 px-4 py-3" placeholder="Confirm password" type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white">Create account</button>
      </form>
      <p className="mt-5 text-sm text-stone-500">Already registered? <Link className="font-semibold text-orange-600" to="/login">Login</Link></p>
    </AuthShell>
  );
}
