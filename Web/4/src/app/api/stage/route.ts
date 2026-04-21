import { NextResponse } from "next/server";
import { stages, verifyStage } from "@/lib/challenge";

type StagePayload = {
  stage?: number;
  answer?: string;
};

export async function POST(req: Request) {
  const payload = (await req.json()) as StagePayload;
  const stage = payload.stage;
  const answer = payload.answer ?? "";

  if (typeof stage !== "number" || stage < 1 || stage > stages.length) {
    return NextResponse.json(
      { ok: false, message: "Stage must be between 1 and 5." },
      { status: 400 },
    );
  }

  const ok = verifyStage(stage, answer);

  if (!ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Incorrect key. Re-check the clue and hint.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Stage ${stage} solved.`,
    nextHint:
      stage < stages.length
        ? `Proceed to Stage ${stage + 1}: ${stages[stage].title}.`
        : "All stage keys collected. Submit final sequence.",
  });
}
