import { AiRecommendation } from './types';

const cleanAssistantText = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .trim();

export const requestAiAssistant = async (instruction: string) => {
  const response = await fetch('/api/ai-assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ instruction }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'AI Assistant request failed.');
  }

  return {
    answer: cleanAssistantText(String(data?.answer || '')),
    model: String(data?.model || ''),
  };
};

// getLeadById є контрольованою AI-дією для отримання ліда через сервісний шар у майбутньому.
// Функція приймає id ліда і зараз повертає лише опис запланованої операції.
export const getLeadById = (id: string) => ({
  tool: 'getLeadById',
  id,
  note: 'AI має отримувати дані тільки через дозволені service-функції.',
});

// createTaskFromAi готує створення задачі за AI-інструкцією.
// Функція приймає текст інструкції і повертає контрольований payload без прямого запису у Firebase.
export const createTaskFromAi = (instruction: string) => ({
  tool: 'createTaskFromAi',
  instruction,
});

// createCalendarEventFromAi готує календарну подію з AI-інструкції.
// Функція приймає текст і повертає payload для calendarService, не викликаючи Google API напряму.
export const createCalendarEventFromAi = (instruction: string) => ({
  tool: 'createCalendarEventFromAi',
  instruction,
});

// generateOfferDraft створює чорнову структуру комерційної пропозиції.
// Функція приймає контекст клієнта і повертає текстову заглушку без реального OpenAI-запиту.
export const generateOfferDraft = (clientContext: string) => ({
  title: 'Website offer draft',
  clientContext,
  status: 'placeholder',
});

// analyzeClientHistory аналізує історію клієнта через контрольований вхід.
// Функція приймає короткий текст історії і повертає заглушку аналізу.
export const analyzeClientHistory = (history: string) => ({
  summary: history,
  risk: 'manual-review-required',
});

// calculateProjectProfit готує AI-аналіз прибутковості майбутнього проєкту.
// Функція приймає дохід і витрати, але не замінює бухгалтерський розрахунок.
export const calculateProjectProfit = (income: number, expenses: number) => ({
  income,
  expenses,
  estimatedProfit: income - expenses,
});

// suggestNextAction повертає безпечну рекомендацію наступної дії.
// Функція приймає короткий контекст і повертає AiRecommendation для UI.
export const suggestNextAction = (context: string): AiRecommendation => ({
  nextAction: 'Send a short follow-up today before 16:00.',
  reason: context || 'The client has activity history but no concrete next action yet.',
  suggestedMessage: 'Hallo Herr Müller, ich wollte kurz nachfragen...',
  createdAt: new Date().toISOString(),
});

// AI Assistant не повинен напряму читати або писати Firebase з компонентів.
// Усі майбутні AI-інструменти мають проходити через контрольовані service-функції.
