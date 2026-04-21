"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";

type StageDefinition = {
  id: number;
  title: string;
  clue: string;
  hint: string;
};

const stageDefinitions: StageDefinition[] = [
  {
    id: 1,
    title: "The Acrostic Gate",
    clue: [
      "Masons hide meaning in the first stones.",
      "Ink remembers what mouths forget.",
      "Read the opening marks, not the ending.",
      "Riddles bow to patient eyes.",
      "Only the beginnings matter.",
      "Repeat the ritual until the word appears.",
    ].join("\n"),
    hint: "Take the first letter of each line.",
  },
  {
    id: 2,
    title: "The Dial of Three",
    clue: "SULVP",
    hint: "A Caesar dial is engraved with -3.",
  },
  {
    id: 3,
    title: "The Binary Sky",
    clue: "01001111 01010010 01000010 01001001 01010100",
    hint: "These are 8-bit ASCII constellations.",
  },
  {
    id: 4,
    title: "The Coordinate Vault",
    clue: "6-6, 1-0, 10-10, 12-8, 4-5, 2-1, 3-2",
    hint: "Use A1Z26 where x-y means add the two numbers first.",
  },
  {
    id: 5,
    title: "The Oracle",
    clue: "Query /api/oracle with header: X-Constellation: draco",
    hint: "The answer to the returned riddle is your fifth key.",
  },
];

export default function Home() {
  const [stageInputs, setStageInputs] = useState<string[]>(["", "", "", "", ""]);
  const [stageMessages, setStageMessages] = useState<string[]>(["", "", "", "", ""]);
  const [oracleResponse, setOracleResponse] = useState<string>("");
  const [finalMessage, setFinalMessage] = useState<string>("");

  const solvedCount = useMemo(
    () => stageMessages.filter((m) => m.startsWith("Solved")).length,
    [stageMessages],
  );

  async function submitStage(event: FormEvent, stageId: number) {
    event.preventDefault();
    const answer = stageInputs[stageId - 1] ?? "";

    const response = await fetch("/api/stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stage: stageId,
        answer,
      }),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message: string;
      nextHint?: string;
    };

    const copy = [...stageMessages];
    copy[stageId - 1] = data.ok
      ? `Solved: ${data.message} ${data.nextHint ?? ""}`
      : `Try again: ${data.message}`;
    setStageMessages(copy);
  }

  async function queryOracle() {
    const response = await fetch("/api/oracle", {
      headers: {
        "X-Constellation": "draco",
      },
    });

    const data = (await response.json()) as { ok: boolean; riddle?: string; message?: string };
    setOracleResponse(data.ok ? `Oracle Riddle: ${data.riddle}` : data.message ?? "No response");
  }

  async function submitFinal(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/final", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: stageInputs,
      }),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message: string;
      flag?: string;
    };

    setFinalMessage(data.ok ? `Flag unlocked: ${data.flag}` : `Final check failed: ${data.message}`);
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Signal Archive // Challenge Node 04</p>
          <h1>The Astral Locksmith</h1>
          <p>
            Solve five layered ciphers, preserve answer order, and submit the complete chain to retrieve
            the capture token.
          </p>
          <div className={styles.progress}>Solved stages: {solvedCount}/5</div>
        </header>

        <section className={styles.grid}>
          {stageDefinitions.map((stage) => (
            <article key={stage.id} className={styles.card}>
              <p className={styles.stageTag}>Stage {stage.id}</p>
              <h2>{stage.title}</h2>
              <pre className={styles.clue}>{stage.clue}</pre>
              <p className={styles.hint}>Hint: {stage.hint}</p>

              {stage.id === 5 ? (
                <button className={styles.oracleButton} onClick={queryOracle} type="button">
                  Query Oracle with Header
                </button>
              ) : null}

              {stage.id === 5 && oracleResponse ? <p className={styles.oracle}>{oracleResponse}</p> : null}

              <form onSubmit={(event) => submitStage(event, stage.id)} className={styles.form}>
                <input
                  value={stageInputs[stage.id - 1]}
                  onChange={(event) => {
                    const copy = [...stageInputs];
                    copy[stage.id - 1] = event.target.value;
                    setStageInputs(copy);
                  }}
                  placeholder="Enter stage key"
                  spellCheck={false}
                />
                <button type="submit">Submit Stage Key</button>
              </form>

              {stageMessages[stage.id - 1] ? <p className={styles.message}>{stageMessages[stage.id - 1]}</p> : null}
            </article>
          ))}
        </section>

        <section className={styles.finalCard}>
          <h2>Final Vault</h2>
          <p>Submit all five keys in stage order to unlock the final token.</p>
          <form onSubmit={submitFinal} className={styles.finalForm}>
            <button type="submit">Validate Full Sequence</button>
          </form>
          {finalMessage ? <p className={styles.finalMessage}>{finalMessage}</p> : null}
        </section>

        <section className={styles.meta}>
          <h3>Challenge Goals</h3>
          <ul>
            <li>Reward methodical reasoning over blind brute force.</li>
            <li>Force multi-modal skill use: text analysis, encoding, and request crafting.</li>
            <li>Keep it solvable by humans with browser devtools and patience.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
