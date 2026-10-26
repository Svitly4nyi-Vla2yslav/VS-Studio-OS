/**
 * Формує локальну заглушку запису доходу.
 *
 * @param amount — сума доходу.
 * @param description — опис надходження.
 * @returns Структуру зі статусом placeholder.
 * @sideEffects Не записує дані та не виконує податкових розрахунків.
 */
export const createIncomeEntry = (amount: number, description: string) => ({
  type: 'income',
  amount,
  description,
  status: 'placeholder',
});

/**
 * Формує локальну заглушку запису витрати.
 *
 * @param amount — сума витрати.
 * @param category — категорія витрати.
 * @returns Структуру зі статусом placeholder.
 * @sideEffects Не записує дані; податкову класифікацію має перевірити Steuerberater.
 */
export const createExpenseEntry = (amount: number, category: string) => ({
  type: 'expense',
  amount,
  category,
  status: 'placeholder',
});

/**
 * Описує майбутнє архівування рахунку або E-Rechnung без завантаження файла.
 *
 * @param fileName — назва документа.
 * @returns Метадані з вимогою вести історію архіву.
 * @sideEffects Не читає і не передає файл.
 */
export const uploadInvoiceDocument = (fileName: string) => ({
  fileName,
  archive: 'document-history-required',
});

/**
 * Обчислює арифметичну різницю між доходом і витратами.
 *
 * @param income — сума доходу.
 * @param expenses — сума витрат.
 * @returns income мінус expenses без податкових коригувань.
 */
export const calculateMonthlyProfit = (income: number, expenses: number) => income - expenses;

/**
 * Формує декларативну заглушку експорту для Steuerberater.
 *
 * @param period — період майбутнього експорту.
 * @returns Перелік категорій, які мають увійти до пакета.
 * @sideEffects Не створює файл і не передає дані.
 */
export const prepareSteuerberaterExport = (period: string) => ({
  period,
  includes: ['income', 'expenses', 'documents', 'audit-log'],
});

/**
 * Формує локальну заглушку запису аудиту з поточною ISO-датою.
 *
 * @param action — назва зафіксованої дії.
 * @param entityId — ідентифікатор пов'язаної сутності.
 * @returns Запис з ознакою immutable.
 * @sideEffects Читає поточний системний час, але нічого не зберігає.
 */
export const createAuditLogEntry = (action: string, entityId: string) => ({
  action,
  entityId,
  createdAt: new Date().toISOString(),
  immutable: true,
});

// У фінансовому модулі не можна мовчки видаляти рахунки або фінальні документи.
// Податкові висновки мають перевірятися Steuerberater перед подачею.
