import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { definePlugin } from 'nitro';
import { db } from './db/index';

export default definePlugin(async (_nitroApp) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    console.log(
      `[🚀] Starting ${process.env.npm_package_name}:${process.env.npm_package_version} in ${isProduction ? '🏭  Production' : '🏗️  Development'} at ${new Date().toISOString()}.`
    );

    const enabledDatabaseAutomaticMigrations = process.env.DATABASE_AUTOMATIC_MIGRATIONS === 'enabled';
    if (enabledDatabaseAutomaticMigrations) {
      const migrationsFolder = resolve(isProduction ? '../drizzle/' : './drizzle/');
      const migrationConfig = { migrationsFolder };

      console.log(`[🏁] Migrations starting using [${migrationsFolder}] ...`);

      await migrate(db, migrationConfig);

      console.log('[✅] Migration completed.');
    } else {
      console.log('[🛑] Automatic migrations disabled!');
    }
  } catch (error) {
    console.error('[🚨] Migration failed! Error: ', error);
  }
});
