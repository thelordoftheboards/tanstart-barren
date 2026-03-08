/** biome-ignore-all lint/a11y/useValidAnchor: Allow */

import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '~/base/features/login-page';

export const Route = createFileRoute('/(auth-pages)/login')({
  component: LoginPage,
});
