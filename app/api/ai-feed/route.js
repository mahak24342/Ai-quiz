// /app/api/feedback/route.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { feedback } = await req.json();

    const userSummary = feedback
      .map(
        (f, i) =>
          `${i + 1}. Q: ${f.question}\nYour answer: ${f.selected}\nCorrect: ${
            f.correct
          }\n`
      )
      .join("\n");

    const prompt = `
    You are a helpful quiz coach.
    Here is the quiz result:
    ${userSummary}
    Please give a short, friendly, and encouraging feedback to help the user improve.
    Keep it under 120 words.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return new Response(
      JSON.stringify({ feedbackText: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
