import { createServer } from 'node:http';
import { loadEnv } from './env.mjs';
import { createAiAssistantReply } from './openaiClient.mjs';

loadEnv();

const port = Number(process.env.API_PORT || 8787);

/**
 * Завершує локальну HTTP-відповідь JSON-даними та додає CORS-заголовки для Vite.
 * Приймає об'єкт ServerResponse, статус і серіалізоване корисне навантаження.
 */
const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  response.end(JSON.stringify(payload));
};

/**
 * Збирає всі частини тіла запиту й повертає розібраний JSON.
 * Порожнє тіло перетворюється на порожній об'єкт, а помилка синтаксису передається обробнику.
 */
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

// Обробник підтримує preflight і локальний POST /api/ai-assistant; решта маршрутів отримує 404.
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

// Запуск прослуховування є побічним ефектом імпорту цього серверного модуля.
server.listen(port, () => {
  console.log(`AI API server running at http://localhost:${port}`);
});
