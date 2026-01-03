import type { Config } from "drizzle-kit";
import { env } from "~/lib/env.server";
const node_env = process.env.NODE_ENV || 'development'

export default {
  out: "./drizzle",
  schema: "./src/lib/db/schema/index.ts",
  breakpoints: true,
  verbose: true,
  // In order to facilitate AI agenets, in development it is best to skip confirmations
  strict: node_env === 'production',
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
