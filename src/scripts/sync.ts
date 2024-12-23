// scripts/sync.ts
import syncDatabase from '../lib/sync';

(async () => {
  await syncDatabase();
  process.exit();
})();
