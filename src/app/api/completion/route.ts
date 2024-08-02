import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// !!! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the prompt & additional data from the request body
    const { prompt, data } = await req.json();

    // Ask OpenAI for a streaming completion
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      stream: true,
      max_tokens: 1000,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
