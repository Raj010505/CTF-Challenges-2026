import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const constellation = req.headers.get("x-constellation");

  if ((constellation ?? "").toLowerCase() !== "draco") {
    return NextResponse.json(
      {
        ok: false,
        message: "The oracle is silent. Bring the right constellation.",
      },
      { status: 403 },
    );
  }

  return NextResponse.json({
    ok: true,
    riddle:
      "I begin as ash, then guard a forge. Name me, and your fifth key opens.",
    answerFormat: "single word, uppercase",
  });
}
