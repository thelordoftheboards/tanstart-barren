/** biome-ignore-all lint/a11y/useValidAnchor: Allow */

import { createFileRoute } from '@tanstack/react-router';
import { SignupPage } from '~/base/features/signup-page';

export const Route = createFileRoute('/(auth-pages)/signup')({
  component: SignupPage,
});
