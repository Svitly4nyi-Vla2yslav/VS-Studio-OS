import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';

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

const stopAll = () => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
};

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopAll();
      process.exit(code);
    }
  });
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
