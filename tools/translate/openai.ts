import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HttpsProxyAgent } from "https-proxy-agent";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY as string;
const baseURL = process.env.OPENAI_API_BASE_URL as string;
const proxyUrl = process.env.PROXY_URL as string;
const agent = new HttpsProxyAgent(proxyUrl);

console.log(apiKey);
console.log(baseURL);
console.log(proxyUrl);

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  configuration: {
    apiKey: apiKey,
    baseURL: baseURL,
    httpAgent: agent,
  },
});

console.log(llm);

async function test() {
  const aiMsg = await llm.invoke([
    ["system", ""],
    ["human", "讲个笑话"],
  ]);
  console.log(aiMsg.content);
}

test();
