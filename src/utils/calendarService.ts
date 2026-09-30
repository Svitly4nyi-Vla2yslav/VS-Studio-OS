/**
 * Формує підготовлений опис події без надсилання до Google Calendar.
 *
 * @param payload — довільні поля майбутньої календарної події.
 * @returns Об'єкт зі статусом prepared і незміненим payload.
 * @sideEffects Не виконує OAuth або мережевих запитів.
 */
export const createCalendarEvent = (payload: Record<string, unknown>) => ({
  provider: 'google-calendar',
  status: 'prepared',
  payload,
});

/**
 * Готує мінімальний payload для майбутньої інтеграції з Google Calendar.
 *
 * @param title — назва дзвінка, нагадування або іншої дії.
 * @param dateTime — дата й час у форматі, який передає викликач.
 * @param clientId — необов'язковий ідентифікатор пов'язаного клієнта.
 * @returns Структуру події з позначкою про необхідність OAuth.
 */
export const prepareCalendarEventPayload = (
  title: string,
  dateTime: string,
  clientId?: string,
) => ({
  title,
  dateTime,
  clientId,
  auth: 'oauth-required-later',
});

// Google Calendar OAuth буде додано пізніше, щоб безпечно створювати події на кшталт дзвінків і follow-up.
