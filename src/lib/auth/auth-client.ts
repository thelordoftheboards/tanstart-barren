import { createAuthClient } from 'better-auth/react';
import { getBaseUrl } from '~/base/utils/get-base-url';

export const authClient = createAuthClient({
  baseURL: getBaseUrl(), // Replaces the traditional env.VITE_SERVER_URL
});
