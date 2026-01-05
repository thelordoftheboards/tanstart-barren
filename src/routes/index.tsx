import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '~/tanstack-barren-examples/components/HomePage';

export const Route = createFileRoute('/')({
  component: HomePage,
});
