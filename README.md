# VS-Studio-OS

Міні-CRM + ERP + AI Business Assistant для VS Web Studio.

## Локальний запуск

1. Встановіть залежності:

   ```bash
   npm install
   ```

2. Створіть `.env` у корені. Для AI-помічника потрібен `OPENAI_API_KEY`;
   модель можна перевизначити через `OPENAI_MODEL`, а порт API — через
   `API_PORT` (типово `8787`). Firebase-клієнт читає змінні
   `VITE_FIREBASE_*`, перелічені у `src/firebase.ts`.

3. Запустіть фронтенд і локальний API разом:

   ```bash
   npm run dev
   ```

Скрипт запускає Vite та `server/dev-api.mjs` паралельно. Vite передає
запити `/api` на `http://localhost:8787`.

## Доступні команди

- `npm run dev:vite` — лише Vite;
- `npm run api` — лише локальний AI API;
- `npm run build` — TypeScript-перевірка та production-збірка;
- `npm run preview` — локальний перегляд зібраного застосунку.
