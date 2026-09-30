import { NextRequest, NextResponse } from "next/server";
import { evaluateInterviewAnswerWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, targetRole, questionNumber, userApiKey } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Missing question or answer in request body" },
        { status: 400 }
      );
    }

    const customKey = userApiKey || req.headers.get("x-gemini-key") || undefined;
    const evaluation = await evaluateInterviewAnswerWithGemini(
      question,
      answer,
      targetRole || "Data Scientist / AI Engineer",
      Number(questionNumber) || 1,
      customKey
    );

    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error("Mock interview route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to evaluate interview response" },
      { status: 500 }
    );
  }
}
