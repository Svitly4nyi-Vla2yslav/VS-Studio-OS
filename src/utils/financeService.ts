// createIncomeEntry готує майбутній запис доходу.
// Функція приймає суму та опис, але зараз не пише дані у Firestore.
export const createIncomeEntry = (amount: number, description: string) => ({
  type: 'income',
  amount,
  description,
  status: 'placeholder',
});

// createExpenseEntry готує майбутній запис витрати.
// Функція приймає суму та категорію, але податкову логіку має перевіряти Steuerberater.
export const createExpenseEntry = (amount: number, category: string) => ({
  type: 'expense',
  amount,
  category,
  status: 'placeholder',
});

// uploadInvoiceDocument готує майбутнє завантаження рахунку або E-Rechnung.
// Функція приймає назву файлу і повертає структуру для архіву документів.
export const uploadInvoiceDocument = (fileName: string) => ({
  fileName,
  archive: 'document-history-required',
});

// calculateMonthlyProfit готує базовий розрахунок прибутку за місяць.
// Функція приймає доходи і витрати, але не є фінальною податковою порадою.
export const calculateMonthlyProfit = (income: number, expenses: number) => income - expenses;

// prepareSteuerberaterExport готує майбутній експорт даних для Steuerberater.
// Функція приймає період і повертає заглушку структури експорту.
export const prepareSteuerberaterExport = (period: string) => ({
  period,
  includes: ['income', 'expenses', 'documents', 'audit-log'],
});

// createAuditLogEntry готує запис GoBD-friendly журналу аудиту.
// Функція приймає дію і id сутності, щоб у майбутньому фіксувати незмінну історію.
export const createAuditLogEntry = (action: string, entityId: string) => ({
  action,
  entityId,
  createdAt: new Date().toISOString(),
  immutable: true,
});

// У фінансовому модулі не можна мовчки видаляти рахунки або фінальні документи.
// Податкові висновки мають перевірятися Steuerberater перед подачею.
