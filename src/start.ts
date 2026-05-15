import { createStart } from '@tanstack/react-start';
import { errorHandlingMiddleware } from '~/base/server/error-handling-middleware';

/**
 * Provides global middleware for Tanstack Start
 */
export const startInstance = createStart(() => ({
  requestMiddleware: [errorHandlingMiddleware],
}));
