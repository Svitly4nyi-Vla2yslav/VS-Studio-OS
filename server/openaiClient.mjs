const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';

const systemPrompt = [
  'You are the AI assistant inside VS Studio OS, a small CRM/ERP for VS Web Studio.',
  'Answer in the same language as the user unless they ask otherwise.',
  'Be concise, practical, and business-focused.',
  'Use plain text only: no Markdown, no bold markers, no headings with #, and no code fences.',
  'Do not claim that you changed CRM data, created tasks, sent messages, or scheduled events.',
  'When an action is needed, describe the proposed action and any missing data.',
].join(' ');

const cleanPlainText = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, '').trim())
    .trim();

const readResponseText = (data) => {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return cleanPlainText(data.output_text);
  }

  const chunks = [];

  for (const item of data?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (typeof content?.text === 'string') {
        chunks.push(content.text);
      }
    }
  }

  return cleanPlainText(chunks.join('\n'));
};

export const createAiAssistantReply = async (instruction) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-5.5';

  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY is missing in .env.');
    error.statusCode = 500;
    throw error;
  }

  const cleanInstruction = String(instruction || '').trim();

  if (!cleanInstruction) {
    const error = new Error('Instruction is required.');
    error.statusCode = 400;
    throw error;
  }

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: systemPrompt }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: cleanInstruction }],
        },
      ],
      reasoning: { effort: 'low' },
      text: { verbosity: 'low' },
      max_output_tokens: 700,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const openAiMessage = data?.error?.message || response.statusText;
    const error = new Error(`OpenAI API error: ${openAiMessage}`);
    error.statusCode = response.status;
    throw error;
  }

  const answer = readResponseText(data);

  if (!answer) {
    const error = new Error('OpenAI returned an empty response.');
    error.statusCode = 502;
    throw error;
  }

  return {
    answer,
    model,
  };
};
