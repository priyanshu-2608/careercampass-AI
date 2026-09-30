import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateReadinessIndex, CAREER_FIELDS } from "@/lib/data/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, education, gpa, field, skills, userApiKey } = body;

    // Normalize domain name to map to config or defaults
    const domainName = field || "Web Development";
    const targetRole =
      field === "Web Development"
        ? "Full Stack Web Developer"
        : field === "Cloud & DevOps"
          ? "Cloud & DevOps Engineer"
          : field === "Cyber Security"
            ? "Cyber Security Analyst"
            : field === "UI/UX & Product Design" || field === "UI/UX Design"
              ? "Product / UI/UX Designer"
              : "Data Scientist / AI Engineer";

    const baseIndex = calculateReadinessIndex(skills || [], "Data Science", gpa || "8.5");

    const apiKey = userApiKey || req.headers.get("x-gemini-key") || process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Analyze this student's profile for the target role "${targetRole}" in domain "${domainName}".
Name: ${name}
Education: ${education}
GPA: ${gpa}
Field: ${domainName}
Skills: ${(skills || []).join(", ")}

Generate a career readiness assessment in JSON:
{
  "overallScore": number (50-98),
  "technicalFit": number (50-98),
  "resumeStrength": number (50-98),
  "softSkills": number (60-95),
  "percentile": number (60-99),
  "verdict": "short punchy title",
  "summary": "2-3 sentences of strategic advice highlighting top 2 skill gaps to close immediately."
}
`;
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        });

        const parsed = JSON.parse(result.response.text());
        return NextResponse.json({
          readiness: {
            overallScore: parsed.overallScore || baseIndex.overallScore,
            technicalFit: parsed.technicalFit || baseIndex.technicalFit,
            resumeStrength: parsed.resumeStrength || baseIndex.resumeStrength,
            softSkills: parsed.softSkills || baseIndex.softSkills,
            percentile: parsed.percentile || baseIndex.percentile,
            verdict: parsed.verdict || baseIndex.verdict,
            summary: parsed.summary || baseIndex.summary
          },
          isFallback: false,
          provider: "Gemini 2.5 Flash (Live API)"
        });
      } catch (err) {
        console.warn("Gemini career-analysis fallback used:", err);
      }
    }

    return NextResponse.json({
      readiness: baseIndex,
      isFallback: true,
      provider: "CareerCompass Autonomous Engine"
    });
  } catch (error: any) {
    console.error("Career analysis error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze career readiness" },
      { status: 500 }
    );
  }
}
