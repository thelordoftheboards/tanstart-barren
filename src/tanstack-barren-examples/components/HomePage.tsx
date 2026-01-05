import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SignOutButton } from '~/components/sign-out-button';
import { ThemeToggle } from '~/components/theme-toggle';
import { Button } from '~/components/ui/button';
import { authQueryOptions } from '~/lib/auth/queries';

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 p-2">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-3xl sm:text-4xl">Tanstart Barren</h1>
        <div className="flex items-center gap-2 text-foreground/80 text-sm max-sm:flex-col">
          This is an unprotected page:
          <pre className="rounded-md border bg-card p-1 text-card-foreground">routes/index.tsx</pre>
        </div>
      </div>

      <Suspense fallback={<div className="py-6">Loading user...</div>}>
        <UserAction />
      </Suspense>

      <div className="flex flex-col items-center gap-2">
        <p className="text-foreground/80 max-sm:text-xs">
          A starter template for{' '}
          <a
            className="group text-foreground"
            href="https://tanstack.com/start/latest"
            rel="noreferrer noopener"
            target="_blank"
          >
            🏝️ <span className="group-hover:underline">TanStack Start</span>
          </a>
          .
        </p>
        <div className="flex items-center gap-3">
          <a
            className="text-foreground/80 underline hover:text-foreground max-sm:text-sm"
            href="https://github.com/thelordoftheboards/tanstart-barren"
            rel="noreferrer noopener"
            target="_blank"
            title="Template repository on GitHub"
          >
            thelordoftheboards/tanstart-barren
          </a>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function UserAction() {
  const { data: user } = useSuspenseQuery(authQueryOptions());

  return user ? (
    <div className="flex flex-col items-center gap-2">
      <p>Welcome back, {user.name}!</p>
      <Button className="mb-2 w-fit" nativeButton={false} render={<Link to="/dashboard" />} size="lg">
        Go to Dashboard
      </Button>
      <div className="text-center text-xs sm:text-sm">
        Session user:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">{JSON.stringify(user, null, 2)}</pre>
      </div>

      <SignOutButton />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <p>You are not signed in.</p>
      <Button className="w-fit" nativeButton={false} render={<Link to="/login" />} size="lg">
        Log in
      </Button>
    </div>
  );
}
