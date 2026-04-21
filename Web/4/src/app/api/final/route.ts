import { NextResponse } from "next/server";
import { buildFlag, verifyAll } from "@/lib/challenge";

type FinalPayload = {
  answers?: string[];
};

export async function POST(req: Request) {
  const payload = (await req.json()) as FinalPayload;
  const answers = payload.answers ?? [];

  if (!Array.isArray(answers) || answers.length !== 5) {
    return NextResponse.json(
      {
        ok: false,
        message: "Send exactly five answers in stage order.",
      },
      { status: 400 },
    );
  }

  if (!verifyAll(answers)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Final combination is incorrect.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    flag: buildFlag(answers),
    message: "Challenge cleared.",
  });
}
