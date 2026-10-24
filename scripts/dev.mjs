import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';

// Під час імпорту скрипт запускає локальний API та Vite паралельно,
// успадковуючи їхній ввід/вивід; shell потрібен лише для Windows.
const processes = [
  spawn('node', ['server/dev-api.mjs'], {
    stdio: 'inherit',
    shell: isWindows,
  }),
  spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: isWindows,
  }),
];

/**
 * Зупиняє обидва дочірні процеси, якщо вони ще працюють.
 * Функція не повертає значення; її побічний ефект — надсилання сигналу завершення.
 */
const stopAll = () => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
};

// Ненульове завершення будь-якого процесу зупиняє пару й передає код помилки.
for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopAll();
      process.exit(code);
    }
  });
}

// SIGINT і SIGTERM завершують обидва дочірні процеси перед виходом оркестратора.
process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
