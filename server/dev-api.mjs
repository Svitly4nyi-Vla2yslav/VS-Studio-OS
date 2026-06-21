import { createServer } from 'node:http';
import { loadEnv } from './env.mjs';
import { createAiAssistantReply } from './openaiClient.mjs';

loadEnv();

const port = Number(process.env.API_PORT || 8787);

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  response.end(JSON.stringify(payload));
};

const readJsonBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.url === '/api/ai-assistant' && request.method === 'POST') {
    try {
      const body = await readJsonBody(request);
      const result = await createAiAssistantReply(body.instruction);
      sendJson(response, 200, result);
    } catch (error) {
      sendJson(response, error.statusCode || 500, {
        error: error.message || 'AI Assistant request failed.',
      });
    }
    return;
  }

  sendJson(response, 404, { error: 'Not found.' });
});

server.listen(port, () => {
  console.log(`AI API server running at http://localhost:${port}`);
});
