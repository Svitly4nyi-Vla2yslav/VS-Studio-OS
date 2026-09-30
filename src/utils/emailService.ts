import { ClientMessage } from './types';

/**
 * Формує локальну email-чернетку без фактичного надсилання через Web.de.
 *
 * @param to — адреса отримувача.
 * @param subject — тема листа.
 * @param body — текст повідомлення.
 * @returns Об'єкт чернетки зі статусом draft.
 * @sideEffects Не виконує мережевих запитів і не надсилає лист.
 */
export const createEmailDraft = (to: string, subject: string, body: string) => ({
  from: 'VS Studio Anfrage <vs.studio.anfrage@web.de>',
  to,
  subject,
  body,
  status: 'draft',
});

/**
 * Перетворює текст ручної нотатки на повідомлення клієнта в каналі email.
 *
 * @param text — зміст нотатки про комунікацію.
 * @returns Повідомлення без id і createdAt, які додає шар збереження.
 */
export const saveManualEmailNote = (text: string): Omit<ClientMessage, 'id' | 'createdAt'> => ({
  channel: 'email',
  text,
});

// Реальна Web.de інтеграція буде додана пізніше після рішення щодо безпечної авторизації.
