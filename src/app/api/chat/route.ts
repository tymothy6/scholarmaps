import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { kv } from '@vercel/kv';
 
// Create an OpenAI API client but configure it to point to perplexity.ai
const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai/',
});
 
// Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
  const key = JSON.stringify(messages);

  // Check if the prompt response has been cached
  const cached = await kv.get<string>(key);
  if (cached) {
    return new Response(cached);
    // Example of how to emulate a streaming response from cache
    // const chunks = cached.split(' ');
    // const stream = new ReadableStream({
    //   async start(controller) {
    //     for (const chunk of chunks) {
    //       const bytes = new TextEncoder().encode(chunk + ' ');
    //       controller.enqueue(bytes);
    //       await new Promise((r) =>
    //         setTimeout(
    //           r,
    //           // get a random number between 10ms and 50ms to simulate a random delay
    //           Math.floor(Math.random() * 40) + 10
    //         )
    //       );
    //     }
    //     controller.close();
    //   },
    // });
    // return new StreamingTextResponse(stream);
  };
 
  // Ask Perplexity for a streaming chat completion using PPLX 70B online model
  // @see https://blog.perplexity.ai/blog/introducing-pplx-online-llms
  const response = await perplexity.chat.completions.create({
    model: 'pplx-70b-online',
    stream: true,
    max_tokens: 1000,
    messages,
  });
 
  // Convert the response into a text-stream using the OpenAIStream helper
  const stream = OpenAIStream(response, {
    async onFinal(completion) {
      // Cache the response. Note that this will also cache function calls.
      await kv.set(key, completion);
      await kv.expire(key, 60 * 60); // 1 hour
    },
  });

  // Example of how you can use the stream to save the prompt and completion to your database
  // const stream = OpenAIStream(response, {
  //   onStart: async () => {
  //     // This callback is called when the stream starts
  //     // You can use this to save the prompt to your database
  //     await savePromptToDatabase(prompt);
  //   },
  //   onToken: async (token: string) => {
  //     // This callback is called for each token in the stream
  //     // You can use this to debug the stream or save the tokens to your database
  //     console.log(token);
  //   },
  //   onCompletion: async (completion: string) => {
  //     // This callback is called when the stream completes
  //     // You can use this to save the final completion to your database
  //     await saveCompletionToDatabase(completion);
  //   },
  // });
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}