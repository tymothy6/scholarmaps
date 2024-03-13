import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client but configure it to point to perplexity.ai
const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || '',
  baseURL: 'https://api.perplexity.ai/',
});
 
// Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // Ask Perplexity for a streaming chat completion using PPLX 70B online model
  // @see https://blog.perplexity.ai/blog/introducing-pplx-online-llms
  const response = await perplexity.chat.completions.create({
    model: 'pplx-70b-online',
    stream: true,
    max_tokens: 1000,
    messages,
  });
 
  // Convert the response into a text-stream using the OpenAIStream helper
  const stream = OpenAIStream(response);

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