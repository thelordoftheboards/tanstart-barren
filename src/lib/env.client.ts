import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: import.meta.env,
});
