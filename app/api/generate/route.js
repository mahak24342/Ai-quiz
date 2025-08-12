import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "No topic provided" }, { status: 400 });
    }

    const prompt = `Generate a quiz on "${topic}".
Return ONLY valid JSON in the following format:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correct_answer": "string"
  }
]
Make sure the JSON is valid and nothing else is included.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let quiz;
    try {
      quiz = JSON.parse(completion.choices[0].message.content);
    } catch (err) {
      console.error("JSON parse error:", err);
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    return NextResponse.json({ quiz });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
