import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);

export const chatResponse = async (req, res) => {
  const { message } = req.body;
  const chatCompletion = await client.chatCompletion({
    provider: "featherless-ai",
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });
  res.json({ reply: chatCompletion.choices[0].message.content });
}

