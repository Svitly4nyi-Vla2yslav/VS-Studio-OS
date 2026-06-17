import { ClientMessage } from './types';

// createEmailDraft готує чернетку email для майбутньої інтеграції з Web.de.
// Функція приймає тему, отримувача і текст, але зараз не надсилає реальні листи.
export const createEmailDraft = (to: string, subject: string, body: string) => ({
  from: 'VS Studio Anfrage <vs.studio.anfrage@web.de>',
  to,
  subject,
  body,
  status: 'draft',
});

// saveManualEmailNote готує ручний запис про email-комунікацію.
// Функція приймає текст нотатки і повертає повідомлення, яке можна зберегти через clientService.
export const saveManualEmailNote = (text: string): Omit<ClientMessage, 'id' | 'createdAt'> => ({
  channel: 'email',
  text,
});

// Реальна Web.de інтеграція буде додана пізніше після рішення щодо безпечної авторизації.
