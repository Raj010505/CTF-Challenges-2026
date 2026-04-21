"use client";

import { FormEvent, useMemo, useState } from "react";

type ChallengeResponse = {
  challengeId: string;
  seed: string;
  difficulty: number;
  expiresInMs: number;
  noise: string;
};

type LoginResult = {
  ok: boolean;
  message: string;
  flag?: string;
};

export default function Page(): JSX.Element {
  const [challenge, setChallenge] = useState<ChallengeResponse | null>(null);
  const [username, setUsername] = useState("steve");
  const [password, setPassword] = useState("craft");
  const [proof, setProof] = useState("");
  const [payload, setPayload] = useState("");
  const [status, setStatus] = useState("Ready");
  const [result, setResult] = useState<LoginResult | null>(null);
  const [loading, setLoading] = useState(false);

  const statusClass = useMemo(() => {
    if (!result) return "status";
    return result.ok ? "status success" : "status failure";
  }, [result]);

  async function fetchChallenge(): Promise<ChallengeResponse> {
    const response = await fetch("/api/challenge", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("failed to fetch challenge");
    }
    return (await response.json()) as ChallengeResponse;
  }

  async function onStartSession(): Promise<void> {
    setLoading(true);
    setResult(null);

    try {
      setStatus("Issuing challenge ticket...");
      const activeChallenge = await fetchChallenge();
      setChallenge(activeChallenge);
      setStatus("Session ticket ready");
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : "challenge request failed",
      });
      setStatus("Failure");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!challenge) {
      setResult({ ok: false, message: "start a session first" });
      setStatus("Session required");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      setStatus("Submitting login...");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId: challenge.challengeId,
          proof,
          payload,
          username,
          password,
        }),
      });

      const data = (await response.json()) as LoginResult;
      setResult(data);
      setStatus(data.ok ? "Access granted" : "Access denied");
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : "unexpected failure",
      });
      setStatus("Failure");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="scene">
      <section className="card">
        <h1>MineGate Access Node</h1>
        <p className="sub">Legacy auth tunnel. Restricted challenge mode.</p>

        <button type="button" onClick={onStartSession} disabled={loading}>
          {loading ? "Working..." : "Start Session"}
        </button>

        <form onSubmit={onSubmit}>
          <label>
            Operator
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </label>

          <label>
            Passphrase
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          <label>
            Proof
            <input
              value={proof}
              onChange={(event) => setProof(event.target.value)}
              placeholder="solver output"
              autoComplete="off"
            />
          </label>

          <label>
            Access blob
            <input
              value={payload}
              onChange={(event) => setPayload(event.target.value)}
              placeholder="opaque blob"
              autoComplete="off"
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Authenticate"}
          </button>
        </form>

        <div className={statusClass}>
          <p>{status}</p>
          {challenge ? (
            <p>
              Ticket: {challenge.challengeId.slice(0, 8)}... | Diff: {challenge.difficulty}
            </p>
          ) : null}
          {result ? <p>{result.message}</p> : null}
          {result?.flag ? <code>{result.flag}</code> : null}
        </div>
      </section>
    </main>
  );
}
