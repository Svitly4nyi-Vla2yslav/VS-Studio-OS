import { createAiAssistantReply } from '../../server/openaiClient.mjs';

/**
 * Обробляє Netlify-запит до AI-помічника.
 * Приймає лише POST, передає instruction спільному сервісу та повертає JSON зі статусом сервісу.
 */
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed.' }),
    };
  }

  try {
    // Порожнє тіло трактується як об'єкт; помилки JSON і сервісу потрапляють у спільну гілку відповіді.
    const body = JSON.parse(event.body || '{}');
    const result = await createAiAssistantReply(body.instruction);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message || 'AI Assistant request failed.',
      }),
    };
  }
};
