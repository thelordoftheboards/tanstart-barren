import { createAuthClient } from 'better-auth/react';

/**
 * Extracts the base URL (protocol + host) from the current browser URL
 * @returns The base URL string (e.g., "https://api.example.com")
 */
function getCurrentBaseUrl(): string {
  // If running in a browser environment
  if (typeof window !== 'undefined' && window.location) {
    const { protocol, host } = window.location;
    const baseUrl = `${protocol}//${host}`;

    console.log(`Found base URL: ${baseUrl}`);

    return baseUrl;
  }

  // @ts-expect-error For the server we should have the server url set
  return process.env.SERVER_URL;
}

const authClient = createAuthClient({
  baseURL: getCurrentBaseUrl(), // Replaces the traditional env.VITE_SERVER_URL
});

export default authClient;
