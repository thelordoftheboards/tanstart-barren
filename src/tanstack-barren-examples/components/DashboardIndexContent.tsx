import { SignOutButton } from '~/components/sign-out-button';
import { SelectUserType } from '~/lib/db/schema/auth.schema';

export function DashboardIndexContent({ user }: { user: SelectUserType }) {
  return (
    <div className="flex flex-col items-center gap-1">
      Dashboard index page
      <pre className="rounded-md border bg-card p-1 text-card-foreground text-xs">
        routes/(authenticated)dashboard/index.tsx
      </pre>
      <div className="mt-2 text-center text-xs sm:text-sm">
        User data from route context:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <SignOutButton />
    </div>
  );
}
