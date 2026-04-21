export type Stage = {
  id: number;
  title: string;
  clue: string;
  hint: string;
};

export const stages: Stage[] = [
  {
    id: 1,
    title: "The Acrostic Gate",
    clue: `
Masons hide meaning in the first stones.
Ink remembers what mouths forget.
Read the opening marks, not the ending.
Riddles bow to patient eyes.
Only the beginnings matter.
Repeat the ritual until the word appears.
    `.trim(),
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
    clue: "Knock at /api/oracle and present the correct constellation header.",
    hint: "The required header name is X-Constellation, value draco.",
  },
];

const expectedAnswers = ["MIRROR", "PRISM", "ORBIT", "LATTICE", "EMBER"];

export function normalize(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function verifyStage(stageId: number, answer: string): boolean {
  const expected = expectedAnswers[stageId - 1];
  if (!expected) {
    return false;
  }
  return normalize(answer) === expected;
}

export function verifyAll(answers: string[]): boolean {
  if (answers.length !== expectedAnswers.length) {
    return false;
  }

  return expectedAnswers.every((expected, idx) => normalize(answers[idx] ?? "") === expected);
}

export function buildFlag(answers: string[]): string {
  if (!verifyAll(answers)) {
    throw new Error("Invalid answers");
  }

  return `CTF{${answers.map(normalize).join("_")}}`;
}
