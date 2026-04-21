import { NextResponse } from "next/server";
import { issueChallenge } from "@/lib/challenge";

export async function GET(): Promise<NextResponse> {
  const challenge = issueChallenge();
  return NextResponse.json(challenge, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
