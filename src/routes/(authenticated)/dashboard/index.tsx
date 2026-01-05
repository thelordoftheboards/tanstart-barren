import { createFileRoute } from '@tanstack/react-router';
import { SelectUserType } from '~/lib/db/schema/auth.schema';
import { DashboardIndexContent } from '~/tanstack-barren-examples/components/DashboardIndexContent';

export const Route = createFileRoute('/(authenticated)/dashboard/')({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { user } = Route.useRouteContext();

  return <DashboardIndexContent user={user as SelectUserType} />;
}
