"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [name1, setName1] = useState("PlayerOne");
  const [name2, setName2] = useState("PlayerTwo");
  const [output, setOutput] = useState("Ready. Build bin/vuln and execute payloads.");
  const [loading, setLoading] = useState(false);

  async function runChallenge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setOutput("Launching target process...");

    try {
      const response = await fetch("/api/exploit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name1, name2 }),
      });

      const data = (await response.json()) as { error?: string; output?: string };
      if (!response.ok) {
        setOutput(data.error ?? "Request failed.");
      } else {
        setOutput(data.output ?? "No output received.");
      }
    } catch {
      setOutput("Network error while contacting /api/exploit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">Heap Havoc</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-900/80">
          Local operator console for your binary exploitation challenge. Send raw payload strings to
          the vulnerable process and inspect crash behavior, leaks, and callback redirection outcomes.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form onSubmit={runChallenge} className="rounded-2xl border border-slate-900/20 bg-white/85 p-5 shadow-xl backdrop-blur">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-slate-800">
              name1 payload
            </label>
            <input
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm outline-none focus:border-red-500"
              placeholder="AAAA..."
              required
            />

            <label className="mb-2 mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-slate-800">
              name2 payload
            </label>
            <input
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm outline-none focus:border-red-500"
              placeholder="BBBB..."
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Executing..." : "Run Exploit Attempt"}
            </button>
          </form>

          <article className="rounded-2xl border border-slate-900/20 bg-slate-950 p-5 text-slate-100 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">target output</h2>
            <pre className="mt-4 h-[420px] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-700 bg-black/60 p-3 font-mono text-xs leading-6">
              {output}
            </pre>
          </article>
        </div>
      </section>
    </main>
  );
}
