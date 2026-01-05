import { createServerOnlyFn } from '@tanstack/react-start';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { v7 as uuidv7 } from 'uuid';
import { db } from '~/lib/db';
// biome-ignore lint/performance/noNamespaceImport: Allow
import * as schema from '~/lib/db/schema/auth.schema';
import { env } from '~/lib/env.server';

const getAuthConfig = createServerOnlyFn(() =>
  betterAuth({
    baseURL: env.SERVER_URL,
    telemetry: {
      enabled: false,
    },
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema,
    }),

    advanced: {
      database: {
        // https://www.better-auth.com/docs/concepts/database#option-1-let-database-generate-ids
        generateId: () => uuidv7(),
      },
    },

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [tanstackStartCookies()],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      github: {
        enabled: env.GITHUB_CLIENT_ID !== null && env.GITHUB_CLIENT_SECRET !== null,
        clientId: env.GITHUB_CLIENT_ID ?? '',
        clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
      },
      google: {
        enabled: env.GOOGLE_CLIENT_ID !== null && env.GOOGLE_CLIENT_SECRET !== null,
        clientId: env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
      },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
    },

    experimental: {
      // https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
      joins: true,
    },
  })
);

export const auth = getAuthConfig();
