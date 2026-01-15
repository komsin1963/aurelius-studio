import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Try to load .env.local if dotenv isn't available
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([^#=]+)=([\s\S]*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY in environment');
  process.exit(1);
}

async function listModels() {
  try {
    const client = new GoogleGenerativeAI(apiKey);
    // The SDK may expose a method to list models — try common names
    if (typeof client.listModels === 'function') {
      const res = await client.listModels();
      console.log('Models (from client.listModels):', JSON.stringify(res, null, 2));
      return;
    }

    // Fallback: call the REST ListModels endpoint directly using API key query param
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    const data = await resp.json();
    console.log('Models (REST with key):', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error listing models:', err);
    process.exit(1);
  }
}

listModels();
