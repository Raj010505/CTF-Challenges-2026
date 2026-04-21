import { NextRequest, NextResponse } from "next/server";
import { verifyChallenge } from "@/lib/challenge";

type Body = {
  challengeId?: unknown;
  proof?: unknown;
  payload?: unknown;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "invalid json" }, { status: 400 });
  }

  if (
    typeof body.challengeId !== "string" ||
    typeof body.proof !== "string" ||
    typeof body.payload !== "string"
  ) {
    return NextResponse.json(
      { ok: false, message: "challengeId, proof, payload required" },
      { status: 400 }
    );
  }

  const result = verifyChallenge({
    challengeId: body.challengeId,
    proof: body.proof,
    encodedPayload: body.payload,
  });

  const responseBody: { ok: boolean; message: string; flag?: string } = {
    ok: result.ok,
    message: result.message,
  };

  if (result.flag) {
    responseBody.flag = result.flag;
  }

  return NextResponse.json(responseBody, { status: result.status });
}
