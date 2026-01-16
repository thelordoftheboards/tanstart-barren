import { env } from '~/lib/env.server';

let baseUrl: string | null = null;

/**
 * Extracts the base URL (protocol + host) from the current browser URL
 * @returns The base URL string (e.g., "https://api.example.com")
 */
export function getBaseUrl(): string {
  if (baseUrl !== null) {
    return baseUrl;
  }

  // If running in a browser environment
  if (typeof window !== 'undefined' && window.location) {
    const { protocol, host } = window.location;
    baseUrl = `${protocol}//${host}`;
  } else {
    baseUrl = env.SERVER_URL;
  }

  return baseUrl;
}
