// createCalendarEvent є заглушкою для майбутнього створення подій Google Calendar.
// Функція приймає payload події, але зараз лише повертає його без OAuth-запиту.
export const createCalendarEvent = (payload: Record<string, unknown>) => ({
  provider: 'google-calendar',
  status: 'prepared',
  payload,
});

// prepareCalendarEventPayload готує структуру події для майбутньої Google Calendar API інтеграції.
// Функція приймає текст дії, дату і clientId, щоб підтримати нагадування та дзвінки.
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
