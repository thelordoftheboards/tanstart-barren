import { resolve } from 'node:path';
import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../src/lib/db/index';

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request);
  },
});

//

const isProduction = process.env.NODE_ENV === 'production';
console.log(
  `[🚀] Starting ${process.env.npm_package_name}:${process.env.npm_package_version} in ${isProduction ? '🏭  Production' : '🏗️  Development'} at ${new Date().toISOString()}.`
);

async function runMigration() {
  try {
    const enabledDatabaseAutomaticMigrations = process.env.DATABASE_AUTOMATIC_MIGRATIONS === 'enabled';
    if (enabledDatabaseAutomaticMigrations) {
      const migrationsFolder = resolve(isProduction ? '../drizzle/' : './drizzle/');
      const migrationConfig = { migrationsFolder };

      console.log(`[🏁] Migrations starting using ${migrationsFolder} ...`);

      await migrate(db, migrationConfig);

      console.log('[✅] Migration completed.');
    } else {
      console.log('[🛑] Automatic migrations disabled!');
    }
  } catch (error) {
    console.error('[🚨] Migration failed! Error: ', error);
  }
}

runMigration().catch((error) => console.error('[🚨] Migration failed! Error:', error));
