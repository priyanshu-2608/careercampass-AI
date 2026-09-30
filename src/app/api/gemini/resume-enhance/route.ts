import { NextRequest, NextResponse } from "next/server";
import { enhanceResumeWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bullets, targetRole, userApiKey } = body;

    if (!bullets || !Array.isArray(bullets) || bullets.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of resume bullets to enhance." },
        { status: 400 }
      );
    }

    const customKey = userApiKey || req.headers.get("x-gemini-key") || undefined;
    const result = await enhanceResumeWithGemini(
      bullets,
      targetRole || "Data Scientist / AI Engineer",
      customKey
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Resume enhance route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to enhance resume" },
      { status: 500 }
    );
  }
}
