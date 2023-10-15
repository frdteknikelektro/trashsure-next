import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionChunk } from "openai/resources/chat";
import { ChatCompletionCreateParamsStreaming } from "openai/src/resources/chat/completions";
import { APIError } from "openai/error";
import delay from "@/utils/delay";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatCompletion|ChatCompletionChunk|APIError>
) {
  try {
    if (req.method === 'POST') {
      if (!req.body?.stream) {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k-0613",
          temperature: 0.8,
          ...req.body,
          ...(req.body?.functions ? { functions: req.body?.functions } : {}),
          messages: [
            ...req.body?.messages
          ],
        });

        res.status(200).json(chatCompletion)
      } else {
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k-0613",
          stream: true,
          temperature: 0.8,
          ...req.body,
          ...(req.body?.functions ? { functions: req.body?.functions } : {}),
          messages: [
            ...req.body?.messages
          ],
        } as ChatCompletionCreateParamsStreaming);

        res.status(200).setHeader('Content-Type', 'text/plain')
        for await (const part of chatCompletion) {
          res.write(JSON.stringify(part) || '');
          res.write("\n");
        }
        res.end()
      }
    } else {
      res.status(404)
    }
  } catch (e) {
    if (e instanceof APIError) {
      res.status(e.status || 500).json(e)
    } else {
      throw e
    }
  }
}
