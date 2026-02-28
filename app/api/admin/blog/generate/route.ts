import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { topic } = body as { topic: string };
  if (!topic?.trim()) {
    return NextResponse.json({ error: "topic required" }, { status: 400 });
  }
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured. Add it in .env.local to use AI generation." },
      { status: 503 }
    );
  }
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a blog writer for ELEVATE, a South Florida home renovation and remodeling company. Write helpful, professional blog posts in markdown. Focus on home renovation, kitchen and bathroom remodels, and tips for homeowners. Keep tone friendly and expert. Output only the markdown content, no extra commentary.",
          },
          {
            role: "user",
            content: `Write a blog post about: ${topic.trim()}. Use 400-800 words. Include a short 1-2 sentence excerpt at the end after "EXCERPT:" for use as meta description.`,
          },
        ],
        max_tokens: 1500,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "OpenAI error", details: err }, { status: 502 });
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = data.choices?.[0]?.message?.content ?? "";
    const excerptMatch = raw.match(/EXCERPT:\s*([\s\S]+?)(?:\n|$)/);
    const excerpt = excerptMatch ? excerptMatch[1].trim() : raw.slice(0, 160).trim();
    const content = excerptMatch ? raw.replace(/EXCERPT:[\s\S]+/, "").trim() : raw;
    const titleMatch = content.match(/^#\s*(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : topic.trim();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return NextResponse.json({ title, slug, excerpt, content });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
