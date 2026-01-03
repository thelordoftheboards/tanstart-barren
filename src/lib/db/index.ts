import { createServerOnlyFn } from '@tanstack/react-start';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '~/lib/db/schema';
import { env } from '~/lib/env.server';

const driver = postgres(env.DATABASE_URL);

const getDatabase = createServerOnlyFn(() => drizzle({ client: driver, schema, casing: 'snake_case' }));

export const db = getDatabase();
